# Documentação e limpeza do repositório — Implementation Plan

> **Para agentes de implementação:** executar as tarefas em ordem e validar o diff antes do commit final.

**Objetivo:** preparar o repositório NERVE para publicação com documentação básica, dependências locais ignoradas e remoção de artefatos experimentais inseguros.

**Arquitetura:** manter a aplicação estática existente sem alterar seus fluxos de login e tarefas. A documentação ficará no `README.md`, as regras de arquivos não versionados no `.gitignore` e o arquivo experimental `fetchs.js` será removido por não ter consumidores.

**Stack:** HTML, CSS e JavaScript no navegador; `jwt-decode` como dependência npm; API externa em `https://pi-kxis.onrender.com`.

## Restrições globais

- O README será escrito em português.
- `node_modules/` não deve ser versionado.
- Nenhum JWT hardcoded ou payload de teste deve permanecer no conteúdo versionado relacionado ao `fetchs.js`.
- A lógica integrada de login e gerenciamento de tarefas não será reescrita nesta mudança.
- O commit final não conterá linha `Co-authored-by`.

## Mapa de arquivos

- Criar `README.md`: visão geral, funcionalidades, instalação, execução, estrutura e API.
- Criar `.gitignore`: regra `node_modules/`.
- Excluir `fetchs.js`: arquivo experimental sem referências na aplicação.
- Não alterar `index.html`, `login-page/` ou `tasks/`: esses arquivos já contêm a implementação integrada do produto.

### Task 1: Criar documentação do projeto

**Arquivos:**
- Criar: `README.md`

**Interface produzida:** o README deve permitir que uma pessoa clone o repositório, instale a dependência com `npm install`, sirva os arquivos estáticos e entenda os fluxos principais sem precisar ler o código-fonte.

- [x] **Step 1: Escrever o README** com as seções `Sobre`, `Funcionalidades`, `Tecnologias`, `Como executar`, `Estrutura do projeto` e `Observações`.
- [x] **Step 2: Conferir o README** contra `package.json`, `index.html`, `login.html` e `tasks.html`, removendo qualquer comando ou funcionalidade que não exista no repositório.

### Task 2: Ignorar dependências locais

**Arquivos:**
- Criar: `.gitignore`

**Interface produzida:** o Git deve ignorar a pasta local `node_modules/` em qualquer checkout do projeto.

- [x] **Step 1: Criar `.gitignore`** contendo a linha `node_modules/`.
- [x] **Step 2: Validar a regra** com `git check-ignore -v node_modules/jwt-decode/package.json` e confirmar que o caminho é ignorado.

### Task 3: Remover código experimental inseguro

**Arquivos:**
- Excluir: `fetchs.js`

**Interface removida:** nenhum código de produção importa ou referencia `fetchs.js`; a aplicação continua usando os módulos em `login-page/` e `tasks/`.

- [x] **Step 1: Confirmar referências** com `rg -n "fetchs\.js|fetchs" --glob '!node_modules/**'` e verificar que não há consumidor da aplicação.
- [x] **Step 2: Excluir `fetchs.js`** porque seu conteúdo é composto por requisições experimentais, JWT exposto, dados de teste e variáveis fora de escopo.
- [x] **Step 3: Procurar resíduos** com `rg -n "eyJ[A-Za-z0-9_-]+\.|eu sou viado|a atividade" --glob '!node_modules/**'` e verificar que os resíduos específicos foram removidos.

### Task 4: Verificar e entregar

**Arquivos:**
- Verificar: `README.md`, `.gitignore`, `fetchs.js` e o diff completo.

- [x] **Step 1: Rodar `git diff --check`** e confirmar que não há erros de whitespace.
- [x] **Step 2: Conferir `git status --short` e `git diff --stat`** para garantir que somente o escopo aprovado está pendente.
- [x] **Step 3: Validar a sintaxe dos JavaScript mantidos** com `node --check` nos arquivos `.js` sem executar requisições externas.
- [x] **Step 4: Criar o commit final** sem co-author, usando uma mensagem que descreva documentação e limpeza.
- [x] **Step 5: Dar push para `origin/main`** e confirmar o commit remoto.
