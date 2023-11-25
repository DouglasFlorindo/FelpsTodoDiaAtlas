let movendo = false;
let felpsDrag, felpsAtualId, quantFelps, timerId;
export let felpsAlvo, timer;
let modo, ano;

export async function populateAtlas(containerID, isAtlas) {
    const response = await fetch("felps.json");
    const felpsInfo = await response.json();
    quantFelps = felpsInfo.length;
    const atlas = document.querySelector(`#${containerID}`);

    for (const felps of felpsInfo) {

        let novoImg = document.createElement("img");
        let novoButton = document.createElement("button");

        novoButton.appendChild(novoImg);
        novoImg.id = `f${felps.id}`;
        novoImg.src = `../FelpsTodoDiaAtlas/Imagens/${felps.arquivo}.webp`;
        novoImg.alt = felps.nome;
        novoImg.title = felps.nome;
        novoImg.classList = "felpsImagem"
        novoImg.style.opacity = "0"


        novoButton.id = `b${felps.id}`;
        novoButton.classList = "felps";
        isAtlas ? novoButton.addEventListener('click', () => movendo == false ? mostrarInfo(felps.id) : null) : novoButton.addEventListener('click', () => movendo == false ? verificarFelpsAlvo(felps.id) : null);
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
        novoButton.addEventListener('focus', (e) => {
            e.target.addEventListener('keydown', function (event) {
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

        novoImg.addEventListener('load', () => {
            let i = 0
            while (i < 100 && checkHitbox(novoImg)) {
                novoImg.parentElement.style.left = `${Math.floor(Math.random() * 90)}%`;
                novoImg.parentElement.style.top = `${Math.floor(Math.random() * 90)}%`;
                i++

            }
            novoImg.style.opacity = "1"
        })

        atlas.appendChild(novoButton);
    }

    document.addEventListener('mousedown', function (e) {
        e.target.tagName === 'IMG' ? e.preventDefault() : null    
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
};

export async function populateCatalogo() {
    const response = await fetch("felps.json");
    const felpsInfo = await response.json();

    for (const felps of felpsInfo) {

        const catalogo = document.querySelector("#areaCatalogo");
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

    let dataAtual = gerarDataAtual()

    if (felpsInfo[felpsId].data.substring(0, 5) == dataAtual) {
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

export function gerarDataAtual() {
    let dataAtual, dia, mes;

    dia = new Date().getDate();
    String(dia).length == 1 ? dia = "0" + dia : null;
    mes = new Date().getMonth() + 1;
    String(mes).length == 1 ? mes = "0" + mes : null;
    dataAtual = `${dia}/${mes}`;
    return dataAtual;
};

export function checkHitbox(felps) {
    const hitboxes = document.querySelectorAll("div.hitbox");
    const felpsLimites = felps.getBoundingClientRect();

    for (const box of hitboxes) {
        const hitboxLimites = box.getBoundingClientRect();
        if (!(felpsLimites.top > hitboxLimites.bottom || felpsLimites.right < hitboxLimites.left || felpsLimites.bottom < hitboxLimites.top || felpsLimites.left > hitboxLimites.right)) {
            return true
        };
    }
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
};

export function randomizarPosicoes() {
    let felps = document.querySelectorAll(".felps");

    felps.forEach(element => {
        element.style.left = `${Math.floor(Math.random() * 90)}%`;
        element.style.top = `${Math.floor(Math.random() * 90)}%`;
        let i = 0
        while (i < 100 && checkHitbox(element)) {
            element.style.left = `${Math.floor(Math.random() * 90)}%`;
            element.style.top = `${Math.floor(Math.random() * 90)}%`;
            i++
        }
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
};

export function easterEgg() {
    let novoImg = document.createElement("img");
    const atlas = document.querySelector("#divAtlas");

    novoImg.src = "../FelpsTodoDiaAtlas/Recursos/emoteCarinha.png";
    novoImg.classList = "carinha";
    novoImg.style.left = `${Math.floor(Math.random() * 100)}%`;
    novoImg.style.top = `-${Math.floor(Math.random() * 90) + 10}%`;
    novoImg.style.transform = `rotate(${Math.floor(Math.random() * 720) - 360}deg)`
    atlas.appendChild(novoImg)
};

// ====================== Ache O Felps ======================

export async function escolherFelpsAlvo(modo, ano) {
    const response = await fetch("felps.json");
    const felpsInfo = await response.json();
    let match = null;
    quantFelps = felpsInfo.length;
    felpsAlvo = null;

    switch (modo) {
        case "diario":
            ano == null ? ano = 22 : null;
            let dataAtual = `${gerarDataAtual()}/${ano}`;
            felpsAlvo = felpsInfo.find((felps) => felps.data === dataAtual);

            break;
        case "aleatorio":
            while (felpsAlvo == null) {
                match = felpsInfo[Math.floor(Math.random() * quantFelps - 1)];
                if (ano == null) {
                    felpsAlvo = match;
                } else {
                    match.data.substring(6, 8) == ano ? felpsAlvo = match : null
                }
                console.log(felpsAlvo)
            }
            break;
    }
    document.querySelector("#felpsAlvoNome").textContent = felpsAlvo.nome
    document.querySelector("#felpsAlvoImagem").src = `../FelpsTodoDiaAtlas/Imagens/${felpsAlvo.arquivo}.webp`
};

export function verificarFelpsAlvo(id) {
    id == felpsAlvo.id ? finalizarPartida() : console.log("não é esse");
};

export function controleTimer(start) {
    switch (start) {
        case true:
            let tempoInicial = new Date().getTime();
            let tempoAtual;

            timerId = setInterval(() => {
                tempoAtual = new Date().getTime();
                timer = tempoAtual - tempoInicial;
                timer = timer.toString();
                document.querySelector("#timer").textContent = `${Math.floor(timer / 1000)}.${timer.slice(-3, -1)}`;
            }, 10)
            break;
        case false:
            clearInterval(timerId);
        default:
            break;
    }
}

export function carregarPartida() {
    
    let queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    modo = params.get('modoDeJogo');
    ano = params.get('colecaoDeFelps')
    console.log(params.get('colecaoDeFelps'))
    resultadoModal.close();
    randomizarPosicoes();
    escolherFelpsAlvo(modo, ano);
    //carregar contagem aqui
    controleTimer(true)
}

export function finalizarPartida() {
    controleTimer(false);
    let timerResultado = timer;
    document.querySelector("#felpsHRes").src = `../FelpsTodoDiaAtlas/Imagens/${felpsAlvo.arquivo}HRes.webp`;
    document.querySelector("#nomeFelpsAlvoResultado").textContent = felpsAlvo.nome;
    document.querySelector("#timerResultado").textContent = `${Math.floor(timerResultado / 1000)}.${timerResultado.slice(-3, -1)}s`;
    resultadoModal.showModal();
}


