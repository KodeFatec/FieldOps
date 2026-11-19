export function initializeMenuBase(): void {
  document.documentElement.setAttribute('data-bs-theme', 'dark');
  const card = document.getElementById('sbCard');
  const toggle = document.getElementById('sbToggle');
  if (!card || !toggle) return;

  const setCollapsed = (collapsed: boolean): void => {
    card.classList.toggle('is-collapsed', collapsed);
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', collapsed ? 'Expandir menu' : 'Recolher menu');
    try { localStorage.setItem('sbCollapsed', collapsed ? '1' : '0'); } catch { /* armazenamento opcional */ }
  };

  toggle.addEventListener('click', () => setCollapsed(!card.classList.contains('is-collapsed')));
  try {
    if (localStorage.getItem('sbCollapsed') === '1') setCollapsed(true);
  } catch { /* armazenamento opcional */ }
}
