let felpsAlvo, felpsDrag;
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
        novoImg.addEventListener('click', () => check(`f${felps.id}`));
        novoImg.addEventListener('mousedown', function () {
            felpsDrag = this;
        });
        novoImg.addEventListener('mouseup', function () {
            if (movendo == true) {
                setTimeout(() => {
                    movendo = false
                }, 250);
                felpsDrag.style.transform = "translate(0, 0)";
                document.querySelector(".movendo").style.filter = "none";
                felpsDrag.classList.remove("movendo");
            }
        });
        novoImg.style.left = `${Math.floor(Math.random() * (90 - 20 + 1)) + 10}%`;
        novoImg.style.top = `${Math.floor(Math.random() * (70 - 20 + 1)) + 20}%`;

        document.querySelector("#telaJogo").appendChild(novoImg);
    }
};

populateAtlas();

// function alterarEscala(x) {

//     let root = document.documentElement;
//     let tamanhoEscala = parseFloat(getComputedStyle(root).getPropertyValue("--escalaFelps"));

//     switch (x) {
//         case true:
//             root.style.setProperty("--escalaFelps", `${tamanhoEscala + 0.1}`)
//             break
//         case false:
//             tamanhoEscala > 0.2 ? root.style.setProperty("--escalaFelps", `${tamanhoEscala - 0.1}`) : null
//             break
//     }
// };

document.addEventListener('mousedown', function (e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
document.addEventListener('mouseup', () => felpsDrag = null);
document.addEventListener('mousemove', function (e) {
    if (felpsDrag != null) {
        felpsDrag.classList.add("movendo")
        felpsDrag.style.transform = "translate(-50%, -50%)"
        document.querySelector(".movendo").style.filter = `drop-shadow(${felpsDrag.clientWidth / 2}px ${felpsDrag.clientHeight / 2}px rgba(160, 34, 59, 0.5))`;
        let x = e.pageX / document.body.clientWidth * 100;
        let y = e.pageY / document.body.clientHeight * 100;

        felpsDrag.style.left = x + "%";
        felpsDrag.style.top = y + "%";
        movendo = true
    }
})

felpsAlvo = "f0"

function check(id) {
    if (movendo == false && felpsAlvo) {
        switch (id == felpsAlvo) {
            case true:
                console.log("é esse!!!")
                break
            case false:
                console.log("não é esse")
                break
        }
    }
}