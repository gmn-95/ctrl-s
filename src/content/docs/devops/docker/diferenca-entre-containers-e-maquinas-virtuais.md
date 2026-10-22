---
title: Qual é a diferença entre containers e máquinas virtuais?
description: Minha comparação inicial entre containers Linux e máquinas virtuais.
sidebar:
    order: 8
---

Não são a mesma coisa. Uma máquina virtual (VM) virtualiza hardware para executar um sistema operacional convidado, com kernel próprio. Um hypervisor distribui os recursos físicos da máquina entre as VMs.

Já um container Linux não inicia outro kernel: ele aproveita o kernel do host e usa mecanismos do Linux para isolar processos e controlar recursos. Por isso, em geral, containers iniciam mais rápido e consomem menos recursos do que uma VM completa.

Isso não faz um substituir o outro. São ferramentas para necessidades diferentes: uma VM traz o isolamento de um sistema operacional completo; um container prioriza iniciar e distribuir uma aplicação de forma leve e reproduzível.

## Veja também

- [O que são containers?](../o-que-sao-containers/)
- [Por que containers Linux compartilham o kernel do host?](../por-que-containers-compartilham-kernel-host/)
- [O que é Docker?](../o-que-e-docker/)
