import { finalizarPartida, populateAtlas, randomizarPosicoes, alterarEscala, carregarPartida, carregamentoCompleto, compartilharResultado, hitSFX, metronomoSFX, metronomoHighSFX } from './functions.js';

const confirmacaoModal = document.querySelector("#voltarMenuModal");
const inputAudio = document.querySelector("#inputAudio");
const header = document.querySelector("#headerJogo")

inputAudio.checked = false;
inputAudio.addEventListener("change", () => {
    if (inputAudio.checked) {
        hitSFX.volume = 0.5;
        metronomoSFX.volume = 0.5;
        metronomoHighSFX.volume = 0.5;
    } else {
        hitSFX.volume = 0;
        metronomoSFX.volume = 0;
        metronomoHighSFX.volume = 0;
    }
});

window.addEventListener("resize", () => {
    if (document.body.clientWidth <= 760) {
        header.classList = "";
        header.style.top = "calc(10dvh + 2 * var(--espaco))"
        header.style.zIndex = "1"
    } else {
        header.style.zIndex = "1";
        header.style.top = "0"
    }
})

header.addEventListener("click", () => {
    if (document.body.clientWidth <= 760) {
        if (header.classList.contains("aberto")) {
            header.classList = "";
            header.style.top = "calc(10dvh + 2 * var(--espaco))"
            header.style.zIndex = "1"
        } else {
            header.classList = "aberto";
            header.style.zIndex = "15"
            header.style.top = "100%"
        }
    } 
})

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
        //Cheats de dev: 
        case "ç": 
            finalizarPartida("vitoria");
            break;
        case "l": 
            finalizarPartida("derrota");
            break;
        case "k":
            finalizarPartida("vitoriaMaratona");
            break;
        case "j":
            finalizarPartida("derrotaMaratona");
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

document.querySelector("#derrotaMaratonaModal").addEventListener('keydown', (event) => {
    event.key == "Escape" ? event.preventDefault() : null;
});
document.querySelector("#botaoJogarNovamente3").addEventListener("click", carregarPartida);
document.querySelector("#botaoCompartilhar3").addEventListener("click", compartilharResultado);
document.querySelector("#botaoVoltarMenu3").addEventListener("click", () => window.location.replace("https://douglasflorindo.github.io/FelpsTodoDiaAtlas/acheOFelps.html"));

document.querySelector("#finalMaratonaModal").addEventListener('keydown', (event) => {
    event.key == "Escape" ? event.preventDefault() : null;
});
document.querySelector("#botaoJogarNovamente4").addEventListener("click", carregarPartida);
document.querySelector("#botaoCompartilhar4").addEventListener("click", compartilharResultado);
document.querySelector("#botaoVoltarMenu4").addEventListener("click", () => window.location.replace("https://douglasflorindo.github.io/FelpsTodoDiaAtlas/acheOFelps.html"));

document.querySelector("#botaoVoltarSim").addEventListener("click", () => window.location.replace("https://douglasflorindo.github.io/FelpsTodoDiaAtlas/acheOFelps.html"));
document.querySelector("#botaoVoltarNao").addEventListener("click", () => confirmacaoModal.close())

document.querySelector("#botaoContinuar").addEventListener("click", () => {
    document.querySelector("#pausaMaratona").close();
    carregarPartida();
})

populateAtlas("areaFelps", false);

let esperarCarregamento = setInterval(() => {
    if (carregamentoCompleto) {
        carregarPartida();
        clearInterval(esperarCarregamento);
    }
}, 10);

setTimeout(() => {
    if (carregamentoCompleto == false) {
        alert("A página está levando muito mais tempo para carregar do que o esperado. Continue aguardando ou recarregue a página.");
    }
}, 20000);

