# README

Criado em: 22 de setembro de 2026 08:37
Tags: KODE

# FieldOps

Sistema para gerenciamento de inspeções técnicas em campo.

#### **Desenvolvido por:**

> Bryan Castilho Garcia,
> 

> Eduardo Couss de Oliveira,
> 

> João Victor Batista Ferreira,
> 

> Nicolas Trabachini Spinelli,
> 

> Raphael Scapin Pereira,
> 

> Vinícius de Lúcio Porto
> 

## 📌 Sobre o projeto

O **FieldOps** é uma plataforma desenvolvida para facilitar o planejamento, execução e acompanhamento de inspeções técnicas realizadas em campo.

O sistema permite que supervisores organizem as inspeções e que técnicos realizem suas atividades pelo aplicativo, registrando informações, fotos, checklists e possíveis problemas encontrados durante a inspeção.

Um dos principais diferenciais do projeto é o **funcionamento offline**, permitindo que o técnico continue trabalhando mesmo sem conexão com a internet.

---

## 🎯 Objetivo

Digitalizar e organizar o processo de inspeções técnicas, centralizando as informações e facilitando o acompanhamento das atividades.

O fluxo principal do sistema é:

**Planejar → Atribuir → Inspecionar → Registrar → Sincronizar → Revisar → Aprovar**

---

## ⚙️ Principais funcionalidades

- Gerenciamento de usuários e permissões
- Cadastro de clientes, locais e equipamentos
- Criação de modelos e checklists de inspeção
- Agendamento e atribuição de inspeções
- Execução de inspeções pelo aplicativo
- Funcionamento offline
- Sincronização dos dados
- Registro de fotos e evidências
- Leitura de QR Code dos equipamentos
- Registro de não conformidades
- Registro de localização
- Revisão, aprovação e reprovação de inspeções
- Histórico e rastreabilidade

---

## 👥 Usuários do sistema

### 👨‍🔧 Técnico

Realiza as inspeções em campo, responde os checklists e registra evidências e problemas encontrados.

### 👩‍💼 Supervisor

Cria e agenda inspeções, acompanha os resultados e realiza a revisão e aprovação.

### 👨‍💻 Administrador

Gerencia usuários, clientes, locais, equipamentos e permissões do sistema.

---

## Tecnologias

- 

---

## 📱 Funcionamento Offline

O técnico pode realizar a inspeção mesmo sem internet.

Os dados são armazenados localmente no dispositivo e, quando a conexão é restabelecida, são sincronizados com o servidor.

---


## 🎓 Projeto acadêmico

O FieldOps está sendo desenvolvido como um projeto acadêmico com o objetivo de aplicar conhecimentos de **Análise de Sistemas, Engenharia de Software, Desenvolvimento Web, Desenvolvimento Mobile e Banco de Dados**.

---

## 🗂️ Estrutura Conceitual

/login

/app

├── /dashboard
├── /users
├── /clients
│   └── /:clientId/sites
├── /sites
│   └── /:siteId/equipment
├── /equipment
├── /inspection-templates
│   ├── /new
│   ├── /:templateId/edit
│   ├── /:templateId/preview
│   └── /:templateId/versions
├── /inspections
│   ├── /new
│   ├── /:inspectionId
│   └── /:inspectionId/review
├── /non-conformities
└── /audit

**🚧 FieldOps — Organizando inspeções em campo.**

## 📊 Status do projeto

Inicialização: 15/09/2026             Finalizado:

🟡 **Em desenvolvimento**

Projeto acadêmico desenvolvido em grupo.
