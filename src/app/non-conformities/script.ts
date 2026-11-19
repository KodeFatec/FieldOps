// @ts-nocheck
export function initializeNonConformitiesPage(navigate?: (url: string) => void): void {
const searchInput = document.getElementById("globalSearch");
const rows = [...document.querySelectorAll(".nc-row")];
const footerCount = document.getElementById("footerCount");

function applySearch() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;
  rows.forEach((row) => {
    const matches = !term || row.dataset.search.includes(term);
    row.hidden = !matches;
    if (matches) visible += 1;
  });
  footerCount.textContent = visible === 4
    ? "Mostrando 1 a 4 de 4 registros ativos"
    : `Mostrando ${visible} registro${visible === 1 ? "" : "s"} encontrado${visible === 1 ? "" : "s"}`;
}

searchInput.addEventListener("input", applySearch);

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");

  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
  });
});

document.getElementById("refreshBtn").addEventListener("click", (event) => {
  const icon = event.currentTarget.querySelector("i");
  icon.classList.add("spin");
  setTimeout(() => icon.classList.remove("spin"), 500);
});

}
