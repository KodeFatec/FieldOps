const card = document.getElementById("sbCard");
const toggle = document.getElementById("sbToggle");

function setCollapsed(collapsed) {
  if (!card || !toggle) return;
  card.classList.toggle("is-collapsed", collapsed);
  toggle.setAttribute("aria-expanded", String(!collapsed));
  toggle.setAttribute(
    "aria-label",
    collapsed ? "Expandir menu" : "Recolher menu",
  );
  try {
    localStorage.setItem("sbCollapsed", collapsed ? "1" : "0");
  } catch (e) {}
}

if (card && toggle) {
  toggle.addEventListener("click", () =>
    setCollapsed(!card.classList.contains("is-collapsed")),
  );
}

try {
  if (card && localStorage.getItem("sbCollapsed") === "1") setCollapsed(true);
} catch (e) {}

const pageRoutes = {
  Dashboard: "dashboard/index.html",
  Usuários: "users/index.html",
  Clientes: "clients/index.html",
  Equipamentos: "equipment/index.html",
  "Modelos de Inspeção": "inspection%20templates/index.html",
  Inspeções: "inspections/index.html",
  Revisões: "review/index.html",
  "Não Conformidades": "non-conformities/index.html",
};

const menuScript = document.querySelector(
  'script[src*="menu-base/script.js"]',
);
const appRoot = menuScript
  ? new URL("../", menuScript.src)
  : new URL("../../", window.location.href);
const currentPath = decodeURI(window.location.pathname);

function routeFor(label) {
  const normalizedLabel = label.replace(/\s+/g, " ").trim();
  const routeName = Object.keys(pageRoutes).find((name) =>
    normalizedLabel.startsWith(name),
  );
  return routeName ? new URL(pageRoutes[routeName], appRoot).href : null;
}

document.querySelectorAll(".sb-item, .sb-user").forEach((link) => {
  const label = link.querySelector(".sb-label")?.textContent || link.title || "";
  const href = routeFor(label);
  if (href && link.tagName === "A") {
    link.href = href;
    const targetPath = decodeURI(new URL(href).pathname);
    const routeName = Object.keys(pageRoutes).find((name) =>
      label.replace(/\s+/g, " ").trim().startsWith(name),
    );
    const isTemplatePage =
      currentPath.includes("inspection templates") &&
      targetPath.includes("inspection templates/index.html");
    const isCurrentPage = currentPath === targetPath || isTemplatePage;
    link.classList.toggle("active", isCurrentPage);
    if (isCurrentPage) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
});

document.querySelectorAll('nav[aria-label="Atalhos"] a').forEach((link) => {
  const href = routeFor(link.textContent || "");
  if (href) link.href = href;
});

document.querySelectorAll("a[title='Sair']").forEach((link) => {
  link.href = new URL("../login/index.html", appRoot).href;
});

const sidebarMenus = document.querySelectorAll(".offcanvas-body nav ul.nav");
sidebarMenus.forEach((menu) => {
  menu.querySelectorAll("a").forEach((link) => {
    const label = link.querySelector(".sb-label")?.textContent ||
      link.title ||
      "";
    if (/^(Locais|Auditoria)(?:\s|$)/i.test(label.trim())) {
      link.closest("li")?.remove();
    }
  });

  if (!menu.querySelector('a[title^="Revisões"]')) {
    const inspectionsItem = [...menu.querySelectorAll("li")].find((item) =>
      item.textContent.includes("Inspeções"),
    );
    if (inspectionsItem) {
      const reviewItem = document.createElement("li");
      const reviewHref = new URL(pageRoutes.Revisões, appRoot).href;
      const isReviewPage = currentPath.includes("/review/");
      reviewItem.innerHTML = `
        <a class="sb-item nav-link rounded-2 d-flex align-items-center gap-2 position-relative${isReviewPage ? " active" : ""}"
          href="${reviewHref}" title="Revisões"${isReviewPage ? ' aria-current="page"' : ""}>
          <i class="bi bi-check2-square fs-6"></i>
          <span class="sb-label">Revisões</span>
        </a>`;
      inspectionsItem.insertAdjacentElement("afterend", reviewItem);
    }
  }
});

const logoLink = document.querySelector(".sb-logo")?.closest("a");
if (logoLink) logoLink.href = new URL(pageRoutes.Dashboard, appRoot).href;