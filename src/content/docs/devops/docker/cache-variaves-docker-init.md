---
title: Cache, variáveis e inicialização no docker
---

## Como o cache de build funciona?

O Docker processa as instruções do dockerfile para construir a imagem. Ele utiliza um mecanismo chamado buid cache, que permite reutilizar resultados de construções anterioes, desde que as entradas relevantes não tenham mudado. 

Exemplo prático:

```Dockerfile
FROM alpine:3.21

WORKDIR /app

RUN mkdir /logs

COPY mensagem.txt .

CMD ["cat", "mensagem.txt"]
```

No primeiro build, as operações necessárias são executadas ou resolvidas pela primeira vez. Se rodarmos o build novamente sem ter alterado nada, o docker pode reaproveitar do cache, ao invés de realizar cada operação novamente, pois não houve mudança. Isso pode resultar em uma construção bem mais rápida.

### Quando o cache deixa de ser inválido?

Imagine que modificamos o `mensagem.txt`, o docker percebe que os arquivos utilizados no `COPY` mudaram e precisa gerar um novo resultado nessa etapa. Portanto, o fluxo ficaria:

| Comando | Houve alguma alteração? | Cache foi reutilizado? |
| --- | --- | --- |
| FROM alpine:3.21 | Não | Sim |
| WORKDIR /APP | Não | Sim |
| RUN mkdir /logs | Não | Sim | 
| COPY mensagem.txt | Sim | Não |

- `CMD ["cat", "mensagem.txt"]` vai gerar um novo resultado

### Porque a ordem das instruções importa?

- Dockerfile Pouco eficiente:

```Dockerfile
FROM python:3.13-slim

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["python", "app.py"]
```

Imagine que o projeto contenha:

```
projeto/
├── Dockerfile
├── requirements.txt
└── app.py
```

E então modificamos apenas o código de `app.py`, sem alterar as dependencias.

Como estamos utilizando o `COPY . .`, o docker percebe a alteração nos arquivos copiados e invalida o resultado dessa etapa.

Consequentemente, o `RUN pip install` também precisará ser processado novamente, mesmo o `requirements.tx` não tendo mudado.

Isso por consequência, gera trabalho desnecessário.

- Mais eficiente:

```Dockerfile
FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

CMD ["python", "app.py"]
```

Agora as dependencias são copiadas e instaladas anstes do código da aplicação. Se alterarmos `app.py`, o docker poderá reutilizar o resultado da instalação das dependencias.

A ideia ao montar um dockerfile, é colocar etapas custosas que mudam pouco antes de etapas que mudam frequentemente (como o código da aplicação). Respeitando, obviamente, as dependencias e necessidades de cada operação.

# Diferença entre RUN, CMD e ENTRYPOINT

|Instrução|Função|Quando atua|
|---|---|---|
|RUN|Executa comandos para construir a imagem|Build|
|CMD|Define comando ou argumentos padrão|Inicialização|
|ENTRYPONT|Define o executável principal do containter|Inicialização|

## CMD - Define um comando padrão

```Dockerfile
FROM alpine:3.21

CMD ["echo", "Olá Docker"]
```

se executarmos:
```bash
docker run --rm minha-imagem
```
o resultado seria: 

```bash
Olá Docker
```

Mas podemos substituir o comando padrão, por exemplo:

```bash
docker run --rm minha-imagem echo "Outro comando"
```

O CMD pode ser subistituído pelos argumentos informados depois do nome da imagem no `docker run`.

## ENTRYPONT - Define o executável principal

```Dockerfile
FROM alpine:3.21

ENTRYPOINT ["echo"]
```

```bash
docker run --rm minha-imagem "Olá Docker"
```

Resultado:

```bash
Olá Docker
```

`echo` neste caso, é o executável definido por entrypoint, enquanto "Olá Docker" é o argumento enviado para ele.

Entrypoint é muito utilizado quando a imagem representa uma aplicação ou uma ferramenta específica.


## Referências

- [Fontes usadas para esta página](../../../referencias/docker/)