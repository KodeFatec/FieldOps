# FieldOps — Angular

Aplicação de gerenciamento de inspeções técnicas em campo, migrada de páginas HTML/CSS/Bootstrap e scripts JavaScript para **Angular com NgModules (sem componentes standalone)**.

## Stack
- Angular 22.2
- TypeScript 6
- Bootstrap 5.3.8 e Bootstrap Icons
- ng-bootstrap 21 (Angular powered Bootstrap)
- Angular Router, FormsModule e Chart.js

A compatibilidade de versões segue a matriz de ng-bootstrap: ng-bootstrap 21 para Angular 22 e Bootstrap CSS 5.3.8.

## Requisitos
- Node.js 22.22.3+ (ou uma versão 24 compatível com Angular 22)
- npm

## Executar
```bash
npm install
npm start
```
Aplicação em `http://localhost:4200`.

## Build
```bash
npm run build
```

## Estrutura
```text
src/
├── app/
│   ├── auth/                 # Login e cadastro
│   ├── core/
│   │   ├── models.ts         # Interfaces TypeScript do domínio
│   │   └── fieldops-data.service.ts
│   ├── features/             # Dashboard, clientes, usuários, ativos,
│   │                          # inspeções, revisões e checklists
│   ├── layout/               # Shell, menu lateral e barra superior
│   ├── app-routing.module.ts
│   └── app.module.ts
├── assets/
└── styles.css
```

## Rotas
- `/login`, `/register`
- `/app/dashboard`
- `/app/users`, `/app/clients`, `/app/equipment`
- `/app/inspection-templates`
- `/app/inspection-templates/new`, `/app/inspection-templates/new-standard`
- `/app/inspection-templates/:templateId/edit`
- `/app/inspections`, `/app/reviews`, `/app/non-conformities`

## Notas da migração
- O shell (menu, cabeçalho, notificações e navegação responsiva) agora é compartilhado por todas as rotas internas.
- Cada área tem seu componente Angular e os arquivos de comportamento estão em TypeScript; não há mais scripts JS de página acoplados ao DOM.
- Dados de clientes, usuários e modelos de inspeção são demonstrativos, tipados e salvos no localStorage do navegador.
- O login/cadastro mantém o comportamento de demonstração do protótipo. Não existe autenticação real nem API de backend neste repositório.
- As operações de criação e edição locais não substituem persistência, sincronização offline ou controle de permissões no servidor.
- As três imagens de evidência originais foram preservadas em `src/assets/evidence/`.

**FieldOps — Organizando inspeções em campo.**
