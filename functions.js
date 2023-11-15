let movendo = false;
let felpsDrag, felpsAtualId, quantFelps;

export async function populateAtlas(containerID, isAtlas) {
    const response = await fetch("felps.json");
    const felpsInfo = await response.json();
    quantFelps = felpsInfo.length;
    const atlas = document.querySelector(`#${containerID}`);
    
    for (const felps of felpsInfo) {

        let novoImg = document.createElement("img");
        let novoButton = document.createElement("button");

        novoImg.id = `f${felps.id}`;
        novoButton.id = `b${felps.id}`;
        novoImg.src = `../FelpsTodoDiaAtlas/Imagens/${felps.arquivo}.webp`;
        novoImg.alt = felps.nome;
        novoImg.title = felps.nome;
        novoButton.classList = "felps";
        novoButton.style.animation = "aparecerFelps 0.5s ease"
        isAtlas ? novoButton.addEventListener('click', () => movendo == false ? mostrarInfo(felps.id) : null) : null; // Verificar felps correto aqui!!!! talvez
        novoButton.addEventListener('mousedown', function () {
            felpsDrag = this;
        });
        novoButton.addEventListener('mouseup', function () {
            if (movendo == true) {
                setTimeout(() => {
                    movendo = false
                }, 250);
                felpsDrag.style.transform = "translate(0, 0)";
                felpsDrag.style.filter = "none";
                felpsDrag.style.cursor = "pointer";
            }
        });
        novoButton.addEventListener('focus', () => {
            this.addEventListener('keydown', function (event) {
                switch (event.key) {
                    case "ArrowUp":
                        this.style.top = (parseFloat(this.style.top) - 1) + "%";
                        break;
                    case "ArrowDown":
                        this.style.top = (parseFloat(this.style.top) + 1) + "%";
                        break;
                    case "ArrowLeft":
                        this.style.left = (parseFloat(this.style.left) - 1) + "%";
                        break;
                    case "ArrowRight":
                        this.style.left = (parseFloat(this.style.left) + 1) + "%";
                        break;
                    default:
                        break;
                }
            })
        })
        novoButton.style.left = `${Math.floor(Math.random() * (90 - 20)) + 10}%`;
        novoButton.style.top = `${Math.floor(Math.random() * (70 - 20)) + 20}%`;

        novoButton.appendChild(novoImg);
        atlas.appendChild(novoButton);
    }

    document.addEventListener('mousedown', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });
    document.addEventListener('mouseup', () => felpsDrag = null);
    document.addEventListener('mousemove', function (e) {
        if (felpsDrag != null) {
            let x = e.pageX / document.body.clientWidth * 100;
            let y = e.pageY / document.body.clientHeight * 100;
    
            felpsDrag.style.left = x + "%";
            felpsDrag.style.top = y + "%";
            felpsDrag.style.cursor = "move"
            felpsDrag.style.transform = "translate(-50%, -50%)"
            felpsDrag.style.filter = `drop-shadow(${felpsDrag.clientWidth / 2}px ${felpsDrag.clientHeight / 2}px rgba(160, 34, 59, 0.5))`;
    
            movendo = true
        }
    })
}

export async function populateCatalogo(containerID) {
    const response = await fetch("felps.json");
    const felpsInfo = await response.json();

    for (const felps of felpsInfo) {

        const catalogo = document.querySelector(`#${containerID}`);
        let novoButton = document.createElement("button");
        let novoImg = document.createElement("img");

        novoButton.className = "itemCatalogo";
        novoImg.id = felps.id;
        novoImg.classList = "felpsCatalogo clicavel";
        novoImg.src = `../FelpsTodoDiaAtlas/Imagens/${felps.arquivo}HRes.webp`;
        novoImg.alt = felps.nome;
        novoImg.title = felps.nome;
        novoButton.addEventListener("click", () => mostrarInfo(felps.id));

        novoButton.appendChild(novoImg);
        catalogo.appendChild(novoButton);

    }
};

export async function mostrarInfo(felpsId) {
    const response = await fetch("felps.json");
    const felpsInfo = await response.json();
    felpsAtualId = felpsId;

    let dataAtual, dia, mes;

    dia = new Date().getDate();
    String(dia).length == 1 ? dia = "0" + dia : null;
    mes = new Date().getMonth() + 1;
    String(mes).length == 1 ? mes = "0" + mes : null;
    dataAtual = `${dia}/${mes}`;
    
    //adicionar ".substring(0, 5)" após adicionar ano às datas
    if (felpsInfo[felpsId].data == dataAtual) {
        document.querySelector("#felpsDoDia").style.display = "inherit"
    } else {
        document.querySelector("#felpsDoDia").style.display = "none"
    }
    
    document.querySelector("#tituloModal").textContent = `${felpsInfo[felpsId].numero}. ${felpsInfo[felpsId].nome}`;
    document.querySelector("#felpsHRes").src = `../FelpsTodoDiaAtlas/Imagens/${felpsInfo[felpsId].arquivo}HRes.webp`;
    document.querySelector("#felpsHRes").alt = felpsInfo[felpsId].nome;
    document.querySelector("#felpsHRes").title = felpsInfo[felpsId].nome;
    document.querySelector("#subInfoModal").textContent = `${felpsInfo[felpsId].data} • ${felpsInfo[felpsId].artista}`;
    document.querySelector("#linkTwitter").setAttribute("href", `${felpsInfo[felpsId].tweet}`);
    document.querySelector("#linkOriginal").setAttribute("href", `${felpsInfo[felpsId].original}`);

    infoModal.showModal()
};

export function selecionarInfo(seletor) {
    switch (seletor) {
        case true:
            felpsAtualId > 0 ? mostrarInfo(felpsAtualId - 1) : mostrarInfo(felpsAtualId = quantFelps - 1);
            break
        case false:
            felpsAtualId < quantFelps - 1 ? mostrarInfo(felpsAtualId + 1) : mostrarInfo(felpsAtualId = 0);
            break
    }
}

export function randomizarPosicoes() {
    let felps = document.querySelectorAll(".felps");
    
    felps.forEach(element => {
        element.style.left = `${Math.floor(Math.random() * (90 - 20)) + 10}%`;
        element.style.top = `${Math.floor(Math.random() * (70 - 20)) + 20}%`;
    });
};

export function alterarEscala(seletor) {
    let root = document.documentElement;
    let tamanhoEscala = parseFloat(getComputedStyle(root).getPropertyValue("--escalaFelps"));

    switch (seletor) {
        case true:
            root.style.setProperty("--escalaFelps", `${tamanhoEscala + 0.1}`)
            break
        case false:
            tamanhoEscala > 0.2 ? root.style.setProperty("--escalaFelps", `${tamanhoEscala - 0.1}`) : null
            break
    }
};

export function verificarSenha(senha) {
    switch (senha) {
        case "'-'":
            console.log("'-'")
            setInterval(() => easterEgg(), 500)
            break;
        default:
            break;
    }
}   

export function easterEgg() {
    let novoImg = document.createElement("img");
    const atlas = document.querySelector("#divAtlas");

    novoImg.src = "../FelpsTodoDiaAtlas/Recursos/emoteCarinha.png";
    novoImg.classList = "carinha";
    novoImg.style.left = `${Math.floor(Math.random() * 100)}%`;
    novoImg.style.top = `-${Math.floor(Math.random() * 90) + 10}%`;
    atlas.appendChild(novoImg)
}