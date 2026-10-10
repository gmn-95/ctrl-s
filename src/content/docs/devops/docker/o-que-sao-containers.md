---
title: O que são containers?
description: Minha explicação sobre ambientes isolados para executar aplicações.
sidebar:
    order: 2
---

Containers são ambientes isolados para executar aplicações e serviços com suas dependências e configurações. Esse isolamento permite rodar aplicações diferentes — até com versões distintas da mesma dependência — no mesmo computador, reduzindo conflitos entre elas.

Em sistemas Linux, os containers compartilham o kernel do sistema hospedeiro, mas isolam processos, sistema de arquivos, rede e outros recursos conforme a configuração. É por isso que são úteis em desenvolvimento, testes e produção: eles facilitam reproduzir o ambiente e evitam boa parte do clássico “na minha máquina funciona”.

## Veja também

- [O que é Docker?](../o-que-e-docker/)
- [Qual é a diferença entre containers e máquinas virtuais?](../diferenca-entre-containers-e-maquinas-virtuais/)
- [Por que containers Linux compartilham o kernel do host?](../por-que-containers-compartilham-kernel-host/)
