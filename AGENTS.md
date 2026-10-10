## Propósito do projeto

Este é um acervo pessoal publicado no GitHub Pages. Ele reúne explicações em
linguagem simples sobre tecnologias que o autor já conhece ou está aprendendo.
Cada página responde a uma pergunta real — por exemplo, “O que é Docker?” — e
deve parecer uma anotação útil do autor, não documentação corporativa ou um
texto acadêmico.

Prioridades para conteúdo novo ou revisado:

- prefira clareza, exemplos curtos e tom conversacional em português;
- explique primeiro a ideia e depois os termos técnicos necessários;
- deixe explícito quando algo é uma nota de estudo, uma opinião ou conteúdo
  ainda em evolução;
- não invente profundidade: uma página curta e honesta é melhor que uma
  referência genérica e extensa;
- preserve a autoria e o sentido das anotações importadas do Obsidian.

## Conteúdo e organização

O projeto usa Astro com Starlight. Arquivos `.md` e `.mdx` em
`src/content/docs/` são páginas do site; o caminho do arquivo define a URL.

- Organize notas por assunto, por exemplo
  `src/content/docs/devops/docker/o-que-e-docker.md`.
- Dê a cada nota um frontmatter mínimo:

  ```md
  ---
  title: O que é Docker?
  description: Minha explicação curta sobre containers e Docker.
  ---
  ```

- Use títulos em forma de pergunta ou conceito e nomes de arquivo em
  minúsculas com hífens.
- Mantenha exemplos executáveis pequenos e indique o contexto em que foram
  testados quando isso for relevante.
- Registre páginas novas na barra lateral de `astro.config.mjs`, ou use uma
  seção com `autogenerate` para que uma pasta inteira apareça automaticamente.
- Imagens usadas por páginas devem ficar em `src/assets/`; arquivos estáticos
  que não precisam de processamento podem ficar em `public/`.

## Importação do Obsidian

As notas de origem ficam fora deste repositório em
`obsidian/anotacoes-obsidian/`. Antes de importar, copie somente as notas que
farão parte do acervo e revise os links específicos do Obsidian:

- `[[Outra nota]]` deve virar um link Markdown para a rota publicada, como
  `[Outra nota](/devops/docker/outra-nota/)`;
- `![[imagem.png]]` deve virar uma imagem Markdown apontando para um arquivo
  copiado para `src/assets/`;
- propriedades e frontmatter do Obsidian devem ser reduzidos ao frontmatter
  suportado pelo Starlight (`title`, `description`, e campos necessários);
- remova referências pessoais, rascunhos privados e caminhos locais antes de
  publicar;
- confira a página localmente e valide os links e as imagens antes do commit.

## Desenvolvimento

Instale as dependências com `pnpm install`. Ao iniciar o servidor de
desenvolvimento, use o modo em segundo plano:

```
astro dev --background
```

Gerencie-o com `astro dev stop`, `astro dev status` e `astro dev logs`.
Antes de concluir alterações no site, execute `pnpm build` para verificar a
geração estática.

## Documentação

Documentação completa: https://docs.astro.build

Consulte estes guias antes de trabalhar nos respectivos temas:

- [Rotas, páginas dinâmicas e middleware](https://docs.astro.build/en/guides/routing/)
- [Componentes Astro](https://docs.astro.build/en/basics/astro-components/)
- [Componentes de frameworks](https://docs.astro.build/en/guides/framework-components/)
- [Coleções e conteúdo](https://docs.astro.build/en/guides/content-collections/)
- [Estilos e Tailwind](https://docs.astro.build/en/guides/styling/)
- [Internacionalização](https://docs.astro.build/en/guides/internationalization/)
