const editorToast = bootstrap.Toast.getOrCreateInstance(document.getElementById("editorToast"));
const toastMessage = document.getElementById("toastMessage");
const modelNameField = document.getElementById("modelName");
const sectionsContainer = document.querySelector(".editor-container");
let selectedItem = null;
let newSectionNumber = document.querySelectorAll(".checklist-section").length + 1;

function notify(message) {
  toastMessage.textContent = message;
  editorToast.show();
}

function updateSectionCount(section) {
  const itemCount = section.querySelectorAll(".checklist-item").length;
  const count = section.querySelector(".section-count, .critical-count");
  if (count) {
    count.textContent = section.classList.contains("section-critical")
      ? `${itemCount} Itens Críticos`
      : `${itemCount} Itens`;
  }
}

function createItem() {
  const item = document.createElement("article");
  item.className = "checklist-item";
  item.innerHTML = `
    <span class="drag-handle"><i class="bi bi-grip-vertical"></i></span>
    <div class="item-copy"><div class="item-label">Novo item do checklist <span class="badge required-badge">Obrigatório</span></div><p>Descreva o que o técnico deverá verificar.</p></div>
    <div class="item-options"><span class="badge option-badge"><i class="bi bi-fonts"></i> Texto Livre</span></div>
    <button class="btn btn-sm btn-link text-secondary item-settings" type="button" aria-label="Configurar novo item" data-bs-toggle="modal" data-bs-target="#settingsModal"><i class="bi bi-gear"></i></button>`;
  return item;
}

function addItemToSection(section) {
  const item = createItem();
  const addLink = section.querySelector(".add-item-link");
  addLink.before(item);
  updateSectionCount(section);
  item.scrollIntoView({ behavior: "smooth", block: "center" });
  notify("Novo item adicionado ao checklist.");
}

function createSection(name = `Nova Seção ${newSectionNumber}`) {
  const section = document.createElement("section");
  section.className = "checklist-section mb-3";
  section.dataset.section = `nova-${newSectionNumber++}`;
  section.innerHTML = `
    <header class="section-heading d-flex align-items-center justify-content-between gap-2">
      <div class="d-flex align-items-center gap-2"><i class="bi bi-grip-vertical text-secondary"></i><h2 class="h6 fw-bold mb-0">${name}</h2><span class="badge section-count">0 Itens</span></div>
      <div class="d-flex gap-1"><button class="btn btn-sm btn-link text-secondary section-duplicate" type="button" title="Duplicar seção" aria-label="Duplicar seção"><i class="bi bi-files"></i></button><button class="btn btn-sm btn-link text-secondary section-delete" type="button" title="Excluir seção" aria-label="Excluir seção"><i class="bi bi-trash"></i></button></div>
    </header>
    <div class="section-items"><button class="add-item-link" type="button"><i class="bi bi-plus-lg"></i> Adicionar Item em “${name}”</button></div>`;
  document.querySelector(".editor-add-actions").before(section);
  section.scrollIntoView({ behavior: "smooth", block: "center" });
  notify("Nova seção adicionada.");
}

document.getElementById("addSection").addEventListener("click", () => createSection());
document.getElementById("addItem").addEventListener("click", () => {
  const sections = [...document.querySelectorAll(".checklist-section")];
  if (sections.length) addItemToSection(sections[sections.length - 1]);
});

sectionsContainer.addEventListener("click", (event) => {
  const addItemButton = event.target.closest(".add-item-link");
  if (addItemButton) {
    addItemToSection(addItemButton.closest(".checklist-section"));
    return;
  }

  const deleteButton = event.target.closest(".section-delete");
  if (deleteButton) {
    const section = deleteButton.closest(".checklist-section");
    if (confirm("Excluir esta seção e todos os itens?")) {
      section.remove();
      notify("Seção removida.");
    }
    return;
  }

  const duplicateButton = event.target.closest(".section-duplicate");
  if (duplicateButton) {
    const section = duplicateButton.closest(".checklist-section");
    const copy = section.cloneNode(true);
    const heading = copy.querySelector("h2");
    heading.textContent = `${heading.textContent} (cópia)`;
    copy.dataset.section = `copia-${newSectionNumber++}`;
    section.after(copy);
    notify("Seção duplicada.");
    return;
  }

  const settingsButton = event.target.closest(".item-settings");
  if (settingsButton) {
    selectedItem = settingsButton.closest(".checklist-item");
    const label = selectedItem.querySelector(".item-label")?.childNodes[0]?.textContent.trim();
    document.getElementById("itemLabel").value = label || "Novo item do checklist";
  }
});

document.querySelector("#settingsModal .btn-primary").addEventListener("click", () => {
  if (!selectedItem) return;
  const label = document.getElementById("itemLabel").value.trim() || "Novo item do checklist";
  const labelElement = selectedItem.querySelector(".item-label");
  labelElement.childNodes[0].textContent = `${label} `;
  const requiredBadge = labelElement.querySelector(".required-badge");
  if (requiredBadge) requiredBadge.classList.toggle("d-none", !document.getElementById("requiredCheck").checked);
  if (document.getElementById("criticalCheck").checked) selectedItem.classList.add("item-critical");
  else selectedItem.classList.remove("item-critical");
  notify("Configurações do item aplicadas.");
});

function saveDraft() {
  const state = {
    name: modelNameField.value,
    category: document.getElementById("assetCategory").value,
    description: document.getElementById("procedureDescription").value,
    savedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem("opsInspectionTemplateDraft", JSON.stringify(state));
  } catch (error) {
    // The editor remains usable when local storage is unavailable.
  }
  notify("Rascunho salvo com sucesso.");
}

document.getElementById("saveDraft").addEventListener("click", saveDraft);
document.getElementById("goBack").addEventListener("click", () => {
  if (window.history.length > 1) window.history.back();
  else window.location.href = "../../index.html";
});
document.getElementById("publishModel").addEventListener("click", () => {
  if (!modelNameField.value.trim()) {
    modelNameField.focus();
    notify("Informe o nome do modelo antes de publicar.");
    return;
  }
  if (confirm(`Publicar o modelo “${modelNameField.value.trim()}”?`)) {
    notify("Modelo publicado com sucesso.");
  }
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function loadStandardDraft(draft) {
  if (!draft || !Array.isArray(draft.sections)) return false;

  modelNameField.value = draft.name || modelNameField.value;
  document.getElementById("assetCategory").value = draft.category || document.getElementById("assetCategory").value;
  document.getElementById("procedureDescription").value = draft.description || "";
  document.getElementById("modelCode").textContent = `MOD-${String(draft.code || "NR").replace(/[^a-z0-9]/gi, "").toUpperCase()}-2026`;

  const actions = document.querySelector(".editor-add-actions");
  document.querySelectorAll(".checklist-section").forEach((section) => section.remove());
  draft.sections.forEach((data, index) => {
    const title = escapeHtml(data.title || `Seção ${index + 1}`);
    const section = document.createElement("section");
    section.className = "checklist-section mb-3";
    section.dataset.section = `norma-${index + 1}`;
    section.innerHTML = `<header class="section-heading d-flex align-items-center justify-content-between gap-2"><div class="d-flex align-items-center gap-2"><i class="bi bi-grip-vertical text-secondary"></i><h2 class="h6 fw-bold mb-0">${index + 1}. ${title}</h2><span class="badge section-count">${data.items.length} Itens</span></div><div class="d-flex gap-1"><button class="btn btn-sm btn-link text-secondary section-duplicate" type="button" title="Duplicar seção" aria-label="Duplicar seção"><i class="bi bi-files"></i></button><button class="btn btn-sm btn-link text-secondary section-delete" type="button" title="Excluir seção" aria-label="Excluir seção"><i class="bi bi-trash"></i></button></div></header><div class="section-items">${data.items.map((item) => `<article class="checklist-item"><span class="drag-handle"><i class="bi bi-grip-vertical"></i></span><div class="item-copy"><div class="item-label">${escapeHtml(item.title)} <span class="badge required-badge">Obrigatório</span></div><p>${escapeHtml(item.description || "Verifique e registre a condição observada.")}</p></div><div class="item-options"><span class="badge option-badge"><i class="bi bi-list-check"></i> ${escapeHtml(item.answer || "Conforme / Não conforme")}</span><span class="badge preview-badge">Base ${escapeHtml(draft.code || "NR")}</span></div><button class="btn btn-sm btn-link text-secondary item-settings" type="button" aria-label="Configurar ${escapeHtml(item.title)}" data-bs-toggle="modal" data-bs-target="#settingsModal"><i class="bi bi-gear"></i></button></article>`).join("")}<button class="add-item-link" type="button"><i class="bi bi-plus-lg"></i> Adicionar item nesta seção</button></div>`;
    actions.before(section);
  });
  newSectionNumber = draft.sections.length + 1;
  document.querySelectorAll(".checklist-section").forEach(updateSectionCount);
  return true;
}

let importedStandardDraft = null;
try {
  importedStandardDraft = JSON.parse(localStorage.getItem("opsInspectionTemplateFromStandard") || "null");
} catch (error) {
  // Ignore invalid or unavailable local storage data.
}
const hasImportedStandardDraft = loadStandardDraft(importedStandardDraft);
if (hasImportedStandardDraft) {
  localStorage.removeItem("opsInspectionTemplateFromStandard");
  notify(`Estrutura inicial ${importedStandardDraft.code} carregada para personalização.`);
}

const modelNames = {
  compressor: "Preventiva de Compressor",
  eletrica: "Segurança Elétrica",
  hidraulico: "Equipamento Hidráulico",
};
const modelKey = new URLSearchParams(window.location.search).get("model");
if (modelNames[modelKey]) modelNameField.value = modelNames[modelKey];

try {
  const savedDraft = JSON.parse(localStorage.getItem("opsInspectionTemplateDraft") || "null");
  if (savedDraft && !hasImportedStandardDraft) {
    modelNameField.value = savedDraft.name || modelNameField.value;
    document.getElementById("assetCategory").value = savedDraft.category || document.getElementById("assetCategory").value;
    document.getElementById("procedureDescription").value = savedDraft.description || "";
  }
} catch (error) {
  // Ignore invalid or unavailable local storage data.
}
