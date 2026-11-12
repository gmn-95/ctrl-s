---
title: Por que é preferivel usar exec form (como CMD) do que shell form?
---

A exec form é geralmente preferível para iniciar aplicações porque executa diretamente o programa, sem criar automaticamente um shell intermediário. Isso facilita o gerenciamento do PID 1 e o recebimento de sinais de encerramento, como SIGTERM.