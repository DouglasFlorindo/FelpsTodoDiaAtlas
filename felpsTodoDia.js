const infoModal = document.querySelector("#infoModal");
const catalogoModal = document.querySelector("#catalogoModal");
let felpsAtualId = 0;

async function populateAtlas() {

    const response = await fetch("felps.json");
    const felpsInfo = await response.json();

    for (const felps of felpsInfo) {

        const areaAtlas = document.getElementById("areaAtlas");
        let novoImg = document.createElement("img");
        novoImg.id = felps.id;
        novoImg.classList = "felps clicavel";
        novoImg.src = `../FelpsTodoDiaAtlas/Imagens/${felps.arquivo}.png`;
        novoImg.alt = felps.nome;
        novoImg.title = felps.nome;
        novoImg.setAttribute("onClick", `mostrarModal(${felps.id})`);
        novoImg.style.left = `${Math.floor(Math.random() * (96 - -5) + -5)}%`;
        novoImg.style.top = `${Math.floor(Math.random() * 86)}%`;

        areaAtlas.appendChild(novoImg);
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
};

populateAtlas();
populateCatalogo();

document.querySelector("#abrirCatalogo").addEventListener("click", () => catalogoModal.showModal());
document.querySelector("#fecharCatalogo").addEventListener("click", () => catalogoModal.close());

document.querySelector("#fecharInfo").addEventListener("click", () => infoModal.close());
document.querySelector("#felpsAnterior").addEventListener("click", () => felpsAtualId > 0 ? mostrarModal(felpsAtualId - 1) : null)
document.querySelector("#felpsPosterior").addEventListener("click", () => felpsAtualId < 364 ? mostrarModal(felpsAtualId + 1) : null)

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