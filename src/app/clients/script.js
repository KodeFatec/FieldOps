const $ = (id) => document.getElementById(id);

const tbody = $('tabelaClientes');
const contagem = $('contagemClientes');
const kpiAtivos = $('kpiAtivos');

const modalNovoEl = $('modalNovoCliente');
const modalEditarEl = $('modalEditarCliente');
const modalNovo = bootstrap.Modal.getOrCreateInstance(modalNovoEl);
const modalEditar = bootstrap.Modal.getOrCreateInstance(modalEditarEl);
const modalStatus = bootstrap.Modal.getOrCreateInstance($('modalConfirmarInativacao'));

const toastEl = $('toastSucesso');
const toast = bootstrap.Toast.getOrCreateInstance(toastEl);

const formNovo = $('formNovoCliente');
const formEditar = $('formEditarCliente');

const novo = {
  nome: $('nNome'),
  razao: $('nRazao'),
  cnpj: $('nCnpj'),
  email: $('nEmail'),
  telefone: $('nTelefone'),
  segmento: $('nSegmento'),
  status: $('nStatus'),
  gestor: $('nGestor'),
  vigencia: $('nVigencia'),
  feedbackCnpj: $('feedbackCnpj'),
};
const edicao = {
  nome: $('eNome'),
  codigo: $('eCodigo'),
  razao: $('eRazao'),
  cnpj: $('eCnpj'),
  email: $('eEmail'),
  telefone: $('eTelefone'),
  segmento: $('eSegmento'),
  status: $('eStatus'),
  gestor: $('eGestor'),
  vigencia: $('eVigencia'),
  feedbackCnpj: $('feedbackCnpjEdicao'),
};

/* As classes de cor reaproveitam as já existentes no seu CSS (tu-*) */
const SEGMENTOS = {
  MANUFATURA: { label: 'Manufatura', icon: 'bi-gear-wide-connected', css: 'tu-admin' },
  METALURGIA: { label: 'Metalurgia', icon: 'bi-hammer', css: 'tu-supervisor' },
  ENERGIA: { label: 'Energia', icon: 'bi-lightning-charge', css: 'tu-tecnico' },
  PETROQUIMICA: { label: 'Petroquímica', icon: 'bi-fuel-pump', css: 'tu-cliente' },
};
const STATUS = {
  ACTIVE: { label: 'Ativo', css: 'tu-ativo' },
  REVIEW: { label: 'Em Revisão', css: 'tu-bloqueado' },
  INACTIVE: { label: 'Inativo', css: 'tu-inativo' },
};
const AVATARES = ['tu-av-gray', 'tu-av-purple', 'tu-av-blue'];
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const SUFIXOS = /^(ltda\.?|s\.?\/?a\.?|me|epp|eireli)$/i;

const clientes = new Map();
let proximoId = 1;
let totalClientes = 18;
let clienteAtualId = null;

const esc = (texto) =>
  String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const badgeSegmento = (seg) => `<span class="tu-badge ${SEGMENTOS[seg].css}"><i class="bi ${SEGMENTOS[seg].icon}"></i>${SEGMENTOS[seg].label}</span>`;
const badgeStatus = (status) => `<span class="tu-badge ${STATUS[status].css}">${STATUS[status].label}</span>`;

function formatarVigencia(ym) {
  if (!ym) return '—';
  const [ano, mes] = ym.split('-');
  return `${MESES[Number(mes) - 1]}/${ano}`;
}

function mascaraCnpj(valor) {
  return valor
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

function iniciais(nome) {
  const todas = nome.trim().split(/\s+/);
  const partes = todas.filter((p) => !SUFIXOS.test(p));
  const base = partes.length ? partes : todas;
  const segunda = base.length > 1 ? base[1][0] : '';
  return (base[0][0] + segunda).toUpperCase();
}

function gerarCodigo() {
  const existentes = new Set([...clientes.values()].map((c) => c.codigo));
  let codigo;
  do {
    codigo = `CLI-${String(Math.floor(1 + Math.random() * 9999)).padStart(4, '0')}`;
  } while (existentes.has(codigo));
  return codigo;
}

const linhaDe = (id) => tbody.querySelector(`tr[data-id="${id}"]`);

/* Cada <tr> inicial só precisa dos atributos data-*; o JS desenha o conteúdo */
function lerLinha(tr) {
  const d = tr.dataset;
  return {
    id: `c${proximoId++}`,
    codigo: d.codigo || gerarCodigo(),
    nome: d.nome,
    razao: d.razao,
    cnpj: d.cnpj,
    email: d.email,
    phone: d.phone || '',
    segmento: d.segmento,
    status: d.status,
    gestor: d.gestor,
    vigencia: d.vigencia,
    avatar: d.avatar || AVATARES[(proximoId - 1) % AVATARES.length],
  };
}

function botaoStatus(c) {
  if (c.status === 'INACTIVE') {
    return `<button class="btn btn-sm btn-link text-success p-1" data-acao="status" title="Reativar cliente" aria-label="Reativar cliente"><i class="bi bi-building-check"></i></button>`;
  }
  return `<button class="btn btn-sm btn-link text-secondary p-1" data-acao="status" title="Inativar cliente" aria-label="Inativar cliente"><i class="bi bi-building-slash"></i></button>`;
}

function renderLinha(c, tr = document.createElement('tr')) {
  Object.assign(tr.dataset, {
    id: c.id,
    codigo: c.codigo,
    nome: c.nome,
    razao: c.razao,
    cnpj: c.cnpj,
    email: c.email,
    phone: c.phone,
    segmento: c.segmento,
    status: c.status,
    gestor: c.gestor,
    vigencia: c.vigencia,
    avatar: c.avatar,
  });
  tr.innerHTML = `
    <td class="ps-4">
      <div class="d-flex align-items-center gap-3">
        <span class="tu-avatar ${c.avatar} rounded-2 d-inline-flex align-items-center justify-content-center flex-shrink-0">${esc(iniciais(c.nome))}</span>
        <div class="lh-sm">
          <div class="fw-semibold fs-6">${esc(c.nome)}</div>
          <small class="d-xl-none d-block text-body-secondary">CNPJ: ${esc(c.cnpj)}</small>
          <small class="tu-mat">Cód: ${esc(c.codigo)}</small>
        </div>
      </div>
    </td>
    <td class="d-none d-xl-table-cell">${esc(c.cnpj)}</td>
    <td>${badgeSegmento(c.segmento)}</td>
    <td>${badgeStatus(c.status)}</td>
    <td class="d-none d-lg-table-cell lh-sm">
      <div class="fw-medium">Até ${esc(formatarVigencia(c.vigencia))}</div>
      <small class="tu-sub">${esc(c.gestor)}</small>
    </td>
    <td class="text-end pe-4 text-nowrap">
      <button class="btn btn-sm btn-link text-secondary p-1 me-1" data-acao="editar" title="Editar" aria-label="Editar"><i class="bi bi-pencil"></i></button>
      ${botaoStatus(c)}
    </td>`;
  return tr;
}

function destacar(tr) {
  tr.classList.add('table-primary');
  setTimeout(() => tr.classList.remove('table-primary'), 2500);
}

function ajustarAtivos(antes, depois) {
  const delta = (depois === 'ACTIVE') - (antes === 'ACTIVE');
  if (delta) kpiAtivos.textContent = Number(kpiAtivos.textContent) + delta;
}

function mostrarToast(mensagem, cor = 'success', icone = 'bi-check-circle') {
  toastEl.className = `toast text-bg-${cor} border-0`;
  $('toastIcone').className = `bi ${icone} me-2`;
  $('toastMensagem').textContent = mensagem;
  toast.show();
}

function validarCampos(f, ignorarId = null) {
  const cnpj = f.cnpj.value.replace(/\D/g, '');
  const duplicado = cnpj !== '' && [...clientes.values()].some((c) => c.id !== ignorarId && c.cnpj.replace(/\D/g, '') === cnpj);
  f.cnpj.setCustomValidity(duplicado ? 'duplicado' : '');
  f.feedbackCnpj.textContent = duplicado ? 'Este CNPJ já está cadastrado.' : 'Informe um CNPJ válido (00.000.000/0000-00).';
  f.nome.setCustomValidity(f.nome.value.trim().length < 3 ? 'curto' : '');
  f.razao.setCustomValidity(f.razao.value.trim().length < 3 ? 'curto' : '');
}

function mudarStatus(c, novoStatus) {
  const antes = c.status;
  c.status = novoStatus;
  destacar(renderLinha(c, linhaDe(c.id)));
  ajustarAtivos(antes, novoStatus);
}

/* Carrega as linhas que já estão no HTML para o modelo de dados */
[...tbody.rows].forEach((tr) => {
  const c = lerLinha(tr);
  clientes.set(c.id, c);
  renderLinha(c, tr);
});

/* Máscara de CNPJ (roda antes da validação do formulário) */
[novo.cnpj, edicao.cnpj].forEach((el) =>
  el.addEventListener('input', () => {
    el.value = mascaraCnpj(el.value);
  })
);

/* Ações da tabela */
function abrirEdicao(id) {
  const c = clientes.get(id);
  clienteAtualId = id;
  edicao.nome.value = c.nome;
  edicao.codigo.value = c.codigo;
  edicao.razao.value = c.razao;
  edicao.cnpj.value = c.cnpj;
  edicao.email.value = c.email;
  edicao.telefone.value = c.phone;
  edicao.segmento.value = c.segmento;
  edicao.status.value = c.status;
  edicao.gestor.value = c.gestor;
  edicao.vigencia.value = c.vigencia;
  formEditar.classList.remove('was-validated');
  validarCampos(edicao, id);
  modalEditar.show();
}

function alternarStatus(id) {
  const c = clientes.get(id);
  clienteAtualId = id;
  if (c.status === 'INACTIVE') {
    mudarStatus(c, 'ACTIVE');
    mostrarToast('Cliente reativado com sucesso!');
    return;
  }
  $('cNome').textContent = c.nome;
  $('cCnpj').textContent = c.cnpj;
  modalStatus.show();
}

tbody.addEventListener('click', (e) => {
  const botao = e.target.closest('button[data-acao]');
  if (!botao || botao.disabled) return;
  const id = botao.closest('tr').dataset.id;
  const acoes = { editar: abrirEdicao, status: alternarStatus };
  acoes[botao.dataset.acao](id);
});

$('btnConfirmarInativar').addEventListener('click', () => {
  mudarStatus(clientes.get(clienteAtualId), 'INACTIVE');
  modalStatus.hide();
  mostrarToast('Cliente inativado.', 'secondary', 'bi-building-slash');
});

/* Formulário de edição */
formEditar.addEventListener('input', () => validarCampos(edicao, clienteAtualId));

formEditar.addEventListener('submit', (e) => {
  e.preventDefault();
  validarCampos(edicao, clienteAtualId);
  formEditar.classList.add('was-validated');
  if (!formEditar.checkValidity()) return;

  const c = clientes.get(clienteAtualId);
  const statusAntes = c.status;
  Object.assign(c, {
    nome: edicao.nome.value.trim(),
    razao: edicao.razao.value.trim(),
    cnpj: edicao.cnpj.value.trim(),
    email: edicao.email.value.trim(),
    phone: edicao.telefone.value.trim(),
    segmento: edicao.segmento.value,
    status: edicao.status.value,
    gestor: edicao.gestor.value,
    vigencia: edicao.vigencia.value,
  });
  destacar(renderLinha(c, linhaDe(c.id)));
  ajustarAtivos(statusAntes, c.status);

  modalEditar.hide();
  mostrarToast('Cliente atualizado com sucesso!');
});

modalEditarEl.addEventListener('shown.bs.modal', () => edicao.nome.focus());

/* Formulário de novo cliente */
formNovo.addEventListener('input', () => validarCampos(novo));

formNovo.addEventListener('submit', (e) => {
  e.preventDefault();
  validarCampos(novo);
  formNovo.classList.add('was-validated');
  if (!formNovo.checkValidity()) return;

  const c = {
    id: `c${proximoId++}`,
    codigo: gerarCodigo(),
    nome: novo.nome.value.trim(),
    razao: novo.razao.value.trim(),
    cnpj: novo.cnpj.value.trim(),
    email: novo.email.value.trim(),
    phone: novo.telefone.value.trim(),
    segmento: novo.segmento.value,
    status: novo.status.value,
    gestor: novo.gestor.value,
    vigencia: novo.vigencia.value,
    avatar: AVATARES[tbody.rows.length % AVATARES.length],
  };
  clientes.set(c.id, c);

  const linha = renderLinha(c);
  tbody.prepend(linha);
  destacar(linha);

  totalClientes += 1;
  contagem.textContent = `Exibindo ${tbody.rows.length} de ${totalClientes} clientes`;
  ajustarAtivos(null, c.status);

  modalNovo.hide();
  mostrarToast('Cliente cadastrado com sucesso!');
});

modalNovoEl.addEventListener('shown.bs.modal', () => novo.nome.focus());

modalNovoEl.addEventListener('hidden.bs.modal', () => {
  formNovo.reset();
  formNovo.classList.remove('was-validated');
  validarCampos(novo);
});

/* ===== Adicionar Local ===== */
const modalLocalEl = $('modalAdicionarLocal');
const modalLocal = bootstrap.Modal.getOrCreateInstance(modalLocalEl);
const formLocal = $('formAdicionarLocal');
const listaLocais = $('listaLocais');
const contagemLocais = $('contagemLocais');

const local = {
  cliente: $('lCliente'),
  nome: $('lNome'),
  tipo: $('lTipo'),
  descricao: $('lDescricao'),
  cep: $('lCep'),
  endereco: $('lEndereco'),
  norma: $('lNorma'),
  ativos: $('lAtivos'),
  responsavel: $('lResponsavel'),
  obs: $('lObs'),
};

const TIPOS = {
  GALPAO: { label: 'Galpão', icon: 'bi-building' },
  UNIDADE: { label: 'Unidade de produção', icon: 'bi-gear' },
  PATIO: { label: 'Pátio', icon: 'bi-wind' },
  SUBESTACAO: { label: 'Subestação', icon: 'bi-lightning-charge' },
  OUTRO: { label: 'Outro', icon: 'bi-pin-map' },
};

const mascaraCep = (valor) =>
  valor
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, '$1-$2');

function renderLocal(l) {
  const card = document.createElement('div');
  card.className = 'card bg-body-tertiary';
  card.innerHTML = `
    <div class="card-body p-3">
      <div class="row align-items-center g-2">
        <div class="col-12 col-md-6 d-flex align-items-center gap-2">
          <span class="badge bg-primary-subtle text-primary-emphasis fs-6"><i class="bi ${TIPOS[l.tipo].icon}"></i></span>
          <div class="lh-sm">
            <div class="fw-bold">${esc(l.nome)}</div>
            <small class="text-body-secondary">${esc(l.descricao || TIPOS[l.tipo].label)}</small>
          </div>
        </div>
        <div class="col-6 col-md-3 text-end lh-sm">
          <div class="fw-bold">${l.ativos} ativos</div>
          <small class="text-body-secondary fw-semibold">${esc(l.norma || 'Sem norma')}</small>
        </div>
        <div class="col-6 col-md-3 text-end">
          <a href="#" class="btn btn-outline-primary btn-sm">Gerenciar Local <i class="bi bi-box-arrow-up-right ms-1"></i></a>
        </div>
      </div>
    </div>`;
  return card;
}

/* O botão "Adicionar Local" informa o cliente via data-cliente="Nome do cliente" */
modalLocalEl.addEventListener('show.bs.modal', (e) => {
  const nome = e.relatedTarget && e.relatedTarget.dataset.cliente;
  if (nome) local.cliente.value = nome;
});

modalLocalEl.addEventListener('shown.bs.modal', () => local.nome.focus());

local.cep.addEventListener('input', () => {
  local.cep.value = mascaraCep(local.cep.value);
});

formLocal.addEventListener('input', () => {
  local.nome.setCustomValidity(local.nome.value.trim().length < 3 ? 'curto' : '');
});

formLocal.addEventListener('submit', (e) => {
  e.preventDefault();
  local.nome.setCustomValidity(local.nome.value.trim().length < 3 ? 'curto' : '');
  formLocal.classList.add('was-validated');
  if (!formLocal.checkValidity()) return;

  const novoLocal = {
    nome: local.nome.value.trim(),
    tipo: local.tipo.value,
    descricao: local.descricao.value.trim(),
    cep: local.cep.value.trim(),
    endereco: local.endereco.value.trim(),
    norma: local.norma.value,
    ativos: Number(local.ativos.value),
    responsavel: local.responsavel.value,
    obs: local.obs.value.trim(),
  };

  if (listaLocais) {
    const card = renderLocal(novoLocal);
    listaLocais.append(card);
    destacar(card.firstElementChild);
  }
  if (contagemLocais && listaLocais) {
    const total = listaLocais.children.length;
    contagemLocais.textContent = `${total} ${total === 1 ? 'cadastrado' : 'cadastrados'}`;
  }

  modalLocal.hide();
  mostrarToast('Local adicionado com sucesso!');
});

modalLocalEl.addEventListener('hidden.bs.modal', () => {
  formLocal.reset();
  formLocal.classList.remove('was-validated');
  local.nome.setCustomValidity('');
});