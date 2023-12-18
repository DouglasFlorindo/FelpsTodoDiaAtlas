import { populateAtlas, randomizarPosicoes, alterarEscala, escolherFelpsAlvo, controleTimer, finalizarPartida, carregarPartida, carregamentoCompleto, compartilharResultado } from './functions.js';

const confirmacaoModal = document.querySelector("#voltarMenuModal");

document.querySelector("#aumentarEscala").addEventListener("click", () => alterarEscala(true));
document.querySelector("#diminuirEscala").addEventListener("click", () => alterarEscala(false));
document.querySelector("#randomizarPosicoes").addEventListener("click", randomizarPosicoes);
document.querySelector("#voltarMenu").addEventListener("click", () => confirmacaoModal.showModal());

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "+":
            alterarEscala(true);
            break;
        case "-":
            alterarEscala(false);
            break;
        case "r":
            randomizarPosicoes();
            break;
        case "m":
            confirmacaoModal.showModal();
            break;
        case "ç": //TIRAR ISSO DEPOIS!!!!!!!!!!!!!!!!
            finalizarPartida("vitoria");
            break;
        case "l": //TIRAR ISSO DEPOIS!!!!!!!!!!!!!!!!
            finalizarPartida("derrota");
            break;
        default:
            break;
    }
});

document.querySelector("#resultadoModal").addEventListener('keydown', (event) => {
    event.key == "Escape" ? event.preventDefault() : null;
});
document.querySelector("#botaoJogarNovamente").addEventListener("click", carregarPartida);
document.querySelector("#botaoVoltarMenu").addEventListener("click", () => window.location.replace("https://douglasflorindo.github.io/FelpsTodoDiaAtlas/acheOFelps.html"));
document.querySelector("#botaoCompartilhar").addEventListener("click", compartilharResultado);

document.querySelector("#derrotaModal").addEventListener('keydown', (event) => {
    event.key == "Escape" ? event.preventDefault() : null;
});
document.querySelector("#botaoJogarNovamente2").addEventListener("click", carregarPartida);
document.querySelector("#botaoVoltarMenu2").addEventListener("click", () => window.location.replace("https://douglasflorindo.github.io/FelpsTodoDiaAtlas/acheOFelps.html"));

document.querySelector("#botaoVoltarSim").addEventListener("click", () => window.location.replace("https://douglasflorindo.github.io/FelpsTodoDiaAtlas/acheOFelps.html"));
document.querySelector("#botaoVoltarNao").addEventListener("click", () =>  confirmacaoModal.close())

populateAtlas("areaFelps", false);

let esperarCarregamento = setInterval(() => {
    if (carregamentoCompleto) {
        carregarPartida();
        clearInterval(esperarCarregamento);
    }
}, 10);

setTimeout(() => {
    if (carregamentoCompleto == false) {
        alert("erro");
        clearInterval(esperarCarregamento);
    }
}, 20000);
