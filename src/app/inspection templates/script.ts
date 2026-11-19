// @ts-nocheck
export function initializeTemplatesPage(navigate?: (url: string) => void): void {

    const modelFilter = document.getElementById("modelFilter");
    const modelCards = [...document.querySelectorAll(".model-card")];
    const emptyModels = document.getElementById("emptyModels");

    modelFilter.addEventListener("input", () => {
      const query = modelFilter.value.trim().toLocaleLowerCase("pt-BR");
      let visibleCount = 0;

      modelCards.forEach((card) => {
        const matches = card.dataset.search.includes(query);
        card.classList.toggle("d-none", !matches);
        if (matches) visibleCount += 1;
      });

      emptyModels.classList.toggle("d-none", visibleCount > 0);
    });

    modelCards.forEach((card) => {
      card.addEventListener("click", (event) => {
        if (event.target.closest("button, a")) return;
        navigate ? navigate(card.dataset.editorHref) : window.location.assign(card.dataset.editorHref);
      });
      card.addEventListener("keydown", (event) => {
        if (event.target !== card || !["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        navigate ? navigate(card.dataset.editorHref) : window.location.assign(card.dataset.editorHref);
      });
    });
  
}
