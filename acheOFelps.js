import { populateAtlas, randomizarPosicoes, alterarEscala, escolherFelpsAlvo, controleTimer} from './functions.js';

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

populateAtlas("areaFelps", false)

escolherFelpsAlvo("aleatorio", 22)

controleTimer(true)

