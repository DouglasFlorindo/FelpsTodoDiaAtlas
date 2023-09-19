const infoModal = document.querySelector("#infoModal");
const catalogoModal = document.querySelector("#catalogoModal");
let felpsAtualNum;
let felpsDrag;
let movendo = false;

async function populateAtlas() {

    const response = await fetch("felps.json");
    const felpsInfo = await response.json();

    for (const felps of felpsInfo) {

        let novoImg = document.createElement("img");
        novoImg.id = `f${felps.id}`;
        novoImg.classList = "felps clicavel";
        novoImg.src = `../FelpsTodoDiaAtlas/Imagens/${felps.arquivo}.png`;
        novoImg.alt = felps.nome;
        novoImg.title = felps.nome;
        novoImg.addEventListener('click', () => mostrarModal(felps.id));
        novoImg.addEventListener('mousedown', function () {
            felpsDrag = this;
        });
        novoImg.addEventListener('mouseup', function () {
            setTimeout(() => {
                movendo = false
            }, 500);
        })
        novoImg.style.left = `${Math.floor(Math.random() * (90 - 20 + 1)) + 10}%`;
        novoImg.style.top = `${Math.floor(Math.random() * (70 - 20 + 1)) + 20}%`;

        document.body.appendChild(novoImg);
    }
};

async function populateCatalogo() {

    const response = await fetch("felps.json");
    const felpsInfo = await response.json();

    for (const felps of felpsInfo) {

        const areaCatalogo = document.getElementById("areaCatalogo");
        let novoDiv = document.createElement("div");
        let novoImg = document.createElement("img");

        novoDiv.className = "itemCatalogo";
        novoImg.id = felps.id;
        novoImg.classList = "felpsCatalogo clicavel";
        novoImg.src = `../FelpsTodoDiaAtlas/Imagens/${felps.arquivo}HRes.png`;
        novoImg.alt = felps.nome;
        novoImg.title = felps.nome;
        novoImg.setAttribute("onClick", `mostrarModal(${felps.id})`);

        novoDiv.appendChild(novoImg);
        areaCatalogo.appendChild(novoDiv);

    }
};

async function mostrarModal(felpsId) {
    if (movendo == false) {
        const response = await fetch("felps.json");
        const felpsInfo = await response.json();
        felpsAtualId = felpsId

        document.querySelector("#tituloModal").textContent = `${felpsInfo[felpsId].numero}. ${felpsInfo[felpsId].nome}`;
        document.querySelector("#felpsHRes").src = `../FelpsTodoDiaAtlas/Imagens/${felpsInfo[felpsId].arquivo}HRes.png`;
        document.querySelector("#felpsHRes").alt = felpsInfo[felpsId].nome;
        document.querySelector("#felpsHRes").title = felpsInfo[felpsId].nome;
        document.querySelector("#subInfoModal").textContent = `${felpsInfo[felpsId].data} • ${felpsInfo[felpsId].artista}`;
        document.querySelector("#linkTwitter").setAttribute("href", `${felpsInfo[felpsId].tweet}`);
        document.querySelector("#linkOriginal").setAttribute("href", `${felpsInfo[felpsId].original}`);

        infoModal.showModal()
    }
};

populateAtlas();
populateCatalogo();

document.querySelector("#abrirSobre").addEventListener("click", () => sobreModal.showModal());
document.querySelector("#fecharSobre").addEventListener("click", () => sobreModal.close());

document.querySelector("#abrirCatalogo").addEventListener("click", () => catalogoModal.showModal());
document.querySelector("#fecharCatalogo").addEventListener("click", () => catalogoModal.close());

document.querySelector("#fecharInfo").addEventListener("click", () => infoModal.close());
document.querySelector("#felpsAnterior").addEventListener("click", () => felpsAtualId > 0 ? mostrarModal(felpsAtualId - 1) : mostrarModal(felpsAtualId = 364))
document.querySelector("#felpsPosterior").addEventListener("click", () => felpsAtualId < 364 ? mostrarModal(felpsAtualId + 1) : mostrarModal(felpsAtualId = 0))

function alterarEscala(x) {

    let root = document.documentElement;
    let tamanhoEscala = parseFloat(getComputedStyle(root).getPropertyValue("--escalaFelps"));

    switch (x) {
        case true:
            root.style.setProperty("--escalaFelps", `${tamanhoEscala + 0.1}`)
            break
        case false:
            root.style.setProperty("--escalaFelps", `${tamanhoEscala - 0.1}`)
            break
    }
};

document.addEventListener('mousedown', function (e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
document.addEventListener('mouseup', () => felpsDrag = null);
document.addEventListener('mousemove', function (e) {
    if (felpsDrag != null) {
        let x = e.pageX;
        let y = e.pageY;

        felpsDrag.style.left = x + "px";
        felpsDrag.style.top = y + "px";
        movendo = true
    }
})

let inputSenha;

document.addEventListener("keydown", function (event) {
    if (event.key == "'" || event.key == "-" && inputSenha.length < 4) {
        inputSenha += event.key;
        verificarSenha(inputSenha)
    } else {
        inputSenha = ""
    }
});

function verificarSenha(senha) {
    switch (senha) {
        case "'-'":
            easterEgg();
            break;
        default:
            break;
    }
}

function easterEgg() {
    console.log("easterEgg ativado!!!")
}

// ok, cada felps precisa de dois event listeners, pra mouseup e down, que irão ativar funções utilizando o id como argumento.

