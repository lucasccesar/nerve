# Design: documentação e limpeza do repositório

## Objetivo

Preparar o repositório NERVE para uma versão final mais clara e segura, documentando o projeto e removendo artefatos experimentais com credenciais ou dados de teste.

## Escopo

- Criar `README.md` em português com:
  - visão geral do NERVE;
  - funcionalidades principais;
  - tecnologias e dependências;
  - instalação e execução local;
  - estrutura resumida do projeto;
  - observação sobre a API externa e autenticação.
- Criar `.gitignore` contendo `node_modules/`.
- Excluir `fetchs.js`, que não é referenciado pela aplicação e contém apenas requisições experimentais, JWT hardcoded, payload de teste e código incompleto.

## Decisões

O `fetchs.js` será excluído em vez de esvaziado ou reescrito: manter um arquivo sem uso não agrega funcionalidade e poderia sugerir que aqueles exemplos ainda fazem parte do fluxo oficial. A lógica de login e tarefas que está integrada às páginas existentes permanece inalterada.

## Verificação

Após as alterações, serão conferidos:

- status e diff do Git;
- presença de `node_modules/` no `.gitignore`;
- ausência de `fetchs.js`;
- ausência de JWT hardcoded e do payload de teste removido;
- consistência do README com os arquivos atuais;
- integridade sintática básica dos arquivos JavaScript modificados ou mantidos, quando houver ferramenta disponível.

