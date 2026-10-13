const standards = {
  "NR-10": {
    title: "Segurança em instalações e serviços em eletricidade",
    category: "Elétrica & Automação",
    description: "Checklist inicial para inspeções de segurança em instalações e serviços em eletricidade. Validar escopo e procedimentos locais antes do uso.",
    sections: [
      { title: "Condições da instalação", items: ["Identificação e sinalização de circuitos e painéis", "Integridade aparente de cabos, conexões e invólucros"] },
      { title: "Proteções e documentação", items: ["Condição de barreiras, invólucros e dispositivos de proteção", "Disponibilidade dos diagramas e registros aplicáveis"] },
      { title: "Segurança da atividade", items: ["EPI e EPC previstos para a atividade disponíveis e inspecionados", "Área de trabalho sinalizada e acesso controlado"] }
    ]
  },
  "NR-12": {
    title: "Segurança no trabalho em máquinas e equipamentos",
    category: "Mecânica & Sistemas Rotativos",
    description: "Checklist inicial para inspeção de máquinas e equipamentos. Adequar à análise de risco, ao manual e à configuração real do equipamento.",
    sections: [
      { title: "Proteções da máquina", items: ["Proteções fixas e móveis presentes e em condições de uso", "Dispositivos de intertravamento e parada acessíveis"] },
      { title: "Comandos e operação", items: ["Comandos identificados e acessíveis ao operador", "Parada de emergência acessível e sem obstruções"] },
      { title: "Condições de uso", items: ["Sinalização de segurança legível", "Registros de inspeção e manutenção disponíveis"] }
    ]
  },
  "NR-13": {
    title: "Caldeiras, vasos de pressão, tubulações e tanques",
    category: "Mecânica & Sistemas Rotativos",
    description: "Checklist preliminar para inspeção visual de equipamentos abrangidos. Confirmar enquadramento, plano de inspeção e requisitos com profissional habilitado.",
    sections: [
      { title: "Identificação e documentação", items: ["Identificação do equipamento legível", "Prontuário, registros e última inspeção disponíveis"] },
      { title: "Integridade aparente", items: ["Verificar sinais visíveis de corrosão, vazamento ou deformação", "Inspecionar suportes, conexões e isolamento aparente"] },
      { title: "Dispositivos e instrumentos", items: ["Condição aparente de manômetros e indicadores", "Dispositivos de segurança sem obstrução aparente"] }
    ]
  },
  "NR-18": {
    title: "Segurança e saúde no trabalho na indústria da construção",
    category: "Construção Civil",
    description: "Checklist inicial para condições de segurança em canteiros de obras. Adaptar ao estágio da obra e ao plano de segurança aplicável.",
    sections: [
      { title: "Organização do canteiro", items: ["Circulação e acessos desobstruídos e sinalizados", "Áreas de vivência em condições adequadas de organização"] },
      { title: "Proteção coletiva", items: ["Aberturas e periferias protegidas contra quedas", "Proteções coletivas presentes nas frentes de trabalho"] },
      { title: "Equipamentos e condições", items: ["Equipamentos de trabalho inspecionados antes do uso", "Materiais armazenados sem risco de queda ou obstrução"] }
    ]
  },
  "NR-33": {
    title: "Segurança e saúde nos trabalhos em espaços confinados",
    category: "Segurança do Trabalho",
    description: "Checklist de apoio à preparação de entrada em espaço confinado. Não substitui avaliação de riscos, PET, monitoramento nem procedimentos de emergência.",
    sections: [
      { title: "Preparação e autorização", items: ["Espaço identificado e acesso controlado", "Permissão de Entrada e Trabalho preparada conforme procedimento"] },
      { title: "Avaliação e monitoramento", items: ["Avaliação atmosférica prevista antes da entrada", "Meios de comunicação e monitoramento definidos"] },
      { title: "Equipe e emergência", items: ["Trabalhadores e vigia designados e capacitados", "Recursos de resgate e emergência disponíveis conforme plano"] }
    ]
  },
  "NR-35": {
    title: "Trabalho em altura",
    category: "Segurança do Trabalho",
    description: "Checklist inicial de apoio a atividades com risco de queda. Confirmar análise de risco, procedimento e condições específicas do local.",
    sections: [
      { title: "Planejamento da atividade", items: ["Análise de risco e autorização aplicáveis disponíveis", "Condições climáticas e interferências avaliadas"] },
      { title: "Acesso e proteção", items: ["Acessos e proteções coletivas em condições de uso", "Sistema individual de proteção contra quedas adequado à atividade"] },
      { title: "Pessoas e emergência", items: ["Trabalhadores autorizados e capacitados para a atividade", "Plano e recursos de resposta a emergência considerados"] }
    ]
  }
};

const standardCards = [...document.querySelectorAll(".standard-card")];
const previewTitle = document.getElementById("previewTitle");
const previewDescription = document.getElementById("previewDescription");
const previewSections = document.getElementById("previewSections");
const standardSearch = document.getElementById("standardSearch");
let selectedCode = "NR-10";

document.getElementById("goBack").addEventListener("click", () => {
  if (window.history.length > 1) window.history.back();
  else window.location.href = "../../index.html";
});

function renderPreview(code) {
  const standard = standards[code];
  selectedCode = code;
  previewTitle.textContent = `Checklist baseado na ${code}`;
  previewDescription.textContent = standard.title;
  document.getElementById("sectionTotal").textContent = standard.sections.length;
  document.getElementById("itemTotal").textContent = standard.sections.reduce((total, section) => total + section.items.length, 0);
  previewSections.replaceChildren(...standard.sections.map((section, index) => {
    const details = document.createElement("details");
    details.className = "preview-section";
    details.open = index === 0;
    const summary = document.createElement("summary");
    summary.innerHTML = `<span>${index + 1}. ${section.title}</span><span class="badge text-bg-light">${section.items.length} itens</span>`;
    const list = document.createElement("ul");
    section.items.forEach((item) => {
      const listItem = document.createElement("li");
      const icon = document.createElement("i");
      icon.className = "bi bi-check2-square";
      const text = document.createElement("span");
      text.textContent = item;
      listItem.append(icon, text);
      list.append(listItem);
    });
    details.append(summary, list);
    return details;
  }));
}

function selectStandard(card) {
  standardCards.forEach((option) => {
    const selected = option === card;
    option.classList.toggle("is-selected", selected);
    option.setAttribute("aria-selected", String(selected));
  });
  renderPreview(card.dataset.standard);
}

standardCards.forEach((card) => card.addEventListener("click", () => selectStandard(card)));

standardSearch.addEventListener("input", () => {
  const query = standardSearch.value.trim().toLocaleLowerCase("pt-BR");
  let visibleCount = 0;
  standardCards.forEach((card) => {
    const visible = card.textContent.toLocaleLowerCase("pt-BR").includes(query);
    card.classList.toggle("d-none", !visible);
    if (visible) visibleCount += 1;
  });
  document.getElementById("resultsCount").textContent = `${visibleCount} ${visibleCount === 1 ? "norma" : "normas"}`;
  document.getElementById("noStandards").classList.toggle("d-none", visibleCount > 0);
});

document.getElementById("createFromStandard").addEventListener("click", () => {
  const standard = standards[selectedCode];
  const draft = {
    code: selectedCode,
    name: `Checklist ${selectedCode} - ${standard.title}`,
    category: standard.category,
    description: standard.description,
    sections: standard.sections.map((section) => ({
      title: section.title,
      items: section.items.map((title) => ({ title, description: "Verifique e registre a condição observada.", answer: "Conforme / Não conforme" }))
    }))
  };
  try {
    localStorage.setItem("opsInspectionTemplateFromStandard", JSON.stringify(draft));
  } catch (error) {
    window.alert("Não foi possível guardar a seleção neste navegador. Tente novamente ou habilite o armazenamento local.");
    return;
  }
  window.location.href = `../edit/index.html?source=nr&norma=${encodeURIComponent(selectedCode)}`;
});

renderPreview(selectedCode);
