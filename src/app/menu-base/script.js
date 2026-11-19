const card = document.getElementById("sbCard");
const toggle = document.getElementById("sbToggle");

function setCollapsed(collapsed) {
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

toggle.addEventListener("click", () =>
  setCollapsed(!card.classList.contains("is-collapsed")),
);

try {
  if (localStorage.getItem("sbCollapsed") === "1") setCollapsed(true);
} catch (e) {}
