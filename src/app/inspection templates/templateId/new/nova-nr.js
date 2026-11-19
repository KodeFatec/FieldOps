const STORAGE_KEY = "opsCustomStandards";
const RESERVED_CODES = new Set(["NR-10", "NR-12", "NR-13", "NR-18", "NR-33", "NR-35"]);
const form = document.getElementById("standardForm");
const sectionTemplate = document.getElementById("sectionTemplate");
const sectionsList = document.getElementById("sectionsList");
const formError = document.getElementById("formError");

function readCustomStandards() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function addSection() {
  const section = sectionTemplate.content.firstElementChild.cloneNode(true);
  section.querySelector(".remove-section").addEventListener("click", () => {
    section.remove();
    updateSectionNumbers();
  });
  sectionsList.append(section);
  updateSectionNumbers();
  section.querySelector(".section-title").focus();
}

function updateSectionNumbers() {
  [...sectionsList.querySelectorAll(".section-editor")].forEach((section, index) => {
    section.querySelector(".section-number").textContent = String(index + 1);
    section.querySelector(".remove-section").disabled = sectionsList.children.length === 1;
  });
}

document.getElementById("addSection").addEventListener("click", addSection);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.classList.add("was-validated");
  formError.classList.add("d-none");
  if (!form.checkValidity()) {
    form.querySelector(":invalid")?.focus();
    return;
  }

  const number = Number(document.getElementById("standardNumber").value);
  const code = `NR-${number}`;
  const existingStandards = readCustomStandards();
  if (RESERVED_CODES.has(code) || existingStandards.some((standard) => standard.code === code)) {
    formError.textContent = `O código ${code} já está cadastrado. Informe outro número.`;
    formError.classList.remove("d-none");
    document.getElementById("standardNumber").focus();
    return;
  }

  const sections = [...sectionsList.querySelectorAll(".section-editor")].map((section) => ({
    title: section.querySelector(".section-title").value.trim(),
    items: section.querySelector(".section-items").value.split("\n").map((item) => item.trim()).filter(Boolean)
  }));
  if (sections.some((section) => section.items.length === 0)) {
    formError.textContent = "Cada seção precisa ter pelo menos um item de verificação.";
    formError.classList.remove("d-none");
    sectionsList.querySelector(".section-items:invalid")?.focus();
    return;
  }

  const title = document.getElementById("standardTitle").value.trim();
  const standard = {
    code,
    title,
    category: document.getElementById("standardCategory").value.trim() || "Outras normas",
    description: document.getElementById("standardDescription").value.trim() || `Checklist inicial baseado na ${code}. Revise os requisitos aplicáveis antes do uso.`,
    sections
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingStandards, standard]));
  } catch {
    formError.textContent = "Não foi possível salvar. Verifique o armazenamento disponível neste navegador.";
    formError.classList.remove("d-none");
    return;
  }

  window.location.href = `./index.html?selected=${encodeURIComponent(code)}`;
});

addSection();
