---
title: O que é o Docker Engine?
description: Minha explicação sobre a parte do Docker que recebe comandos e gerencia containers.
sidebar:
    order: 5
---

O Docker Engine é a parte do Docker que recebe comandos e transforma essa intenção em containers rodando. Ele funciona como uma arquitetura cliente-servidor e reúne:

- o serviço de longa duração `dockerd`;
- uma API para que programas possam enviar instruções;
- a Docker CLI, usada no terminal com comandos como `docker run` e `docker build`.

## O que é o `dockerd`?

`dockerd` é um [daemon](../../../linux/o-que-e-um-daemon/): um processo que fica em execução em segundo plano. Ele gerencia recursos como imagens, redes, volumes e containers.

## O que acontece quando executo um comando Docker?

1. A Docker CLI, ou outra interface, recebe o comando do usuário.
2. Ela envia uma solicitação para a API do Docker Engine.
3. O `dockerd`, que já está em execução, recebe a solicitação.
4. O daemon coordena a criação e a inicialização do container com os componentes internos necessários.


## Veja também

- [O que é Docker?](../o-que-e-docker/)
- [O que são containers?](../o-que-sao-containers/)
- [O que são imagens Docker?](../o-que-sao-imagens-docker/)
