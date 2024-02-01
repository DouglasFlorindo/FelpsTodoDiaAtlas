let movendo = false;
let felpsInfo = [];
let felpsDrag, felpsAtualId, quantFelps;
let felpsAlvo, timer, timerId, modo, ano, modoTimer, intervalConfeti, timerMaratonaTotal = 0, itensFelpsMaratona = [], quantFelpsMaratona = 0, novaMaratona = true, pausaMaratona = 0, tempoAntes = 0;
export const hitSFX = new Audio("../FelpsTodoDiaAtlas/Recursos/hitSFX.mp3");
hitSFX.volume = 0;
export const metronomoSFX = new Audio("../FelpsTodoDiaAtlas/Recursos/metronomoSFX.mp3");
metronomoSFX.volume = 0;
export const metronomoHighSFX = new Audio("../FelpsTodoDiaAtlas/Recursos/metronomoHighSFX.mp3");
metronomoHighSFX.volume = 0;
export let carregamentoCompleto = false;
export let temaCor;

export async function populateAtlas(containerID, isAtlas) {
    if (felpsInfo.length == 0) {
        const response = await fetch("../FelpsTodoDiaAtlas/Recursos/felps.json");
        felpsInfo = await response.json();
        quantFelps = felpsInfo.length;
    } const atlas = document.querySelector(`#${containerID}`);
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

                felpsDrag.style.cursor = "pointer";
            }
        });

        novoButton.addEventListener('touchstart', function (e) {
            felpsDrag = this;
        });
        novoButton.addEventListener('touchend', function () {
            if (movendo == true) {
                setTimeout(() => {
                    movendo = false
                }, 250);
            }
        });

        novoButton.addEventListener('focus', (e) => {
            e.target.addEventListener('keydown', function (event) {
                switch (event.key) {
                    case "ArrowUp":
                        this.style.top = `calc(${this.style.top} - 1%)`;
                        break;
                    case "ArrowDown":
                        this.style.top = `calc(${this.style.top} + 1%)`;
                        break;
                    case "ArrowLeft":
                        this.style.left = `calc(${this.style.left} - 1%)`;
                        break;
                    case "ArrowRight":
                        this.style.left = `calc(${this.style.left} + 1%)`;
                        break;
                    default:
                        break;
                }
            })
        })

        novoImg.addEventListener('load', () => {
            let i = 0;
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

            felpsDrag.style.left = `calc(${x}% - ${felpsDrag.clientWidth / 2}px)`;
            felpsDrag.style.top = `calc(${y}% - ${felpsDrag.clientHeight / 2}px)`;
            felpsDrag.style.cursor = "move"

            movendo = true
        }
    })

    document.addEventListener('touchend', () => felpsDrag = null);
    document.addEventListener('touchmove', (e) => {
        if (felpsDrag != null) {
            let clientX = e.touches[0].clientX / document.body.clientWidth * 100;
            let clientY = e.touches[0].clientY / document.body.clientHeight * 100;

            felpsDrag.style.left = `calc(${clientX}% - ${felpsDrag.clientWidth / 2}px)`;
            felpsDrag.style.top = `calc(${clientY}% - ${felpsDrag.clientHeight / 2}px)`;

            movendo = true;
        }
    })
};

export async function populateCatalogo() {
    if (felpsInfo.length == 0) {
        const response = await fetch("../FelpsTodoDiaAtlas/Recursos/felps.json");
        felpsInfo = await response.json();
        quantFelps = felpsInfo.length;
    }

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
    if (felpsInfo.length == 0) {
        const response = await fetch("../FelpsTodoDiaAtlas/Recursos/felps.json");
        felpsInfo = await response.json();
        quantFelps = felpsInfo.length;
    }
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

export async function populateMaratona(ano) {
    if (felpsInfo.length == 0) {
        const response = await fetch("../FelpsTodoDiaAtlas/Recursos/felps.json");
        felpsInfo = await response.json();
        quantFelps = felpsInfo.length;
    }

    switch (ano) {
        case "todos":
            for (const felps of felpsInfo) {
                itensFelpsMaratona.push(felps)
            }
            break;

        default:
            for (const felps of felpsInfo) {
                if (felps.data.substring(6, 8) == ano) {
                    itensFelpsMaratona.push(felps);
                }
            }
            break;
    }
}

export async function escolherFelpsAlvo(modo, ano) {
    if (felpsInfo.length == 0) {
        const response = await fetch("../FelpsTodoDiaAtlas/Recursos/felps.json");
        felpsInfo = await response.json();
        quantFelps = felpsInfo.length;
    }
    let match = null;
    felpsAlvo = null;

    switch (modo) {
        case "diario":
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
        case "maratona":
            felpsAlvo = itensFelpsMaratona[Math.floor(Math.random() * (itensFelpsMaratona.length - 1))];
            break;
    }
};

export function verificarFelpsAlvo(id) {
    if (id == felpsAlvo.id) {
        if (modo == "maratona") {
            finalizarPartida("vitoriaMaratona")
        } else {
            finalizarPartida("vitoria")
        };
    } else {
        let elemento = document.querySelector(`#b${id}`);
        elemento.style.animation = "none";
        elemento.offsetHeight;
        elemento.style.animation = "hit 0.1s ease-in-out"
        hitSFX.currentTime = 0;
        hitSFX.play();

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
                        if (tempoRestante <= 0) {
                            modo == "maratona" ? finalizarPartida("derrotaMaratona") : finalizarPartida("derrota")
                        }
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
    // ano = localStorage.getItem("colecaoDeFelps");
    ano = 22;
    if (typeof intervalConfeti !== 'undefined') {
        clearInterval(intervalConfeti);
        document.querySelectorAll("img.confeti").forEach(element => {
            element.remove();
        });;
    }
    resultadoModal.close();
    derrotaModal.close();
    document.querySelector("#derrotaMaratonaModal").close();
    document.querySelector("#finalMaratonaModal").close();

    if (modo == "maratona" && novaMaratona == true) {
        itensFelpsMaratona = [];
        populateMaratona(ano);
        for (const elemento of document.querySelectorAll(".felps")) {
            if (felpsInfo != []) {
                elemento.style.display = "unset";
            }
        };
        quantFelpsMaratona = 0;
        timerMaratonaTotal = 0;
        novaMaratona = false;
    };
    escolherFelpsAlvo(modo, ano);
    let esperarFelpsAlvo = setInterval(() => {
        if (felpsAlvo == null) {
            console.log("Ainda escolhendo Felps...")
        } else {
            clearInterval(esperarFelpsAlvo);
            document.querySelector("#felpsAlvoNome").textContent = felpsAlvo.nome
            document.querySelector("#felpsAlvoImagem").src = `../FelpsTodoDiaAtlas/Imagens/${felpsAlvo.arquivo}HRes.webp`
            document.querySelector("#sectionCarregando").style.display = "none";
            document.querySelector("#sectionContagem").style.display = "flex";
            randomizarPosicoes();
            contagem();
        }
    }, 100);
}

export function contagem() {
    let i = 3;
    const sectionContagem = document.querySelector("#sectionContagem");
    let contador = document.querySelector("#contagem");
    let div = document.querySelector("#divContagem");
    let imagem = document.querySelector("#exemploContagem")
    imagem.style.display = "none";
    div.style.animation = "contagem 1s cubic-bezier(0.65, 0, 0.35, 1)";
    sectionContagem.style.animation = "sombraInterna 0.5s linear";
    metronomoSFX.currentTime = 0;
    metronomoSFX.play();
    contador.textContent = i;
    i = i - 1;
    let contagem = setInterval(() => {
        div.style.animation = "none";
        sectionContagem.style.animation = "none";
        div.offsetHeight;
        div.style.animation = null;
        switch (i) {

            case 2:
                metronomoSFX.currentTime = 0;
                metronomoSFX.play();
                contador.textContent = i;
                sectionContagem.style.animation = "sombraInterna 0.5s linear";
                div.style.animation = "contagem 1s cubic-bezier(0.65, 0, 0.35, 1)";
                i = i - 1;
                break;
            case 1:
                metronomoSFX.currentTime = 0;
                metronomoSFX.play();
                contador.textContent = i;
                sectionContagem.style.animation = "sombraInterna 0.5s linear";
                div.style.animation = "contagem 1s cubic-bezier(0.65, 0, 0.35, 1)";
                i = i - 1;
                imagem.src = `../FelpsTodoDiaAtlas/Imagens/${felpsAlvo.arquivo}HRes.webp`
                break;
            case 0:
                metronomoHighSFX.currentTime = 0;
                metronomoHighSFX.play();
                contador.textContent = "Encontre:";
                imagem.style.display = "unset"
                i = i - 1;
                break;
            case -1:
                sectionContagem.style.display = "none";
                controleTimer(true, modoTimer);
                clearInterval(contagem);
                break;
        }
    }, 1000);
}

export function finalizarPartida(resultado) {
    let timerResultadoMaratona;
    switch (resultado) {
        case "derrota":
            controleTimer(false);
            document.querySelector("#felpsHResDerrota").src = `../FelpsTodoDiaAtlas/Imagens/${felpsAlvo.arquivo}HRes.webp`;
            resultadoModal.showModal();
            document.querySelector("#derrotaModal").showModal();
            break;
        case "derrotaMaratona":
            tempoAntes = 0;
            timerMaratonaTotal = timerMaratonaTotal + Number(timer);
            controleTimer(false);
            timerResultadoMaratona = timerMaratonaTotal.toString();
            document.querySelector("#quantFelpsEncontrados").textContent = `${quantFelpsMaratona} Felps`;
            document.querySelector("#timerResultadoMaratona").textContent = `${Math.floor(timerResultadoMaratona / 1000)}.${timerResultadoMaratona.slice(-3, -1)}s`;
            document.querySelector("#derrotaMaratonaModal").showModal();
            novaMaratona = true;
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
        case "vitoriaMaratona":
            tempoAntes += Number(timer);
            timerMaratonaTotal = timerMaratonaTotal + Number(timer);

            controleTimer(false);
            quantFelpsMaratona = quantFelpsMaratona + 1;
            itensFelpsMaratona.splice(itensFelpsMaratona.indexOf(felpsAlvo), 1);
            document.querySelector(`#b${felpsAlvo.id}`).style.display = "none";

            if (itensFelpsMaratona.length > 0) {
                if (pausaMaratona >= 9 || tempoAntes >= 300000) {
                    tempoAntes = 0;
                    pausaMaratona = 0;
                    document.querySelector("#felpsRestantes").textContent = `${itensFelpsMaratona.length} Felps`;
                    document.querySelector("#pausaMaratona").showModal();
                } else {
                    pausaMaratona = pausaMaratona + 1;
                    carregarPartida();
                };
            } else {
                finalizarPartida("finalMaratona");
            }
            break;
        case "finalMaratona":
            document.querySelector("#finalMaratonaModal").showModal();
            novaMaratona = true;
            intervalConfeti = setInterval(confeti, 500);
            timerResultadoMaratona = timerMaratonaTotal.toString();
            document.querySelector("#quantFelpsEncontradosFinal").textContent = `${quantFelpsMaratona} Felps`;
            document.querySelector("#timerResultadoMaratonaFinal").textContent = `${Math.floor(timerResultadoMaratona / 1000)}.${timerResultadoMaratona.slice(-3, -1)}s`;
            document.querySelector("#finalMaratonaModal").showModal();
            break;
        default:
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

export function compartilharResultado() {
    let timerResultado;
    let texto = `Achei `;
    switch (modo) {
        case "aleatorio":
            timerResultado = timer.toString();
            texto = texto + `"${felpsAlvo.nome}"`;
            break;
        case "diario":
            timerResultado = timer.toString();
            texto = texto + `o Felps do dia ${felpsAlvo.data}`
            break;
        case "maratona":
            timerResultado = timerMaratonaTotal.toString();
            texto = texto + `${quantFelpsMaratona} Felps`
        default:
            break;
    }
    texto = texto + ` em ${Math.floor(timerResultado / 1000)}.${timerResultado.slice(-3, -1)} segundos!`
    navigator.clipboard.writeText(texto);
}
