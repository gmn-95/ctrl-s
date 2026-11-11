---
title: O que é Multi-stage builds?
---

É uma tecnica que permite utilizar múltiplos estágios de construção em um mesmo [Dockerfile](../o-que-e-dockerfile), onde cada estágio contém suas próprias instruções e imagem base.

Exemplo:

```Dockerfile
# Estágio 1: Etapas e imagem necessárias para Compilação

FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /workspace

COPY pom.xml .

RUN mvn -B depedency:go-offline

COPY src ./src

RUN mvn -B -DskipTests package


# Estágio 2: Etapas e imagem necessárias para execução
FROM FROM maven:3.9-eclipse-temurin-21-jre AS runtime

WORKDIR /app

COPY --from=build /workspace/targe/app.jar /app/app.jar


EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

```

## Comparação de tamanho da imagem gerada entre os dois tipos

![](../../../../assets/docker/comparacao-multi-e-single-stage.png
)