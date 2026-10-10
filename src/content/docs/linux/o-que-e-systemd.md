---
title: O que é systemd?
description: Minha explicação sobre o gerenciador de serviços mais comum em distribuições Linux.
sidebar:
  order: 3
---

O `systemd` normalmente é o primeiro processo do espaço de usuário iniciado durante o *boot* e possui o PID 1. Entre suas responsabilidades está gerenciar serviços do sistema, como SSH, `cron` e, em algumas instalações, Docker.

Ele consegue iniciar, parar, reiniciar e acompanhar esses serviços.

## Exemplos de comandos

Ver o status do serviço Docker:

```sh
systemctl status docker
```

Reiniciar o serviço Docker:

```sh
sudo systemctl restart docker
```

## Qual é a diferença entre `systemd` e `systemctl`?

- `systemd` é o gerenciador de serviços.
- `systemctl` é o comando usado para interagir com o `systemd`.

## Veja também

- [O que é um daemon?](../o-que-e-um-daemon/)
- [O que é o Docker Engine?](../../devops/docker/o-que-e-docker-engine/)

