import { populateAtlas, randomizarPosicoes, alterarEscala, escolherFelpsAlvo, controleTimer, finalizarPartida, carregarPartida } from './functions.js';

const resultadoModal = document.querySelector("#resultadoModal");
let modo = "aleatorio";
let ano = 22;

document.querySelector("#botaoJogar").addEventListener("click", carregarPartida)

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
        default:
            break;
    }
});

document.querySelector("#botaoJogarNovamente").addEventListener("click", carregarPartida)

populateAtlas("areaFelps", false)




