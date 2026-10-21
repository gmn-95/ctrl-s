---
title: O que é containerd?
description: Minha explicação sobre o que é containerd e seu uso
sidebar:
    order: 7
---

Ao invés de algumas aplicações (como o kubernets) precisar passar por todo fluxo e interfaces do docker para acessar e interagir com recursos do kernel linux (o que era pesado e lento), os desenvolvedores do docker, desenvolveram o que é chamado de `containerd`. Ele é uma camada `client` que serve justamente para interagir com esses recursos do kernel linux que o docke utiliza. Assim, isso fica abstraido, ou seja, separado do docker, sem precisar envolvelo diretamente. Com isso, o containerd gerencia o clico de vida e os recursos necessários para o container, como tarefas e os próprios containers.

## Veja também

- [O que é docker?](../o-que-e-docker/)
- [O que são containers?](../o-que-sao-containers/)

## Referências

- [Fontes usadas para esta página](../../../referencias/docker)