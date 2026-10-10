const $ = (id) => document.getElementById(id);

const tbody = $('tabelaUsuarios');
const contagem = $('contagemUsuarios');
const kpiAtivos = $('kpiAtivos');

const modalNovoEl = $('modalNovoUsuario');
const modalVerEl = $('modalVisualizarUsuario');
const modalEditarEl = $('modalEditarUsuario');
const modalNovo = bootstrap.Modal.getOrCreateInstance(modalNovoEl);
const modalVer = bootstrap.Modal.getOrCreateInstance(modalVerEl);
const modalEditar = bootstrap.Modal.getOrCreateInstance(modalEditarEl);
const modalStatus = bootstrap.Modal.getOrCreateInstance($('modalConfirmarInativacao'));

const toastEl = $('toastSucesso');
const toast = bootstrap.Toast.getOrCreateInstance(toastEl);

const formNovo = $('formNovoUsuario');
const formEditar = $('formEditarUsuario');

const novo = {
  nome: $('uNome'),
  email: $('uEmail'),
  telefone: $('uTelefone'),
  senha: $('uSenha'),
  confirma: $('uConfirma'),
  perfil: $('uPerfil'),
  status: $('uStatus'),
  feedbackEmail: $('feedbackEmail'),
  feedbackConfirma: $('feedbackConfirma'),
};
const edicao = {
  nome: $('eNome'),
  email: $('eEmail'),
  telefone: $('eTelefone'),
  perfil: $('ePerfil'),
  status: $('eStatus'),
  matricula: $('eMatricula'),
  feedbackEmail: $('feedbackEmailEdicao'),
};

const PERFIS = {
  ADMIN: { label: 'Administrador', icon: 'bi-shield-lock', css: 'tu-admin' },
  SUPERVISOR: { label: 'Supervisor', icon: 'bi-people', css: 'tu-supervisor' },
  TECHNICIAN: { label: 'Técnico', icon: 'bi-person-gear', css: 'tu-tecnico' },
  CLIENT_VIEWER: { label: 'Cliente', icon: 'bi-eye', css: 'tu-cliente' },
};
const STATUS = {
  ACTIVE: { label: 'Ativo', css: 'tu-ativo' },
  INACTIVE: { label: 'Inativo', css: 'tu-inativo' },
  BLOCKED: { label: 'Bloqueado', css: 'tu-bloqueado' },
};
const AVATARES = ['tu-av-gray', 'tu-av-purple', 'tu-av-blue'];

const usuarios = new Map();
let proximoId = 1;
let totalUsuarios = 24;
let usuarioAtualId = null;

const esc = (texto) =>
  texto.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const badgePerfil = (role) => `<span class="tu-badge ${PERFIS[role].css}"><i class="bi ${PERFIS[role].icon}"></i>${PERFIS[role].label}</span>`;
const badgeStatus = (status) => `<span class="tu-badge ${STATUS[status].css}">${STATUS[status].label}</span>`;

function iniciais(nome) {
  const partes = nome.trim().split(/\s+/);
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (partes[0][0] + ultima).toUpperCase();
}

const linhaDe = (id) => tbody.querySelector(`tr[data-id="${id}"]`);

function chavePorClasse(el, mapa) {
  return Object.keys(mapa).find((chave) => el.classList.contains(mapa[chave].css));
}

function lerLinha(tr) {
  const acesso = tr.querySelector('td:nth-child(5)');
  const sub = acesso.querySelector('.tu-sub');
  return {
    id: `u${proximoId++}`,
    name: tr.querySelector('.fw-semibold.fs-6').textContent.trim(),
    email: tr.querySelector('td:nth-child(2)').textContent.trim(),
    phone: tr.dataset.phone || '',
    matricula: tr.querySelector('.tu-mat').textContent.replace('Mat:', '').trim(),
    avatar: [...tr.querySelector('.tu-avatar').classList].find((c) => c.startsWith('tu-av-')),
    role: chavePorClasse(tr.querySelector('td:nth-child(3) .tu-badge'), PERFIS),
    status: chavePorClasse(tr.querySelector('td:nth-child(4) .tu-badge'), STATUS),
    acesso1: acesso.querySelector('.fw-medium').textContent.trim(),
    acesso2: sub.textContent.trim(),
    acesso2Ok: sub.classList.contains('text-success'),
    protegido: tr.querySelector('td:nth-child(6) button:last-child').disabled,
  };
}

function botaoStatus(u) {
  if (u.protegido) {
    return `<button class="btn btn-sm btn-link text-secondary p-1" data-acao="status" title="Administradores não podem ser inativados" aria-label="Inativar usuário" disabled><i class="bi bi-slash-circle"></i></button>`;
  }
  if (u.status === 'INACTIVE') {
    return `<button class="btn btn-sm btn-link text-success p-1" data-acao="status" title="Reativar usuário" aria-label="Reativar usuário"><i class="bi bi-person-check"></i></button>`;
  }
  return `<button class="btn btn-sm btn-link text-secondary p-1" data-acao="status" title="Inativar usuário" aria-label="Inativar usuário"><i class="bi bi-person-slash"></i></button>`;
}

function renderLinha(u, tr = document.createElement('tr')) {
  tr.dataset.id = u.id;
  tr.innerHTML = `
    <td class="ps-4">
      <div class="d-flex align-items-center gap-3">
        <span class="tu-avatar ${u.avatar} rounded-2 d-inline-flex align-items-center justify-content-center flex-shrink-0">${esc(iniciais(u.name))}</span>
        <div class="lh-sm">
          <div class="fw-semibold fs-6">${esc(u.name)}</div>
          <small class="d-xl-none d-block text-body-secondary">${esc(u.email)}</small>
          <small class="tu-mat">Mat: ${esc(u.matricula)}</small>
        </div>
      </div>
    </td>
    <td class="d-none d-xl-table-cell">${esc(u.email)}</td>
    <td>${badgePerfil(u.role)}</td>
    <td>${badgeStatus(u.status)}</td>
    <td class="d-none d-lg-table-cell lh-sm">
      <div class="fw-medium">${esc(u.acesso1)}</div>
      <small class="tu-sub${u.acesso2Ok ? ' text-success' : ''}">${esc(u.acesso2)}</small>
    </td>
    <td class="text-end pe-4 text-nowrap">
      <button class="btn btn-sm btn-link text-secondary p-1 me-1" data-acao="ver" title="Visualizar" aria-label="Visualizar"><i class="bi bi-eye"></i></button>
      <button class="btn btn-sm btn-link text-secondary p-1 me-1" data-acao="editar" title="Editar" aria-label="Editar"><i class="bi bi-pencil"></i></button>
      ${botaoStatus(u)}
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
  const email = f.email.value.trim().toLowerCase();
  const duplicado = [...usuarios.values()].some((u) => u.id !== ignorarId && u.email.toLowerCase() === email);
  f.email.setCustomValidity(duplicado ? 'duplicado' : '');
  f.feedbackEmail.textContent = duplicado ? 'Este e-mail já está cadastrado.' : 'Informe um e-mail corporativo válido.';
  f.nome.setCustomValidity(f.nome.value.trim().length < 3 ? 'curto' : '');

  if (f.senha) {
    f.confirma.setCustomValidity(f.confirma.value !== f.senha.value ? 'diferente' : '');
    f.feedbackConfirma.textContent = f.confirma.value ? 'As senhas não conferem.' : 'Confirme a senha.';
  }
}

function mudarStatus(u, novoStatus) {
  const antes = u.status;
  u.status = novoStatus;
  destacar(renderLinha(u, linhaDe(u.id)));
  ajustarAtivos(antes, novoStatus);
}

/* Carrega as linhas que já estão no HTML para o modelo de dados */
[...tbody.rows].forEach((tr) => {
  const u = lerLinha(tr);
  usuarios.set(u.id, u);
  renderLinha(u, tr);
});

/* Ações da tabela */
function abrirVisualizacao(id) {
  const u = usuarios.get(id);
  usuarioAtualId = id;
  $('vAvatar').className = `tu-avatar ${u.avatar} rounded-2 d-inline-flex align-items-center justify-content-center flex-shrink-0`;
  $('vAvatar').textContent = iniciais(u.name);
  $('vNome').textContent = u.name;
  $('vMatricula').textContent = `Mat: ${u.matricula}`;
  $('vEmail').textContent = u.email;
  $('vTelefone').textContent = u.phone || 'Não informado';
  $('vPerfil').innerHTML = badgePerfil(u.role);
  $('vStatus').innerHTML = badgeStatus(u.status);
  $('vAcesso').textContent = `${u.acesso1} · ${u.acesso2}`;
  modalVer.show();
}

function abrirEdicao(id) {
  const u = usuarios.get(id);
  usuarioAtualId = id;
  edicao.nome.value = u.name;
  edicao.email.value = u.email;
  edicao.telefone.value = u.phone;
  edicao.perfil.value = u.role;
  edicao.status.value = u.status;
  edicao.matricula.value = u.matricula;
  formEditar.classList.remove('was-validated');
  validarCampos(edicao, id);
  modalEditar.show();
}

function alternarStatus(id) {
  const u = usuarios.get(id);
  usuarioAtualId = id;
  if (u.status === 'INACTIVE') {
    mudarStatus(u, 'ACTIVE');
    mostrarToast('Usuário reativado com sucesso!');
    return;
  }
  $('cNome').textContent = u.name;
  $('cEmail').textContent = u.email;
  modalStatus.show();
}

tbody.addEventListener('click', (e) => {
  const botao = e.target.closest('button[data-acao]');
  if (!botao || botao.disabled) return;
  const id = botao.closest('tr').dataset.id;
  const acoes = { ver: abrirVisualizacao, editar: abrirEdicao, status: alternarStatus };
  acoes[botao.dataset.acao](id);
});

$('btnEditarDoVisualizar').addEventListener('click', () => {
  const id = usuarioAtualId;
  modalVerEl.addEventListener('hidden.bs.modal', () => abrirEdicao(id), { once: true });
  modalVer.hide();
});

$('btnConfirmarInativar').addEventListener('click', () => {
  mudarStatus(usuarios.get(usuarioAtualId), 'INACTIVE');
  modalStatus.hide();
  mostrarToast('Usuário inativado.', 'secondary', 'bi-person-slash');
});

/* Formulário de edição */
formEditar.addEventListener('input', () => validarCampos(edicao, usuarioAtualId));

formEditar.addEventListener('submit', (e) => {
  e.preventDefault();
  validarCampos(edicao, usuarioAtualId);
  formEditar.classList.add('was-validated');
  if (!formEditar.checkValidity()) return;

  const u = usuarios.get(usuarioAtualId);
  const statusAntes = u.status;
  Object.assign(u, {
    name: edicao.nome.value.trim(),
    email: edicao.email.value.trim(),
    phone: edicao.telefone.value.trim(),
    role: edicao.perfil.value,
    status: edicao.status.value,
  });
  destacar(renderLinha(u, linhaDe(u.id)));
  ajustarAtivos(statusAntes, u.status);

  modalEditar.hide();
  mostrarToast('Usuário atualizado com sucesso!');
});

modalEditarEl.addEventListener('shown.bs.modal', () => edicao.nome.focus());

/* Formulário de novo usuário */
formNovo.addEventListener('input', () => validarCampos(novo));

formNovo.addEventListener('submit', (e) => {
  e.preventDefault();
  validarCampos(novo);
  formNovo.classList.add('was-validated');
  if (!formNovo.checkValidity()) return;

  const u = {
    id: `u${proximoId++}`,
    name: novo.nome.value.trim(),
    email: novo.email.value.trim(),
    phone: novo.telefone.value.trim(),
    role: novo.perfil.value,
    status: novo.status.value,
    matricula: `FO-${Math.floor(1000 + Math.random() * 9000)}`,
    avatar: AVATARES[tbody.rows.length % AVATARES.length],
    acesso1: 'Nunca acessou',
    acesso2: 'Cadastrado agora',
    acesso2Ok: false,
    protegido: false,
  };
  usuarios.set(u.id, u);

  const linha = renderLinha(u);
  tbody.prepend(linha);
  destacar(linha);

  totalUsuarios += 1;
  contagem.textContent = `Exibindo ${tbody.rows.length} de ${totalUsuarios} operadores registrados`;
  ajustarAtivos(null, u.status);

  modalNovo.hide();
  mostrarToast('Usuário cadastrado com sucesso!');
});

modalNovoEl.addEventListener('shown.bs.modal', () => novo.nome.focus());

modalNovoEl.addEventListener('hidden.bs.modal', () => {
  formNovo.reset();
  formNovo.classList.remove('was-validated');
  validarCampos(novo);
});