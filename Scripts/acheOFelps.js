import {coletarConfigs} from './functions.js';

localStorage.clear();
atualizarDescricoes();

const infoModal = document.querySelector("#infoAcheOFelpsModal");

document.querySelector("#botaoInfoAcheOFelps").addEventListener("click", () => infoModal.showModal());

document.querySelector("#configsDeJogo").addEventListener("submit", coletarConfigs);

document.querySelector("#configsDeJogo").addEventListener("change", atualizarDescricoes);

document.querySelector("#fecharInfoAcheOFelps").addEventListener("click", () => infoModal.close())

function atualizarDescricoes() {
    const descricaoModoDeJogo = document.querySelector("#descricaoModoDeJogo");
    const descricaoModoDeTimer = document.querySelector("#descricaoModoDeTimer");
    const descricaoColecaoDeFelps = document.querySelector("#descricaoColecaoDeFelps");

    document.querySelector("#inputModoAleatorio").checked ? descricaoModoDeJogo.textContent = "Ache um Felps aleatório." : null;
    document.querySelector("#inputModoDiario").checked ? descricaoModoDeJogo.textContent = "Ache o Felps do dia." : null;

    document.querySelector("#inputModoTimerCronometro").checked ? descricaoModoDeTimer.textContent = "Jogue sem a pressão do tempo." : null;
    document.querySelector("#inputModoTimerTemporizador").checked ? descricaoModoDeTimer.textContent = "Apenas 60 segundos para achar o Felps." : null;

    document.querySelector("#inputColecaoTodos").checked ? descricaoColecaoDeFelps.textContent = "Jogue com todos os Felps." : null;
    document.querySelector("#inputColecao22").checked ? descricaoColecaoDeFelps.textContent = "Jogue apenas com os Felps de 2022." : null;
    document.querySelector("#inputColecao24").checked ? descricaoColecaoDeFelps.textContent = "Jogue apenas com os Felps de 2024." : null;
}
