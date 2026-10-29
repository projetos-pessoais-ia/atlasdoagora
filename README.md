# Atlas do Agora

Site editorial de jornalismo visual construído com Next.js, React, TypeScript e Tailwind CSS. As matérias são geradas a partir de `app/data.ts`. O projeto usa `output: 'export'`: o resultado publicável é a pasta `out/`, sem servidor Next.js, Functions ou OpenNext.

## Desenvolvimento

```sh
npm ci
npm run dev
```

## Produção

```sh
npm run build:pages
```

Esse comando compila o site e verifica o material estático: páginas do sitemap, canônicas, 404, robots, ads.txt, scripts em produção/prévia e limite de tamanho por arquivo. `npm run build` continua disponível. Para validar isoladamente a pasta já gerada, executar `npm run check:pages` usando as mesmas variáveis de ambiente do build.

## Cloudflare Pages: configuração da nova tentativa

O log de 29/10/2026 mostra que `npm run build` terminou com sucesso. O erro ocorreu na publicação: `npx wrangler deploy` detectou Next.js e iniciou uma migração automática para Workers/OpenNext. O adaptador procurou `.next/standalone/.next/server/pages-manifest.json`, que não faz parte da exportação estática utilizada aqui.

Para hospedar no **Cloudflare Pages**, conectar o projeto pela aba **Pages**, não pelo fluxo de criação de Workers:

1. Cloudflare: Workers & Pages → Create application → Pages → Import an existing Git repository.
2. Selecionar `projetos-pessoais-ia/atlasdoagora`.
3. Configurar:

| Campo | Valor |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build:pages` |
| Build output directory | `out` |
| Root directory | Raiz do repositório; deixar vazio se o painel permitir |

4. Publicar e conferir a URL `*.pages.dev` fornecida pelo Pages.

No fluxo integrado ao Git do Pages, não há comando separado de deploy. Se a tela exige `npx wrangler deploy` ou `wrangler versions upload`, ela corresponde ao fluxo de Workers; voltar e escolher Pages. Não usar `.next` como diretório de publicação, OpenNext, `@cloudflare/next-on-pages`, `output: 'standalone'` ou migração automática para este site estático.

O `wrangler.jsonc` declara `pages_build_output_dir: './out'`. Se outro nome for escolhido no Cloudflare, atualizar o campo `name` para corresponder. Para publicar manualmente uma exportação já preparada com ambiente de produção do Pages, o comando é `npx wrangler@4 pages deploy out --project-name atlasdoagora --branch main`; ele requer autenticação e um projeto Pages apropriado. O teste local não publica nem cria recursos na conta.

## Ambientes e indexação

- O Pages fornece `CF_PAGES=1` e `CF_PAGES_BRANCH` no build.
- `main` é a branch de produção. Outras branches do Pages geram `noindex`, bloqueio de rastreamento no robots e omitem GTM/AdSense.
- A proteção existente de prévias da Vercel continua funcionando. Não copiar `VERCEL_ENV=preview` ou `development` para o ambiente de produção do Cloudflare.
- O domínio canônico continua sendo `https://www.atlasdoagora.com.br/`. Não trocar canônicas ou sitemap pelo endereço temporário `pages.dev`.
- O Vercel Analytics só carrega na Vercel. No build do Pages, a Política de Privacidade identifica a Cloudflare como hospedagem.
- `public/_headers` configura cache longo apenas para arquivos versionados de `/_next/static/`.
- A exportação inclui `404.html`, para o Pages não tratar todas as URLs inexistentes como uma aplicação de página única.

## Domínio próprio após validar o Pages

Conectar `www.atlasdoagora.com.br` nos domínios personalizados do projeto Pages e seguir as instruções DNS apresentadas pelo Cloudflare. Manter o domínio sem `www` redirecionando para `https://www.atlasdoagora.com.br`, preservando caminho e parâmetros. Não redirecionar o domínio antigo antes de verificar o novo projeto, o certificado e as rotas das matérias.

Este ajuste de código não muda nameservers, DNS ou domínio personalizado, nem encerra a hospedagem anterior. Essas etapas são feitas na conta após validar a nova publicação.

## Conteúdo e serviços

Matérias com fontes e metodologias por publicação, páginas Sobre, Contato e Política de Privacidade, busca e filtros no navegador. Não há CMS, cadastro, newsletter ou formulário de envio. Mapas utilizam `@svg-maps/brazil` (MIT). O layout inclui GTM e AdSense em produção; a configuração da conta de publicidade permanece no Google.

## Referências

- [Next.js estático no Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Build e variáveis de ambiente](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Configuração Wrangler de Pages](https://developers.cloudflare.com/pages/functions/wrangler-configuration/)
- [Comando pages deploy](https://developers.cloudflare.com/workers/wrangler/commands/pages/)
