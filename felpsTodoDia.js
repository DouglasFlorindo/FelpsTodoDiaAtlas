async function populateAtlas() {

    const response = await fetch("felps.json");
    const felpsInfo = await response.json();

    for (const felps of felpsInfo) {

        const areaAtlas = document.getElementById("areaAtlas");
        let novoImg = document.createElement("img");
        novoImg.id = felps.id;
        novoImg.className = "felps";
        novoImg.src = `../FelpsTodoDiaAtlas/Imagens/${felps.arquivo}.png`;
        novoImg.alt = felps.nome;
        novoImg.title = felps.nome;
        novoImg.setAttribute("onClick", `mostrarModal(${felps.id})`)
        novoImg.style.left = felps.posicao[0];
        novoImg.style.top = felps.posicao[1];

        areaAtlas.appendChild(novoImg);
    }
}

populateAtlas();

async function mostrarModal(felpsId) {

    const response = await fetch("felps.json");
    const felpsInfo = await response.json();

    document.getElementById("tituloModal").textContent = `${felpsInfo[felpsId].numero}. ${felpsInfo[felpsId].nome}`;
    document.getElementById("felpsHRes").src = `../FelpsTodoDiaAtlas/Imagens/${felpsInfo[felpsId].arquivo}HRes.png`;
    document.getElementById("felpsHRes").alt = felpsInfo[felpsId].nome;
    document.getElementById("felpsHRes").title = felpsInfo[felpsId].nome;
    document.getElementById("subInfoModal").textContent = `${felpsInfo[felpsId].data} • ${felpsInfo[felpsId].artista}`
    document.getElementById("infoModal").showModal()
}

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

}



