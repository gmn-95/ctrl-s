---
title: O que é runc?
description: Minha explicação sobre o que é runc e seu uso
sidebar:
    order: 10
---

É uma ferramenta de baixo nível responsável por **criar e iniciar os containers** linux utilizando as funcionalidades do próprio kernel. É um dos componentes responsável por transformar a configuração de um container em um processo **realmente executado e isolado** pelo linux.

Quando recebe uma configuração válida, pode realizar processos como:

- Criar ou utilizar namespaces para isolar a visão de processos, redes e outros recursos.
- Configurar cgroups para controalr o uso de recursos
- Preparar o sistema de arquivos e os pontos de montagem do container
- Aplicar configurações de segurança, permssões e capacidades
- Iniciar o processo da aplicação

Tudo isso pertence ao linux, o `runc` apenas utiliza desses recursos para construir o ambiente necessário.

O runc não é um daemon, portanto não precisa permanecer executando em segundo plano durante toda a vida do container.
Ele é normalmente invocado quando alguma operação específica precisa ser realizada, como criar ou iniciar um container, utilizando as configurações recebidas e os mecanismos de isolamento do kernel Linux.
Após concluir sua operação, o processo runc pode ser encerrado sem interromper a aplicação que está executando dentro do container.
Portanto, não encontrar um processo runc ativo não significa que o Docker deixou de utilizá-lo.



## Veja também

- [O que é docker?](../o-que-e-docker/)
- [O que são containers?](../o-que-sao-containers/)

## Referências

- [Fontes usadas para esta página](../../../referencias/docker)
