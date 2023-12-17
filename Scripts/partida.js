import { populateAtlas, randomizarPosicoes, alterarEscala, escolherFelpsAlvo, controleTimer, finalizarPartida, carregarPartida, carregamentoCompleto } from './functions.js';

document.querySelector("#aumentarEscala").addEventListener("click", () => alterarEscala(true));
document.querySelector("#diminuirEscala").addEventListener("click", () => alterarEscala(false));

document.querySelector("#randomizarPosicoes").addEventListener("click", randomizarPosicoes);

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
        case "Escape":
            // window.location.replace("https://douglasflorindo.github.io/FelpsTodoDiaAtlas/acheOFelps.html");
            break;
        case "ç": //TIRAR ISSO DEPOIS!!!!!!!!!!!!!!!!
            finalizarPartida("vitoria");
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
