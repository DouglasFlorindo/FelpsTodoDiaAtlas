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
        novoImg.style.left = `${Math.floor(Math.random() * 91)}%`;
        novoImg.style.top = `${Math.floor(Math.random() * 91)}%`;
    
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
        novoImg.src = `../FelpsTodoDiaAtlas/Imagens/${felps.arquivo}.png`;
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

    document.getElementById("tituloModal").textContent = `${felpsInfo[felpsId].numero}. ${felpsInfo[felpsId].nome}`;
    document.getElementById("felpsHRes").src = `../FelpsTodoDiaAtlas/Imagens/${felpsInfo[felpsId].arquivo}HRes.png`;
    document.getElementById("felpsHRes").alt = felpsInfo[felpsId].nome;
    document.getElementById("felpsHRes").title = felpsInfo[felpsId].nome;
    document.getElementById("subInfoModal").textContent = `${felpsInfo[felpsId].data} • ${felpsInfo[felpsId].artista}`
    document.getElementById("infoModal").showModal()
};

populateAtlas();
populateCatalogo();

document.querySelector("#abrirCatalogo").addEventListener("click", () => document.querySelector("#catalogoModal").showModal());

document.querySelector("#fecharCatalogo").addEventListener("click", () => document.querySelector("#catalogoModal").close());

document.querySelector("#fecharInfo").addEventListener("click", () => document.querySelector("#infoModal").close());

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
