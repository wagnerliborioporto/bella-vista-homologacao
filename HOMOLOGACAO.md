# Bella Vista — ambiente de homologação

Esta cópia foi preparada para testes sem alterar o site oficial.

## Proteções aplicadas

- Indexação desativada no metadata do Next.js.
- `public/robots.txt` bloqueia todos os robôs.
- GitHub Actions habilitado somente para publicar a homologação no GitHub Pages.
- Scripts antigos de deploy automático foram removidos do `package.json`.
- Formulário desativado por padrão para não enviar mensagens ao Formspree original.
- Configuração do Tailwind corrigida para ler a pasta `app`.

## Rodar localmente

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

## Gerar versão estática

```bash
npm run build
```

O resultado será criado em `out/` e copiado para `dist/`.

## Publicação

A homologação é publicada automaticamente pelo workflow do GitHub Pages após alterações na branch `main`.

Endereço previsto:

```text
https://wagnerliborioporto.github.io/bella-vista-homologacao/
```

## Ativar formulário de teste

Crie um formulário exclusivo no Formspree e configure:

```env
NEXT_PUBLIC_ENABLE_FORMS=true
NEXT_PUBLIC_FORMSPREE_ID=SEU_ID_DE_TESTE
```

Nunca reutilize o identificador do formulário oficial na homologação.
