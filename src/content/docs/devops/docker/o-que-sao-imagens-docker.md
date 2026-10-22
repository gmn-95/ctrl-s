---
title: O que são imagens Docker?
description: Minha explicação sobre o modelo usado para criar containers.
sidebar:
    order: 3
---

Uma imagem é o modelo usado para criar containers. Ela reúne os arquivos, binários, bibliotecas e configurações necessários para a aplicação rodar.

Por exemplo, para colocar uma aplicação Java em um container, a imagem pode conter uma versão do Java e a aplicação já compilada. Ao criar um container a partir dela, esse ambiente já vem preparado para executar a aplicação.

## Características importantes

- **São compartilháveis.** Posso publicar uma imagem para que outras pessoas criem containers iguais. O Docker Hub reúne imagens oficiais e imagens mantidas pela comunidade.
- **São imutáveis.** Para alterar algo, construímos uma nova imagem. Uma tag nova — ou uma tag reapontada — passa a representar essa nova versão.
- **Podem partir de outras imagens.** Minha imagem para uma aplicação Java pode usar uma imagem oficial do Java como base e acrescentar apenas o que a aplicação precisa.

## As camadas de filesystem que compõem uma imagem são imutáveis

Isso significa que, depois de construída, uma camada não é modificada diretamente.

## Como um container consegue criar e modificar arquivos?

Quando o docker cria um container, ele fornece uma camada gravável (writable layer) própria daquele container, sobre as camadas da imagem. **Por isso, ao criar dois ou mais containers a partir da mesma imagem, o docker normalmente não precisa armazenar diversas cópias da imagem.**

## O que acontece quando modificamos um arquivo?

Imagine que exista um arquivo *`/app/config.txt`* na imagem. Se um container apenas ler esse arquivo, ele poderá utilizar os dados da imagem diretamente.
Porém, se o container precisar modificar esse arquivo, um mecanismo **`CoW` (Copy-on-Write)** pode copiar o arquivo para a camada gravável do container antes de aplicar a alteração. Assim, a imagem original permanece intacta, o container X enxerga sua versão modificada, o container Y continua enxergando o arquivo original.

## O que são esses layers (camadas)?

Layers são camadas imutáveis que representam alterações no sistema de arquivos de uma imagem Docker, como adicionar, modificar ou excluir arquivos.

Uma imagem é formada pela combinação dessas camadas, criando uma visão unificada dos arquivos.

Cada camada permanece imutável depois de criada. Quando uma camada posterior modifica um arquivo, a alteração é registrada nessa nova camada, sem modificar a anterior.

Essa arquitetura permite que diferentes imagens e containers reutilizem camadas idênticas, economizando armazenamento e evitando downloads e operações de build desnecessários.

Quando um container é criado, ele recebe uma camada gravável própria sobre as camadas imutáveis da imagem.

### Exemplo prático de layers e imutabilidade

> **Objetivo:** observar como um Dockerfile cria camadas, por que a alteração de um arquivo não modifica uma camada anterior e como investigar essas camadas usando a CLI.
>
> **Observação:** os exemplos de saída são ilustrativos. IDs, tamanhos, datas e quantidade de camadas da imagem base podem variar conforme a versão do Docker e da imagem utilizada.

#### 1. Criando uma imagem para o experimento

Crie um diretório e entre nele:

```bash
mkdir -p estudo-layers
cd estudo-layers
```

Crie um arquivo chamado `Dockerfile` com o seguinte conteúdo:

```dockerfile
FROM alpine:3.21

RUN echo "Primeira versão" > /teste.txt

RUN echo "Segunda versão" > /teste.txt

CMD ["cat", "/teste.txt"]
```

#### O que cada instrução faz?

| Instrução | Resultado |
| --- | --- |
| `FROM alpine:3.21` | Usa a imagem Alpine como base, reutilizando suas camadas. |
| Primeiro `RUN` | Cria o arquivo `/teste.txt` com o texto `Primeira versão`. |
| Segundo `RUN` | Altera o arquivo para `Segunda versão`, registrando a alteração em outra camada. |
| `CMD` | Define o comando padrão do container; **não** adiciona uma camada de filesystem. |

**Importante:** essas instruções `RUN` executam durante a **construção da imagem**; o `CMD` é executado quando o **container é iniciado**.

#### 2. Construindo a imagem

```bash
docker build -t minhas-layers:1.0 .
```

Resultado esperado: o build termina sem erros e a imagem fica disponível localmente.

Para confirmar:

```bash
docker image ls minhas-layers
```

Exemplo de saída (valores ilustrativos):

```text
REPOSITORY      TAG     IMAGE ID       CREATED          SIZE
minhas-layers   1.0     abcdef123456   1 minute ago     ...
```

#### 3. Executando o container

```bash
docker run --rm minhas-layers:1.0
```

**Saída esperada:**

```text
Segunda versão
```

#### Por que aparece a segunda versão?

A primeira instrução `RUN` criou o arquivo com `Primeira versão`. A segunda instrução `RUN` registrou a alteração para `Segunda versão` em uma camada superior. O Docker apresenta ao container a **visão unificada das camadas**, na qual prevalece a alteração mais recente.

Representação simplificada (omitindo as camadas da Alpine):

```text
Imagem minhas-layers:1.0
│
├── Camada superior: /teste.txt → "Segunda versão"
├── Camada inferior: /teste.txt → "Primeira versão"
└── Imagem base: alpine:3.21

Visão final no container: /teste.txt → "Segunda versão"
```

**Conclusão:** a segunda camada não edita fisicamente a primeira. As camadas de imagem são imutáveis.

#### 4. Examinando o histórico de construção

```bash
docker image history minhas-layers:1.0
```

Você deve encontrar entradas relacionadas às instruções do Dockerfile. A saída exata varia; os trechos relevantes terão uma aparência semelhante a esta:

```text
CREATED BY                                      SIZE
CMD ["cat" "/teste.txt"]                       0B
RUN /bin/sh -c echo "Segunda versão" ...        ...
RUN /bin/sh -c echo "Primeira versão" ...       ...
... instruções da imagem Alpine ...             ...
```

**Como interpretar:**

- `docker image history` apresenta o **histórico** da imagem, geralmente do mais recente para o mais antigo.
- As duas instruções `RUN` aparecem porque produziram alterações durante o build.
- `CMD` normalmente aparece com `0B`, porque altera a configuração da imagem, e não o conteúdo do filesystem.
- **Nem toda linha do histórico corresponde a uma layer de arquivos.**

#### 5. Consultando as layers de filesystem

```bash
docker image inspect minhas-layers:1.0 \
  --format '{{json .RootFS.Layers}}'
```

Exemplo de **formato** de saída (digests fictícios):

```text
["sha256:<hash-da-base>","sha256:<hash-do-primeiro-run>","sha256:<hash-do-segundo-run>"]
```

Os valores reais são hashes longos. Esse campo mostra os identificadores das camadas do filesystem; ele **não é igual** ao histórico completo de instruções do Dockerfile.

#### 6. Teste adicional: exclusão em uma camada posterior

Agora substitua o Dockerfile pelo seguinte:

```dockerfile
FROM alpine:3.21

RUN echo "Arquivo temporário" > /temporario.txt

RUN rm /temporario.txt

CMD ["sh", "-c", "if [ -e /temporario.txt ]; then echo EXISTE; else echo NAO_EXISTE; fi"]
```

Construa e execute com outra tag:

```bash
docker build -t minhas-layers:remocao .
docker run --rm minhas-layers:remocao
```

**Saída esperada:**

```text
NAO_EXISTE
```

Isso **não significa** que os dados da primeira instrução `RUN` desapareceram da camada anterior. A exclusão fica registrada na camada superior (tipicamente por meio de um *whiteout*), ocultando o arquivo na visão final. Por isso, apagar arquivos em um `RUN` posterior **não garante** reduzir o tamanho da imagem.

#### 7. Inspecionando uma imagem pronta (Nginx)

O mesmo princípio se aplica a imagens distribuídas pelo Docker Hub:

```bash
docker pull nginx:stable

docker image history nginx:stable

docker image inspect nginx:stable \
  --format '{{json .RootFS.Layers}}'
```

**O que observar:** o histórico apresenta instruções e metadados da construção; o `RootFS.Layers` apresenta as camadas de filesystem. A quantidade de linhas do histórico pode ser diferente da quantidade de camadas.

#### 8. Limpeza

```bash
docker image rm minhas-layers:1.0 minhas-layers:remocao
```

Isso remove as referências locais criadas para o experimento, desde que não existam containers que impeçam a remoção. Você pode manter `nginx:stable` para os próximos exercícios.

#### Resumo para lembrar

- **Imagem:** conjunto de camadas de filesystem imutáveis mais metadados de configuração.
- **Layer:** registra alterações no filesystem e pode ser reutilizada por diferentes imagens.
- **`RUN`:** executa no build; as alterações persistidas normalmente geram uma camada de filesystem.
- **`CMD`:** define o comando padrão do container, sem criar uma layer de arquivos.
- **Camadas superiores:** podem substituir ou ocultar arquivos de camadas inferiores, sem reescrevê-las.
- **Container:** normalmente adiciona sua própria camada gravável sobre as camadas da imagem.


## Veja também

- [O que é Docker?](../o-que-e-docker/)
- [O que são containers?](../o-que-sao-containers/)
- [O que é o Docker Engine?](../o-que-e-docker-engine/)


## Referências

- [Fontes usadas para esta página](../../../referencias/docker/)