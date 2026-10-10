const busca = document.getElementById("buscarEquipamento");
const filtroStatus = document.getElementById("filtroStatus");
const lista = document.getElementById("listaEquipamentos");

function filtrarEquipamentos() {
    const texto = busca.value.toLowerCase().trim();
    const statusSelecionado = filtroStatus.value;

    const linhas = lista.querySelectorAll("tr");

    linhas.forEach((linha) => {
        const conteudo = linha.textContent.toLowerCase();
        const status = linha.dataset.status;

        const correspondeTexto = conteudo.includes(texto);
        const correspondeStatus =
            statusSelecionado === "" || status === statusSelecionado;

        linha.hidden = !(correspondeTexto && correspondeStatus);
    });
}

busca.addEventListener("input", filtrarEquipamentos);
filtroStatus.addEventListener("change", filtrarEquipamentos);


function selecionarEquipamento(nome, codigo, status, local) {
    document.getElementById("detalheNome").textContent = nome;
    document.getElementById("detalheCodigo").textContent = codigo;
    document.getElementById("detalheStatus").textContent = status;
    document.getElementById("detalheLocal").textContent = local;
}