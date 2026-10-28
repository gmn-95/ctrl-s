---
title: Quais são os comandos Docker mais usados?
description: Uma referência prática com comandos Docker, explicações curtas, exemplos e templates para copiar.
sidebar:
    order: 4
---

Esta é uma cola para o dia a dia. Os exemplos usam nomes como `meu-app` e
`minha-imagem`; substitua esses valores pelos nomes do seu projeto.

:::tip
Use `docker comando --help` quando precisar descobrir todas as opções de um
comando. Por exemplo: `docker run --help`.
:::

## Entendendo a estrutura de um comando

```bash
docker [opções globais] comando [opções do comando] argumentos
```

Exemplo:

```bash
docker run --name meu-nginx -d -p 8080:80 nginx:alpine
```

Nesse caso, `run` cria e inicia um container, `--name` define seu nome, `-d`
o deixa rodando em segundo plano, `-p` publica uma porta e `nginx:alpine` é a
imagem usada.

## Verificar a instalação e pedir ajuda

```bash
# Versão do cliente Docker
docker --version

# Informações do ambiente: containers, imagens, armazenamento e servidor
docker info

# Ajuda geral ou ajuda de um comando específico
docker --help
docker run --help
```

`docker info` é especialmente útil quando o cliente está instalado, mas não
consegue se conectar ao Docker Engine.

## Imagens

Imagens são os modelos usados para criar containers.

```bash
# Baixar uma imagem do registry padrão (Docker Hub)
docker pull nginx:alpine

# Listar imagens locais
docker image ls

# Remover uma imagem que não é mais necessária
docker image rm nginx:alpine

# Construir uma imagem a partir do Dockerfile na pasta atual
docker build -t meu-app:1.0 .

# Adicionar outra tag à mesma imagem
docker tag meu-app:1.0 usuario/meu-app:1.0

# Enviar a imagem para um registry depois de fazer login
docker login
docker push usuario/meu-app:1.0
```

O ponto final em `docker build ... .` é o contexto do build: ele informa que
o Dockerfile e os arquivos disponíveis para a construção estão na pasta atual.

### Template de Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 3000

CMD ["npm", "run", "start"]
```

Build e execução:

```bash
docker build -t meu-app:dev .
docker run --name meu-app -p 3000:3000 meu-app:dev
```

## Criar e executar containers

O comando mais importante é `docker run`: ele cria um container a partir de
uma imagem e o inicia. Se a imagem ainda não estiver localmente, o Docker tenta
baixá-la.

```bash
# Executar um container simples e removê-lo ao terminar
docker run --rm hello-world

# Rodar em segundo plano, com nome e porta publicada
docker run -d --name meu-nginx -p 8080:80 nginx:alpine

# Abrir um shell interativo temporário
docker run --rm -it alpine sh

# Definir variáveis de ambiente e montar uma pasta do host
docker run --rm \
  --name meu-app \
  -e NODE_ENV=development \
  -v "$PWD":/app \
  -w /app \
  node:22-alpine npm install
```

### Template geral de `docker run`

```bash
docker run [OPÇÕES] IMAGEM [COMANDO] [ARGUMENTOS]
```

```bash
docker run -d \
  --name <nome-do-container> \
  -p <porta-do-host>:<porta-do-container> \
  -e <NOME>=<valor> \
  -v <caminho-do-host>:<caminho-no-container> \
  <imagem>:<tag>
```

As opções mais usadas são:

| Opção | Para que serve |
| --- | --- |
| `-d`, `--detach` | Executa em segundo plano. |
| `--name` | Define um nome fácil de reutilizar. |
| `-p HOST:CONTAINER` | Publica uma porta do container no host. |
| `-e NOME=valor` | Define uma variável de ambiente. |
| `-v HOST:CONTAINER` | Monta uma pasta ou volume. |
| `--rm` | Remove o container quando o processo termina. |
| `-it` | Mantém uma sessão interativa com terminal. |
| `--restart unless-stopped` | Tenta reiniciar após falhas ou reboot. |

:::warning
`--rm` é ótimo para testes descartáveis. Para dados importantes, use um
volume nomeado ou um bind mount; o filesystem do container não deve ser
tratado como armazenamento permanente.
:::

## Listar, acompanhar e controlar containers

```bash
# Listar apenas containers em execução
docker ps

# Listar todos, inclusive os parados
docker ps -a

# Iniciar, parar e reiniciar um container existente
docker start meu-nginx
docker stop meu-nginx
docker restart meu-nginx

# Remover um container parado
docker rm meu-nginx

# Parar e remover à força um container em execução
docker rm -f meu-nginx
```

`docker run` cria um container novo. `docker start` apenas inicia novamente um
container que já existe.

### Logs, shell e inspeção

```bash
# Exibir logs e acompanhar novas linhas
docker logs meu-nginx
docker logs -f --tail 100 meu-nginx

# Executar um comando em um container em execução
docker exec -it meu-nginx sh

# Executar um comando sem abrir uma sessão interativa
docker exec meu-nginx ls -la /usr/share/nginx/html

# Ver a configuração completa em JSON
docker inspect meu-nginx

# Copiar arquivos entre host e container
docker cp meu-nginx:/etc/nginx/nginx.conf ./nginx.conf
docker cp ./index.html meu-nginx:/usr/share/nginx/html/index.html

# Acompanhar CPU, memória, rede e I/O
docker stats meu-nginx
```

`docker exec` só funciona enquanto o processo principal do container está em
execução. Para um container parado, prefira `docker start` ou examine seus
logs e sua configuração.

## Volumes, redes e limpeza

```bash
# Criar e listar volumes nomeados
docker volume create dados-app
docker volume ls

# Usar um volume nomeado em um novo container
docker run -d --name banco \
  -e POSTGRES_PASSWORD=troque-esta-senha \
  -v dados-app:/var/lib/postgresql/data \
  postgres:16

# Criar e listar redes
docker network create rede-app
docker network ls

# Conectar um container a uma rede existente
docker network connect rede-app meu-app
```

Comandos de limpeza devem ser usados com atenção:

```bash
# Remover containers parados
docker container prune

# Remover imagens sem uso por containers
docker image prune

# Remover recursos não utilizados (confirme o que será apagado)
docker system prune
```

:::caution
`docker system prune -a --volumes` pode remover imagens, containers,
redes e volumes não utilizados. Não use esse comando sem verificar se os
volumes não contêm dados necessários.
:::

## Docker Compose

Use Compose quando a aplicação depende de mais de um serviço, como uma API,
um banco e um cache.

```bash
# Criar e iniciar os serviços
docker compose up -d

# Criar/recriar imagens antes de iniciar
docker compose up -d --build

# Ver serviços do projeto
docker compose ps

# Acompanhar logs de todos os serviços ou de um serviço específico
docker compose logs -f
docker compose logs -f api

# Executar um comando em um serviço em execução
docker compose exec api sh

# Parar e remover containers e redes criados pelo projeto
docker compose down
```

`docker compose exec` entra em um container já em execução. Para rodar um
comando isolado em um novo container com a configuração de um serviço, use
`docker compose run`:

```bash
docker compose run --rm api npm test
```

### Template mínimo de `compose.yaml`

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:troque-esta-senha@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: app
      POSTGRES_PASSWORD: troque-esta-senha
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

## Fluxo rápido para investigar um problema

```bash
# 1. O container existe e está rodando?
docker ps -a

# 2. O processo deixou alguma mensagem de erro?
docker logs --tail 100 <container>

# 3. Como ele foi criado e quais portas/volumes usa?
docker inspect <container>

# 4. O serviço está respondendo dentro do container?
docker exec -it <container> sh

# 5. Há consumo ou falta de recursos?
docker stats <container>
```

## Referências

- [Fontes usadas para esta página](../../../referencias/docker/)