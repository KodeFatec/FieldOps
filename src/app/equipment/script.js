
/* FIELDOPS — gerenciamento de equipamentos */

const campoPesquisa = document.getElementById("buscarEquipamento");
const filtroSituacao = document.getElementById("filtroStatus");
const tabelaEquipamentos = document.getElementById("listaEquipamentos");

function filtrarEquipamentos() {
    const termoPesquisa = campoPesquisa.value.toLowerCase().trim();
    const situacaoSelecionada = filtroSituacao.value;
    const registrosEquipamentos = tabelaEquipamentos.querySelectorAll("tr");

    registrosEquipamentos.forEach((registroEquipamento) => {
        const dadosEquipamento = registroEquipamento.textContent.toLowerCase();
        const situacaoEquipamento = registroEquipamento.dataset.status;

        const correspondePesquisa = dadosEquipamento.includes(termoPesquisa);
        const correspondeSituacao =
            situacaoSelecionada === "" ||
            situacaoEquipamento === situacaoSelecionada;

        registroEquipamento.hidden =
            !(correspondePesquisa && correspondeSituacao);
    });
}

campoPesquisa.addEventListener("input", filtrarEquipamentos);
filtroSituacao.addEventListener("change", filtrarEquipamentos);

const dadosComplementares = {
    "EQ-COMP-01": {
        manutencoes: [
            {
                titulo: "Troca de filtro de óleo",
                situacao: "Concluída",
                classeSituacao: "success",
                descricao: "Substituição do filtro e verificação do nível de óleo do compressor.",
                data: "24/07/2026",
                tecnico: "Marcos Oliveira",
                observacao: "Equipamento liberado após teste operacional."
            },
            {
                titulo: "Revisão periódica",
                situacao: "Realizada",
                classeSituacao: "primary",
                descricao: "Inspeção visual, conferência de conexões e avaliação de ruídos e vibração.",
                data: "12/05/2026",
                tecnico: "Paula Mendes",
                observacao: "Sem anomalias identificadas durante a revisão."
            }
        ],
        naoConformidades: [{
            codigo: "NC-2026-014",
            titulo: "Vibração acima do limite",
            prioridade: "Média",
            descricao: "Vibração acima do parâmetro recomendado identificada durante a inspeção preventiva.",
            abertura: "08/10/2026",
            prazo: "15/10/2026",
            responsavel: "Equipe de Manutenção",
            acao: "Verificar fixação e realizar nova medição de vibração."
        }]
    },
    "EQ-CNC-04": {
        manutencoes: [{
            titulo: "Diagnóstico do sistema de acionamento",
            situacao: "Em andamento",
            classeSituacao: "warning",
            descricao: "Avaliação técnica do sistema de acionamento e verificação dos componentes mecânicos.",
            data: "10/10/2026",
            tecnico: "Equipe de Manutenção",
            observacao: "Equipamento permanece indisponível até a conclusão dos testes."
        }],
        naoConformidades: [{
            codigo: "NC-2026-018",
            titulo: "Equipamento indisponível para operação",
            prioridade: "Alta",
            descricao: "Falha identificada durante a avaliação técnica do equipamento.",
            abertura: "09/10/2026",
            prazo: "13/10/2026",
            responsavel: "Equipe de Manutenção",
            acao: "Concluir diagnóstico, corrigir a falha e validar o funcionamento."
        }]
    },
    "EQ-BOMB-12": {
        manutencoes: [{
            titulo: "Inspeção preventiva pendente",
            situacao: "Pendente",
            classeSituacao: "danger",
            descricao: "Inspeção de rotina ainda não registrada para o equipamento.",
            data: "A agendar",
            tecnico: "Não atribuído",
            observacao: "Programar inspeção antes de liberar a operação."
        }],
        naoConformidades: [{
            codigo: "NC-2026-021",
            titulo: "Inspeção preventiva não realizada",
            prioridade: "Alta",
            descricao: "A inspeção prevista para o equipamento está pendente.",
            abertura: "10/10/2026",
            prazo: "14/10/2026",
            responsavel: "Supervisor de Operações",
            acao: "Agendar a inspeção e registrar as evidências."
        }]
    },
    "EQ-EL-99": {
        manutencoes: [{
            titulo: "Verificação do quadro elétrico",
            situacao: "Concluída",
            classeSituacao: "success",
            descricao: "Verificação visual do quadro e conferência das identificações.",
            data: "02/09/2026",
            tecnico: "Carlos Henrique",
            observacao: "Nenhuma irregularidade identificada na verificação demonstrativa."
        }],
        naoConformidades: []
    }
};

function exibirHistoricoManutencoes(codigo) {
    const areaHistorico = document.getElementById("historicoManutencoes");
    const areaNaoConformidades = document.getElementById("naoConformidadesAtivas");
    const dados = dadosComplementares[codigo] || {
        manutencoes: [],
        naoConformidades: []
    };

    areaHistorico.innerHTML = dados.manutencoes.length
        ? dados.manutencoes.map((manutencao) => `
            <article class="maintenance-record border rounded-3 p-3 mb-2">
                <div class="d-flex justify-content-between align-items-start gap-2">
                    <strong class="small">${manutencao.titulo}</strong>
                    <span class="badge text-bg-${manutencao.classeSituacao}">${manutencao.situacao}</span>
                </div>
                <p class="small text-secondary my-2">${manutencao.descricao}</p>
                <div class="maintenance-meta">
                    <span><i class="bi bi-calendar3 me-1"></i>${manutencao.data}</span>
                    <span><i class="bi bi-person me-1"></i>${manutencao.tecnico}</span>
                </div>
                <small class="text-secondary d-block mt-2">Observação: ${manutencao.observacao}</small>
            </article>
        `).join("")
        : '<p class="small text-secondary border rounded-3 p-3">Nenhuma manutenção registrada para este equipamento.</p>';

    if (dados.naoConformidades.length) {
        areaNaoConformidades.classList.remove("d-none");

        areaNaoConformidades.innerHTML = dados.naoConformidades.map((ocorrencia) => `
            <article class="nonconformity-record border border-warning-subtle rounded-3 p-3 mb-2">
                <div class="d-flex justify-content-between align-items-start gap-2">
                    <strong class="small"><i class="bi bi-exclamation-triangle-fill text-warning me-1"></i>${ocorrencia.codigo} — ${ocorrencia.titulo}</strong>
                    <span class="badge text-bg-warning">${ocorrencia.prioridade}</span>
                </div>
                <p class="small text-secondary my-2">${ocorrencia.descricao}</p>
                <div class="maintenance-meta">
                    <span><i class="bi bi-calendar-event me-1"></i>Aberta em ${ocorrencia.abertura}</span>
                    <span><i class="bi bi-clock me-1"></i>Prazo: ${ocorrencia.prazo}</span>
                </div>
                <div class="mt-2">
                    <small class="text-secondary d-block">Responsável: ${ocorrencia.responsavel}</small>
                    <small class="text-secondary d-block">Ação corretiva: ${ocorrencia.acao}</small>
                </div>
            </article>
        `).join("");
    } else {
        areaNaoConformidades.classList.add("d-none");
        areaNaoConformidades.innerHTML = "";
    }
}

function selecionarEquipamento(nome, codigo, situacao, localizacao) {
    document.getElementById("detalheNome").textContent = nome;
    document.getElementById("detalheCodigo").textContent = codigo;
    document.getElementById("detalheStatus").textContent = situacao;
    document.getElementById("detalheLocal").textContent = localizacao;

    exibirHistoricoManutencoes(codigo);
}
