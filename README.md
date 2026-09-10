# NERVE

O NERVE é uma aplicação web voltada à organização de tarefas, compromissos e informações. A proposta é apoiar a produtividade de pessoas com TDAH por meio de uma interface visual, categorias de prioridade e uma organização simples das atividades.

## Funcionalidades

- Página inicial com apresentação do projeto e informações sobre produtividade e TDAH.
- Criação de conta e login com usuário ou e-mail.
- Gerenciamento de tarefas autenticadas:
  - criar, editar e excluir tarefas;
  - definir título, descrição, estado, urgência, worklist e prazo;
  - visualizar tarefas pendentes, urgentes, concluídas e na worklist;
  - receber alerta sonoro para tarefas com alarme configurado.
- Persistência da sessão de autenticação no navegador.

## Tecnologias

- HTML5
- CSS3
- JavaScript no navegador, usando módulos ES
- [jwt-decode](https://www.npmjs.com/package/jwt-decode) para leitura das informações do token de autenticação
- API REST externa para autenticação e tarefas

## Como executar

### Pré-requisitos

- Node.js e npm instalados.
- Acesso à API externa utilizada pela aplicação.

### Instalação

Clone o repositório e instale a dependência do projeto:

```bash
git clone https://github.com/lucasccesar/nerve.git
cd nerve
npm install
```

### Servidor local

O projeto é uma aplicação estática e não possui um script `start` no `package.json`. Execute um servidor HTTP na raiz do projeto. Por exemplo, com Python:

```bash
python -m http.server 8000
```

Depois, acesse [http://localhost:8000](http://localhost:8000) no navegador.

Também é possível utilizar outro servidor estático, como o `serve` via `npx`:

```bash
npx serve .
```

O uso de um servidor HTTP é recomendado porque as páginas carregam módulos JavaScript e arquivos da dependência instalada em `node_modules`.

## Estrutura do projeto

```text
.
├── index.html                 # Página inicial
├── login.html                 # Login e cadastro
├── tasks.html                 # Visão geral das tarefas
├── account-created.html       # Confirmação de criação de conta
├── login-page/                # Scripts, estilos e assets da autenticação
├── main-page/                 # Scripts, estilos e assets da página inicial
├── tasks/                     # Visões e regras das categorias de tarefas
├── package.json               # Dependências do projeto
└── package-lock.json          # Versões bloqueadas das dependências
```

## API e autenticação

As requisições de login, cadastro e tarefas usam a API `https://pi-kxis.onrender.com`. Após o login, os tokens são mantidos no `localStorage` do navegador e enviados nas requisições autenticadas.

Não inclua tokens, senhas ou dados reais no código-fonte ou em commits. A pasta `node_modules/` é criada localmente pelo `npm install` e não deve ser versionada.

## Projeto

O projeto NERVE está associado ao perfil [@nerve.br no Instagram](https://www.instagram.com/nerve.br/).
