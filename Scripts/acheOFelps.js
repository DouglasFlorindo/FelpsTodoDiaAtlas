import {coletarConfigs} from './functions.js';

atualizarDescricoes();

const infoModal = document.querySelector("#instrucoesModal");

document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("infoShown")) {
        infoModal.showModal()
        localStorage.setItem("infoShown", "true");
    }
});

document.querySelector("#botaoInfoAcheOFelps").addEventListener("click", () => infoModal.showModal());

document.querySelector("#configsDeJogo").addEventListener("submit", coletarConfigs);

document.querySelector("#configsDeJogo").addEventListener("change", atualizarDescricoes);

document.querySelector("#fecharInstrucoes").addEventListener("click", () => infoModal.close())
document.querySelector("#fecharInstrucoesPrincipal").addEventListener("click", () => infoModal.close())


function atualizarDescricoes() {
    const descricaoModoDeJogo = document.querySelector("#descricaoModoDeJogo");
    const descricaoModoDeTimer = document.querySelector("#descricaoModoDeTimer");
    const descricaoColecaoDeFelps = document.querySelector("#descricaoColecaoDeFelps");

    document.querySelector("#inputModoAleatorio").checked ? descricaoModoDeJogo.textContent = "Ache um Felps aleatório." : null;
    document.querySelector("#inputModoDiario").checked ? descricaoModoDeJogo.textContent = "Ache o Felps do dia." : null;
    document.querySelector("#inputModoMaratona").checked ? descricaoModoDeJogo.innerHTML = "Ache TODOS os Felps em uma úncia partida.<br>Os Felps encontados serão removidos da tela." : null;

    document.querySelector("#inputModoTimerCronometro").checked ? descricaoModoDeTimer.textContent = "Sem limite de tempo." : null;
    document.querySelector("#inputModoTimerTemporizador").checked ? descricaoModoDeTimer.textContent = "Apenas 60 segundos para achar o Felps." : null;

    document.querySelector("#inputColecaoTodos").checked ? descricaoColecaoDeFelps.textContent = "Jogue com todos os Felps." : null;
    document.querySelector("#inputColecao22").checked ? descricaoColecaoDeFelps.textContent = "Jogue apenas com os Felps de 2022." : null;
    document.querySelector("#inputColecao24").checked ? descricaoColecaoDeFelps.textContent = "Jogue apenas com os Felps de 2024." : null;
}