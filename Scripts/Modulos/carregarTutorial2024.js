const response = await fetch("../FelpsTodoDiaAtlas/Recursos/felpsTutorial2024.json");
const felpsTutorialObjects = await response.json();
export let idPasso = 0;
let numObjects = felpsTutorialObjects.length;

const imagemPasso = document.querySelector("#imgTutorial2024");
const numPasso = document.querySelector("#numPasso");
const dataPasso = document.querySelector("#dataPasso");

const buttonAnterior = document.querySelector("#tutorialPassoAnterior");
buttonAnterior.addEventListener("click", () => selecionarPasso(false));
const buttonPosterior = document.querySelector("#tutorialPassoPosterior");
buttonPosterior.addEventListener("click", () => selecionarPasso(true))

export function selecionarPasso(controle) {
    switch (controle) {
        case true:
            idPasso == numObjects - 1 ? mostrarPasso(0) : mostrarPasso(idPasso + 1);
            break;

        case false:
            idPasso == 0 ? mostrarPasso(numObjects - 1) : mostrarPasso(idPasso - 1);

        default:
            break;
    }
}

export function mostrarPasso(passo) {
    idPasso = passo;
    let passoObject = felpsTutorialObjects[idPasso] || felpsTutorialObjects[0];
    if (passo > 99) {
        imagemPasso.src = `../FelpsTodoDiaAtlas/Imagens2024/p101.webp`;
    } else {
        imagemPasso.src = `../FelpsTodoDiaAtlas/Imagens2024/${passoObject.arquivo}.webp`;
    }
    numPasso.textContent = `Passo ${passoObject.passo}`;
    numPasso.href = passoObject.tweet;
    dataPasso.textContent = passoObject.data;
}

