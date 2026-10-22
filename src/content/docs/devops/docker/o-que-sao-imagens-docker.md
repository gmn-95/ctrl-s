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

## Veja também

- [O que é Docker?](../o-que-e-docker/)
- [O que são containers?](../o-que-sao-containers/)
- [O que é o Docker Engine?](../o-que-e-docker-engine/)
