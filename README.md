# Atlas do Agora

Primeira versão do blog editorial, construída em Next.js, React, TypeScript e Tailwind CSS. Identidade visual original fornecida pelo usuário: azul #0B2D5B, coral #FF684A, amarelo e off-white.

## Desenvolvimento

```sh
npm install
npm run dev
```

## Produção

```sh
npm run typecheck
npm run build
```

O projeto usa exportação estática (`out/`), compatível com Vercel e hospedagem estática. Não requer variáveis de ambiente. As páginas de matérias são geradas a partir de `app/data.ts`; mapas vetoriais via `@svg-maps/brazil` (MIT).

## Escopo desta versão

- Página inicial responsiva, navegação por categoria, busca sem distinção de acentos e carregamento de mais matérias.
- Página individual para cada matéria, com metadata, área de fontes e metodologia.
- Página sobre o projeto e página 404.
- Logo original preservada; recorte exibido por CSS.
- As pautas e todos os gráficos são **demonstrativos**, explicitamente identificados. Nenhum valor representa estatística oficial. As matérias precisam de apuração e fontes antes da publicação editorial.

Sem CMS, cadastro, newsletter ou coleta de dados pessoais nesta etapa.
