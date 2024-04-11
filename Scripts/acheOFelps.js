import { updateColorMode } from './Modulos/colorModeModule.js';
import {coletarConfigs} from './Modulos/functions.js';

atualizarDescricoes();

const infoModal = document.querySelector("#instrucoesModal");

document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("infoShown")) {
        infoModal.showModal()
        localStorage.setItem("infoShown", "true");
    }
});

// Menu
document.querySelector("#botaoMenuAcheOFelps").addEventListener("click", () => menuModal.showModal());
document.querySelector("#fecharMenu").addEventListener("click", () => menuModal.close());

    //Configs:
document.querySelector("#formConfigs").addEventListener("submit", (e) => aplicarConfigs(e));

document.querySelector("#configsDeJogo").addEventListener("submit", coletarConfigs);

document.querySelector("#configsDeJogo").addEventListener("change", atualizarDescricoes);

document.querySelector("#fecharInstrucoes").addEventListener("click", () => infoModal.close())
document.querySelector("#fecharInstrucoesPrincipal").addEventListener("click", () => infoModal.close())

function atualizarDescricoes() {
    const descricaoModoDeJogo = document.querySelector("#descricaoModoDeJogo");
    const descricaoModoDeTimer = document.querySelector("#descricaoModoDeTimer");
    // const descricaoColecaoDeFelps = document.querySelector("#descricaoColecaoDeFelps");

    document.querySelector("#inputModoAleatorio").checked ? descricaoModoDeJogo.textContent = "Ache um Felps aleatório." : null;
    document.querySelector("#inputModoDiario").checked ? descricaoModoDeJogo.textContent = "Ache o Felps do dia." : null;
    document.querySelector("#inputModoMaratona").checked ? descricaoModoDeJogo.innerHTML = "Ache TODOS os Felps em uma única partida.<br>Os Felps encontrados serão removidos da tela." : null;

    document.querySelector("#inputModoTimerCronometro").checked ? descricaoModoDeTimer.textContent = "Sem limite de tempo." : null;
    document.querySelector("#inputModoTimerTemporizador").checked ? descricaoModoDeTimer.textContent = "Apenas 60 segundos para achar o Felps." : null;

    // document.querySelector("#inputColecaoTodos").checked ? descricaoColecaoDeFelps.textContent = "Jogue com todos os Felps." : null;
    // document.querySelector("#inputColecao22").checked ? descricaoColecaoDeFelps.textContent = "Jogue apenas com os Felps de 2022." : null;
    // document.querySelector("#inputColecao24").checked ? descricaoColecaoDeFelps.textContent = "Jogue apenas com os Felps de 2024." : null;
}

function aplicarConfigs(event) {
    event.preventDefault();

    document.querySelector("#inputModoAuto").checked ? updateColorMode(true, "auto") : null;
    document.querySelector("#inputModoClaro").checked ? updateColorMode(true, "light") : null;
    document.querySelector("#inputModoEscuro").checked ? updateColorMode(true, "dark") : null;
}