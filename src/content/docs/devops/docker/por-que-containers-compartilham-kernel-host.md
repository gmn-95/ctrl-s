---
title: Por que containers Linux compartilham o kernel do host?
description: Minha explicação sobre como containers usam o kernel do sistema hospedeiro.
sidebar:
    order: 6
---

Um container não traz um kernel próprio. Os programas dentro dele fazem chamadas de sistema que são atendidas pelo kernel Linux da máquina hospedeira. A imagem entrega os arquivos e configurações da aplicação; o kernel do host fornece as funcionalidades do sistema operacional.

O isolamento continua existindo porque o Linux separa processos e controla recursos. Dessa forma, vários containers podem rodar lado a lado sem que cada um precise inicializar um sistema operacional inteiro.

## Veja também

- [O que são containers?](../o-que-sao-containers/)
- [Qual é a diferença entre containers e máquinas virtuais?](../diferenca-entre-containers-e-maquinas-virtuais/)
- [O que é o Docker Engine?](../o-que-e-docker-engine/)
