import { populateAtlas, populateCatalogo, randomizarPosicoes, selecionarInfo, alterarEscala, verificarSenha, felpsInfo } from './Modulos/functions.js';
import { filtrarFelps } from './Modulos/filtroFelps.js';
import { idPasso, mostrarPasso, preloadImagens } from "./Modulos/carregarTutorial2024.js";

const infoModal = document.querySelector("#infoModal");
const catalogoModal = document.querySelector("#catalogoModal");
const boasVindasModal = document.querySelector("#boasVindasModal");

const tituloPrincipal = document.querySelector("#sectionPrincipalH1")

let preload = false;
let inputSenha = "";

populateAtlas("divAtlas", true);
populateCatalogo();
mostrarPasso(0);

if (!localStorage.getItem("modalShown")) {
    boasVindasModal.showModal()
    localStorage.setItem("modalShown", "true");
}

const formFiltroFelps = document.querySelector("#formFiltroFelps");
formFiltroFelps.reset();
formFiltroFelps.addEventListener("change", () => {
    filtrarFelps(felpsInfo);
    preload ? null : preloadImagens();
    preload = true;
});

document.querySelector("#abrirCatalogo").addEventListener("click", () => catalogoModal.showModal());
document.querySelector("#fecharCatalogo").addEventListener("click", function () {
    catalogoModal.style.animation = "desaparecerCatalogoSobre 0.5s ease";
    setTimeout(function () {
        catalogoModal.close()
        catalogoModal.style.animation = "aparecerCatalogoSobre 0.5s ease"
    }, 450);
});

document.querySelector("#abrirSobre").addEventListener("click", () => sobreModal.showModal());
document.querySelector("#fecharSobre").addEventListener("click", function () {
    sobreModal.style.animation = "desaparecerCatalogoSobre 0.5s ease";
    setTimeout(function () {
        sobreModal.close()
        sobreModal.style.animation = "aparecerCatalogoSobre 0.5s ease"
    }, 450);
});

document.querySelector("#fecharInfo").addEventListener("click", function () {
    infoModal.style.animation = "desaparecerInfo 0.5s ease";
    setTimeout(function () {
        infoModal.close()
        infoModal.style.animation = "aparecerInfo 0.5s ease"
    }, 450);
});

document.querySelector("#fecharBoasVindas").addEventListener("click", function () {
    boasVindasModal.style.animation = "desaparecerCatalogoSobre 0.5s ease";
    setTimeout(function () {
        boasVindasModal.close()
        boasVindasModal.style.animation = "aparecerCatalogoSobre 0.5s ease"
    }, 450);
});

document.querySelector("#felpsAnterior").addEventListener("click", () => selecionarInfo(true))
document.querySelector("#felpsPosterior").addEventListener("click", () => selecionarInfo(false))
infoModal.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowUp":
            selecionarInfo(true);
            break;
        case "ArrowDown":
            selecionarInfo(false);
            break;
        default:
            break;
    }
})

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
        case "c":
            catalogoModal.showModal();
            break;
        case "s":
            sobreModal.showModal();
            break;
        default:
            break;
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key == "'" || event.key == "-" && inputSenha.length < 4) {
        inputSenha += event.key;
        verificarSenha(inputSenha)
    } else {
        inputSenha = ""
    }
});


