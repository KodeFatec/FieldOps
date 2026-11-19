# FieldOps — Angular

Esta versão converte a aplicação original HTML, CSS e Bootstrap em Angular preservando as páginas, a ordem dos elementos, os textos, os modais, os toasts e os estilos da aplicação da branch `main`.

## Tecnologias
- Angular 22 + TypeScript
- Angular Router e NgModules (componentes **não standalone**)
- Bootstrap 5.3.8 e Bootstrap Icons
- ng-bootstrap 21
- Chart.js

## Instalar e executar
```bash
npm install
npm start
``

## Build
```bash
npm run build
``

## Rotas
- `/login` e `/register`
- `/app/dashboard`
- `/app/clients`
- `/app/equipment`
- `/app/users`
- `/app/inspections`
- `/app/review`
- `/app/non-conformities`
- `/app/inspection-templates`
- `/app/inspection-templates/new`
- `/app/inspection-templates/new-nr`
- `/app/inspection-templates/:templateId/edit`

## Fidelidade visual e estrutura
As páginas originais permanecem nos seus diretórios e os ficheiros `index.html` são os templates dos componentes Angular. Os ficheiros `styles.css` são preservados e associados aos componentes. Cada script JavaScript com comportamento foi convertido para TypeScript e ligado ao ciclo de vida do componente. A navegação usa Angular Router; o Bootstrap JS continua responsável pelos comportamentos já presentes nos modais/offcanvas/toasts, e ng-bootstrap está disponível no módulo Angular.

Os dados, textos e interações continuam a refletir o protótipo original; esta migração não cria uma API nem altera o backend.
