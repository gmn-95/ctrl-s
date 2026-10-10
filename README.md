# Ctrl+S

Um acervo pessoal de tecnologia: explicações em português, com linguagem simples,
sobre o que já sei e o que estou aprendendo. Cada página tenta responder uma
pergunta real — sem a pretensão de ser uma documentação formal ou completa.

O site é construído com [Astro](https://astro.build/) e
[Starlight](https://starlight.astro.build/) e será publicado no GitHub Pages.

## Estrutura do conteúdo

As páginas ficam em `src/content/docs/`. O caminho do arquivo vira a rota do
site.

```text
src/content/docs/
├── devops/docker/       # Docker, containers, imagens e Docker Engine
├── infraestrutura/      # Infraestrutura, como on-premises
├── linux/               # Conceitos de Linux, como daemon e systemd
└── referencias/         # Fontes usadas nas páginas
```

Por exemplo, `src/content/docs/linux/o-que-e-systemd.md` é publicado em
`/linux/o-que-e-systemd/`.

## Como adicionar uma anotação

1. Crie um arquivo Markdown na pasta do assunto, com um nome em minúsculas e
   separado por hífens.
2. Adicione um frontmatter com título e descrição:

   ```md
   ---
   title: O que é uma imagem Docker?
   description: Minha explicação sobre o modelo usado para criar containers.
   sidebar:
     order: 3
   ---
   ```

3. Escreva a explicação em tom direto, incluindo exemplos pequenos quando
   fizer sentido.
4. Inclua uma seção `## Veja também` com links para perguntas relacionadas.
   Entre páginas na mesma pasta, use `../nome-da-pagina/`.
5. Se a anotação usou fontes externas, crie ou atualize uma página correspondente
   em `src/content/docs/referencias/` e conecte as duas páginas.

Páginas dentro das pastas já configuradas aparecem automaticamente no menu.
Para uma tecnologia nova na página inicial, adicione um `LinkCard` em
`src/content/docs/index.mdx`.

## Desenvolvimento local

Instale as dependências uma vez:

```sh
pnpm install
```

Inicie o servidor de desenvolvimento em segundo plano:

```sh
astro dev --background
astro dev status
```

O endereço local será exibido pelo Astro. Para interromper ou consultar logs:

```sh
astro dev stop
astro dev logs
```

## Validar o site e a busca

Antes de publicar, gere a versão estática:

```sh
pnpm build
```

A busca usa um índice criado durante o build. Para testá-la localmente, sirva
o conteúdo gerado em outra porta:

```sh
pnpm preview -- --port 4322
```

Abra `http://localhost:4322` e use a busca normalmente.

## Arquivos estáticos

- Coloque imagens usadas pelas páginas em `src/assets/` e referencie-as com um
  caminho relativo no Markdown.
- Coloque arquivos públicos, como o favicon, em `public/`.
