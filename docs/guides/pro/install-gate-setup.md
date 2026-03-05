# LMAS Pro — Guia de Instalacao e Licenciamento

Guia completo para instalar, ativar e gerenciar o LMAS Pro.

**Story:** PRO-6 — License Key & Feature Gating System

---

## Visao Geral

O LMAS Pro e distribuido via npm publico. O pacote e livre para instalar, mas as features premium requerem uma **licenca ativa** para funcionar.

```
Comprar Licenca → Instalar → Ativar → Usar Features Pro
```

### Pacotes npm

| Pacote | Tipo | Proposito |
|--------|------|-----------|
| `lmas-pro` | CLI (1.8 KB) | Comandos de instalacao e gerenciamento |
| `@lmas-fullstack/pro` | Core (10 MB) | Features premium (squads, memory, metrics, integrations) |

---

## Instalacao Rapida

```bash
# Instalar LMAS Pro (instala @lmas-fullstack/pro automaticamente)
npx lmas-pro install

# Ativar sua licenca
npx lmas-pro activate --key PRO-XXXX-XXXX-XXXX-XXXX

# Verificar ativacao
npx lmas-pro status
```

---

## Passo a Passo

### Prerequisitos

- Node.js >= 18
- `lmas-core` >= 4.0.0 instalado no projeto

### Passo 1: Instalar LMAS Pro

```bash
npx lmas-pro install
```

Isso executa `npm install @lmas-fullstack/pro` no seu projeto.

**Alternativa** (instalacao manual):

```bash
npm install @lmas-fullstack/pro
```

### Passo 2: Ativar Licenca

Apos a compra, voce recebera uma chave no formato `PRO-XXXX-XXXX-XXXX-XXXX`.

```bash
npx lmas-pro activate --key PRO-XXXX-XXXX-XXXX-XXXX
```

Esse comando:
1. Valida a chave contra o License Server (`https://lmas-license-server.vercel.app`)
2. Registra sua maquina (machine ID unico)
3. Salva um cache local criptografado para uso offline

### Passo 3: Verificar

```bash
# Status da licenca
npx lmas-pro status

# Listar features disponiveis
npx lmas-pro features
```

---

## Comandos Disponiveis

| Comando | Descricao |
|---------|-----------|
| `npx lmas-pro install` | Instala `@lmas-fullstack/pro` no projeto |
| `npx lmas-pro activate --key KEY` | Ativa uma chave de licenca |
| `npx lmas-pro status` | Mostra status da licenca atual |
| `npx lmas-pro features` | Lista todas as features pro e disponibilidade |
| `npx lmas-pro validate` | Forca revalidacao online da licenca |
| `npx lmas-pro deactivate` | Desativa a licenca nesta maquina |
| `npx lmas-pro help` | Mostra todos os comandos |

---

## Operacao Offline

Apos a instalacao e ativacao, o LMAS Pro funciona offline:

- **30 dias** sem necessidade de revalidacao
- **7 dias de grace period** apos expirar o cache
- Verificacao de features 100% local no dia a dia

A internet so e necessaria para:
1. Ativacao inicial (`npx lmas-pro activate`)
2. Revalidacao periodica (automatica a cada 30 dias)
3. Desativacao (`npx lmas-pro deactivate`)

---

## CI/CD

Para pipelines, instale e ative usando secrets de ambiente:

**GitHub Actions:**
```yaml
- name: Install LMAS Pro
  run: npx lmas-pro install

- name: Activate License
  run: npx lmas-pro activate --key ${{ secrets.LMAS_PRO_LICENSE_KEY }}
```

**GitLab CI:**
```yaml
before_script:
  - npx lmas-pro install
  - npx lmas-pro activate --key ${LMAS_PRO_LICENSE_KEY}
```

---

## Troubleshooting

### Chave de licenca invalida

```
License activation failed: Invalid key format
```

- Verifique o formato: `PRO-XXXX-XXXX-XXXX-XXXX` (4 blocos de 4 caracteres hex)
- Sem espacos extras
- Abra uma issue em https://github.com/oluanferreira/luan-multiagent-scrum/issues se a chave foi fornecida a voce

### Maximo de seats excedido

```
License activation failed: Maximum seats exceeded
```

- Desative a licenca na outra maquina: `npx lmas-pro deactivate`
- Ou contate support para aumentar o limite de seats

### Erro de rede na ativacao

```
License activation failed: ECONNREFUSED
```

- Verifique sua conexao com a internet
- O License Server pode estar temporariamente indisponivel
- Tente novamente em alguns minutos

---

## Arquitetura do Sistema

```
┌─────────────────┐     ┌─────────────────────────────────┐     ┌──────────┐
│  Cliente (CLI)   │────>│  License Server (Vercel)        │────>│ Supabase │
│  npx lmas-pro    │<────│  lmas-license-server.vercel.app │<────│ Database │
└─────────────────┘     └─────────────────────────────────┘     └──────────┘
                                                                      │
                                                                      │
                        ┌─────────────────────────────────┐           │
                        │  Admin Dashboard (Vercel)       │───────────┘
                        │  lmas-license-dashboard         │
                        │  Cria/revoga/gerencia licencas  │
                        └─────────────────────────────────┘
```

| Componente | URL | Proposito |
|-----------|-----|-----------|
| License Server | `https://lmas-license-server.vercel.app` | API de ativacao/validacao |
| Admin Dashboard | `https://lmas-license-dashboard.vercel.app` | Gestao de licencas (admin) |
| Database | Supabase PostgreSQL | Armazena licencas e ativacoes |

---

## Suporte

- **Documentacao:** https://lmas.ai/pro/docs
- **Comprar:** https://lmas.ai/pro
- **Suporte:** https://github.com/oluanferreira/luan-multiagent-scrum/issues
- **Issues:** https://github.com/oluanferreira/luan-multiagent-scrum/issues

---

*LMAS Pro Installation Guide v3.0*
*Story PRO-6 — License Key & Feature Gating System*
