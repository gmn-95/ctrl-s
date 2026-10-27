---
title: O que é docker file?
---

Dockerfile é um arquivo de texto que contém uma sequencia de instruções utilizadas para construir uma imagem docker.

Essas instruções informam ao docker qual imagem usar como base, quais arquivos adicionar, quais comandos executar, e qual processo deve iniciar quando um container for executado.

Sem um docker file, teríamos que fazer tudo manualmente para todo o ambiente.

Com um dockerfile, escrevemos como uma imagem deverá ser construída.

Ex de dockerfile:

```dockerfile

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY app.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

Esse arquivo utiliza uma imagem com Java 21, define um diretório de trabalho, copia um JAR previamente compilado e configura sua execução.

O dockerfile é usado para criar a imagem, e não toda vez que o container é iniciado.

| Instrução | Finalidade | Momento |
| --- | --- | --- |
| `FROM` | Define a imagem base | Build |
| `WORKDIR` | Define o diretório de trabalho | Build e configuração da execução |
| `COPY` | Copia arquivos para a imagem | Build |
| `RUN` | Executa comandos portas utilizadas pela aplicação | Configuração da imagem |
| `EXPOSE` | Documenta portas utilizadas pela aplicação | Configuração da imagem |
| `CMD` | Define o comando padrão do container | Execução do container |


Existe uma distinção fundamental entre RUN e CMD:

| RUN | CMD |
| --- | ---|
| Executa durante o build	| Configura o comando de inicialização |
| Pode adicionar ou modificar arquivos | Não executa o comando durante o build |
| Normalmente produz uma camada de filesystem | Registra metadados na imagem |
| Pode aparecer várias vezes | Apenas o último CMD da etapa tem efeito |

Além disso, o comando definido por CMD pode ser substituído ao executar docker run, dependendo da configuração de ENTRYPOINT da imagem.

## Qual a Diferença entre Run e Build?

Build é o processo de construir a imagem. Run é o processo de criar e iniciar um container a partir dela.

## Referências

- [Fontes usadas para esta página](../../../referencias/docker/)