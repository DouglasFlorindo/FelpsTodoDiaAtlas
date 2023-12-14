let movendo = false;
let felpsDrag, felpsAtualId, quantFelps;
let felpsAlvo, timer, timerId, modo, ano, modoTimer, intervalConfeti;
const sfx = new Audio("../FelpsTodoDiaAtlas/Recursos/hitSFX.mp3");
sfx.volume = 0.5;
export let carregamentoCompleto = false;


export async function populateAtlas(containerID, isAtlas) {
    const response = await fetch("../FelpsTodoDiaAtlas/Recursos/felps.json");
    const felpsInfo = await response.json();
    quantFelps = felpsInfo.length;
    const atlas = document.querySelector(`#${containerID}`);
    let felpsCarregados = 0;
    carregamentoCompleto = false;

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
            novoImg.style.opacity = "1";
            felpsCarregados = felpsCarregados + 1;
            felpsCarregados == quantFelps ? carregamentoCompleto = true : null
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
    const response = await fetch("../FelpsTodoDiaAtlas/Recursos/felps.json");
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
        novoButton.style.filter = 'none';
        novoButton.addEventListener("click", () => mostrarInfo(felps.id));

        novoButton.appendChild(novoImg);
        catalogo.appendChild(novoButton);

    }
};

export async function mostrarInfo(felpsId) {
    const response = await fetch("../FelpsTodoDiaAtlas/Recursos/felps.json");
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
        let i = 0;
        while (i < 100 && checkHitbox(element)) {
            element.style.left = `${Math.floor(Math.random() * 90)}%`;
            element.style.top = `${Math.floor(Math.random() * 90)}%`;
            i++
        };
        element.style.filter = 'none';
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
    novoImg.addEventListener('load', () => {
        setTimeout(() => {
            novoImg.remove();
        }, 15000);
    })
    novoImg.style.left = `${Math.floor(Math.random() * 100)}%`;
    novoImg.style.top = `-${Math.floor(Math.random() * 90) + 10}%`;
    novoImg.style.transform = `rotate(${Math.floor(Math.random() * 720) - 360}deg)`
    atlas.appendChild(novoImg)
};

// ====================== Ache O Felps ======================

export function coletarConfigs() {
    let configs = new FormData(document.querySelector("#configsDeJogo"));
    for (const par of configs.entries()) {

        localStorage.setItem(par[0], par[1]);
    }
}

export async function escolherFelpsAlvo(modo, ano) {
    const response = await fetch("../FelpsTodoDiaAtlas/Recursos/felps.json");
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
            }
            break;
    }
    document.querySelector("#felpsAlvoNome").textContent = felpsAlvo.nome
    document.querySelector("#felpsAlvoImagem").src = `../FelpsTodoDiaAtlas/Imagens/${felpsAlvo.arquivo}HRes.webp`
};

export function verificarFelpsAlvo(id) {
    if (id == felpsAlvo.id) {
        finalizarPartida("vitoria")
    } else {
        let elemento = document.querySelector(`#b${id}`);
        elemento.style.animation = "none";
        elemento.offsetHeight;
        elemento.style.animation = "hit 0.1s ease-in-out"
        sfx.currentTime = 0;
        sfx.play(); 

    }
};

export function controleTimer(start, modoTimer) {
    switch (start) {
        case true:
            let tempoInicial = new Date().getTime();
            let tempoAtual, tempoRestante;

            switch (modoTimer) {
                case "cronometro":
                    timerId = setInterval(() => {
                        tempoAtual = new Date().getTime();
                        timer = tempoAtual - tempoInicial;
                        timer = timer.toString();
                        document.querySelector("#timer").textContent = `${Math.floor(timer / 1000)}.${timer.slice(-3, -1)}`;
                    }, 10)
                    break;
                case "temporizador":
                    timerId = setInterval(() => {
                        tempoAtual = new Date().getTime();
                        timer = tempoAtual - tempoInicial;
                        tempoRestante = 60000 - timer;
                        tempoRestante <= 0 ? finalizarPartida("derrota") : null
                        tempoRestante = tempoRestante.toString();
                        document.querySelector("#timer").textContent = `${Math.floor(tempoRestante / 1000)}.${tempoRestante.slice(-3, -1)}`;
                    }, 10)
                    break;
            }
            break;
        case false:
            clearInterval(timerId);
            break;
        default:
            break;
    }
}

export function carregarPartida() {
    modo = localStorage.getItem("modoDeJogo");
    modoTimer = localStorage.getItem("modoDeTimer");
    ano = localStorage.getItem("colecaoDeFelps");
    if (typeof intervalConfeti !== 'undefined') {
        clearInterval(intervalConfeti);
        document.querySelectorAll("img.confeti").forEach(element => {
            element.remove();
        });;
    }
    resultadoModal.close();
    randomizarPosicoes();
    escolherFelpsAlvo(modo, ano);
    document.querySelector("#sectionCarregando").style.display = "none";
    document.querySelector("#sectionContagem").style.display = "flex"
    contagem();
}

export function contagem() {
    let i = 3;
    let contador = document.querySelector("#contagem");
    let div = document.querySelector("#divContagem");
    div.style.animation = "contagem 1s cubic-bezier(0.65, 0, 0.35, 1)";
    contador.textContent = i;
    i = i - 1;
    let contagem = setInterval(() => {
        div.style.animation = "none";
        div.offsetHeight;
        div.style.animation = null;
        switch (i) {
            case 2:
                contador.textContent = i;
                div.style.animation = "contagem 1s cubic-bezier(0.65, 0, 0.35, 1)";
                i = i - 1;
                break;
            case 1:
                contador.textContent = i;
                div.style.animation = "contagem 1s cubic-bezier(0.65, 0, 0.35, 1)";
                i = i - 1;
                break;
            case 0:
                contador.textContent = "Vai!";
                div.style.animation = "contagem 1s cubic-bezier(0.65, 0, 0.35, 1)";
                i = i - 1;
                break;
            case -1:
                document.querySelector("#sectionContagem").style.display = "none";
                controleTimer(true, modoTimer);
                clearInterval(contagem);
                break;
        }
    }, 1000);
}

export function finalizarPartida(resultado) {
    switch (resultado) {
        case "derrota":
            controleTimer(false);
            document.querySelector("#derrotaModal").showModal();
            break;
        case "vitoria":
            controleTimer(false);
            let timerResultado = timer.toString();
            document.querySelector("#felpsHRes").src = `../FelpsTodoDiaAtlas/Imagens/${felpsAlvo.arquivo}HRes.webp`;
            document.querySelector("#nomeFelpsAlvoResultado").textContent = felpsAlvo.nome;
            document.querySelector("#timerResultado").textContent = `${Math.floor(timerResultado / 1000)}.${timerResultado.slice(-3, -1)}s`;
            resultadoModal.showModal();
            intervalConfeti = setInterval(confeti, 500);
            break;
    }

}

export function confeti() {
    let novoImg = document.createElement("img");

    novoImg.src = "../FelpsTodoDiaAtlas/Recursos/emoteCarinha.png";
    novoImg.classList = "confeti";
    novoImg.addEventListener('load', () => {
        setTimeout(() => {
            novoImg.remove();
        }, 15000);
    })
    novoImg.style.position = "fixed"
    novoImg.style.zIndex = "500"
    novoImg.style.height = "4rem"
    novoImg.style.width = "5rem"
    novoImg.style.left = `${Math.floor(Math.random() * 100)}%`;
    novoImg.style.top = `-${Math.floor(Math.random() * 20) + 10}%`;
    novoImg.style.transform = `rotate(${Math.floor(Math.random() * 720) - 360}deg)`;
    novoImg.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
    document.body.appendChild(novoImg);
};


