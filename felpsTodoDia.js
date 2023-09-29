const infoModal = document.querySelector("#infoModal");
const catalogoModal = document.querySelector("#catalogoModal");
let felpsAtualId, felpsDrag;
let movendo = false;

async function populateAtlas() {
    const response = await fetch("felps.json");
    const felpsInfo = await response.json();
    const atlas = document.querySelector("#divAtlas");

    for (const felps of felpsInfo) {

        let novoImg = document.createElement("img");
        let novoButton = document.createElement("button");

        novoImg.id = `f${felps.id}`;
        novoButton.id = `b${felps.id}`;
        novoImg.src = `../FelpsTodoDiaAtlas/Imagens/${felps.arquivo}.png`;
        novoImg.alt = felps.nome;
        novoImg.title = felps.nome;
        novoButton.classList = "felps";
        novoButton.style.animation = "aparecerFelps 0.5s ease"
        novoButton.addEventListener('click', () => movendo == false ? mostrarInfo(felps.id) : null);
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
        novoButton.addEventListener('focus', function () {
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
        novoButton.style.left = `${Math.floor(Math.random() * (90 - 20 + 1)) + 10}%`;
        novoButton.style.top = `${Math.floor(Math.random() * (70 - 20 + 1)) + 20}%`;

        novoButton.appendChild(novoImg);
        atlas.appendChild(novoButton);
    }

    
};

async function populateCatalogo() {
    const response = await fetch("felps.json");
    const felpsInfo = await response.json();

    for (const felps of felpsInfo) {

        const areaCatalogo = document.getElementById("areaCatalogo");
        let novoButton = document.createElement("button");
        let novoImg = document.createElement("img");

        novoButton.className = "itemCatalogo";
        novoImg.id = felps.id;
        novoImg.classList = "felpsCatalogo clicavel";
        novoImg.src = `../FelpsTodoDiaAtlas/Imagens/${felps.arquivo}HRes.png`;
        novoImg.alt = felps.nome;
        novoImg.title = felps.nome;
        novoButton.addEventListener("click", () => mostrarInfo(felps.id));

        novoButton.appendChild(novoImg);
        areaCatalogo.appendChild(novoButton);

    }
};

async function mostrarInfo(felpsId) {
    const response = await fetch("felps.json");
    const felpsInfo = await response.json();
    felpsAtualId = felpsId;

    let dataAtual, dia, mes;

    dia = new Date().getDate();
    String(dia).length == 1 ? dia = "0" + dia : null;
    mes = new Date().getMonth() + 1;
    String(mes).length == 1 ? mes = "0" + mes : null;
    dataAtual = `${dia}/${mes}`;
    
    if (felpsInfo[felpsId].data == dataAtual) {
        document.querySelector("#felpsDoDia").style.display = "inherit"
    } else {
        document.querySelector("#felpsDoDia").style.display = "none"
    }
    
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
document.querySelector("#felpsAnterior").addEventListener("click", () => felpsAtualId > 0 ? mostrarInfo(felpsAtualId - 1) : mostrarInfo(felpsAtualId = 364))
document.querySelector("#felpsPosterior").addEventListener("click", () => felpsAtualId < 364 ? mostrarInfo(felpsAtualId + 1) : mostrarInfo(felpsAtualId = 0))

function alterarEscala(x) {
    let root = document.documentElement;
    let tamanhoEscala = parseFloat(getComputedStyle(root).getPropertyValue("--escalaFelps"));

    switch (x) {
        case true:
            root.style.setProperty("--escalaFelps", `${tamanhoEscala + 0.1}`)
            break
        case false:
            tamanhoEscala > 0.2 ? root.style.setProperty("--escalaFelps", `${tamanhoEscala - 0.1}`) : null
            break
    }
};

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "+":
            alterarEscala(true);
            break;
        case "-":
            alterarEscala(false);
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

