const response = await fetch("../FelpsTodoDiaAtlas/Recursos/felpsTutorial2024.json");
const felpsTutorialObjects = await response.json();
export let idPasso = 0;
let numObjects = felpsTutorialObjects.length;

const imagemPasso = document.querySelector("#imgTutorial2024");
const dataPasso = document.querySelector("#dataPasso");
const displayTutorial = document.querySelector("#displayTutorial2024")

const inputPasso = document.querySelector("#inputPasso");
inputPasso.addEventListener("change", () => {
    mostrarPasso(inputPasso.value - 1)
})

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
    passo = parseInt(passo);
    passo < 0?passo = 0:null;
    passo > numObjects - 1?passo = numObjects - 1:null; 
    inputPasso.value = passo + 1;
    idPasso = passo;
    let passoObject = felpsTutorialObjects[idPasso] || felpsTutorialObjects[0];
    if (passo >= 146) {
        imagemPasso.src = `../FelpsTodoDiaAtlas/Imagens2024/p146.webp`;
    } else {
        imagemPasso.src = `../FelpsTodoDiaAtlas/Imagens2024/${passoObject.arquivo}.webp`;
    }
    dataPasso.href = passoObject.tweet;
    dataPasso.textContent = passoObject.data;
}

export function preloadImagens() {
    console.log("Pré-carregando imagens...")
    try {
        for (const object of felpsTutorialObjects) {
            const img = new Image();
            img.src = `../FelpsTodoDiaAtlas/Imagens2024/${object.arquivo}.webp`;
        }
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("keydown", (event) => {
    if (!displayTutorial.classList.contains("filtrado")) {
        switch (event.key) {
            case "ArrowLeft":
                selecionarPasso(false);
                break;

            case "ArrowRight":
                selecionarPasso(true);
                break;
        
            default:
                break;
        }
    }
});