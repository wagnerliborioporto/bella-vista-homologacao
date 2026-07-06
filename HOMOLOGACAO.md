# Bella Vista — ambiente de homologação

Esta cópia foi preparada para testes sem alterar o site oficial.

## Proteções aplicadas

- Indexação desativada no metadata do Next.js.
- `public/robots.txt` bloqueia todos os robôs.
- GitHub Actions deve permanecer desativado neste repositório.
- Scripts de deploy automático foram removidos do `package.json`.
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

## Ativar formulário de teste

Crie um formulário exclusivo no Formspree e configure:

```env
NEXT_PUBLIC_ENABLE_FORMS=true
NEXT_PUBLIC_FORMSPREE_ID=SEU_ID_DE_TESTE
```

Nunca reutilize o identificador do formulário oficial na homologação.
