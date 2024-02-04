export function filtrarFelps(felpsInfo) {
    if (!felpsInfo || felpsInfo.length == 0) {
        return;
    }

    const input22 = document.querySelector("#inputFiltroFelps22") || null;
    const input23 = document.querySelector("#inputFiltroFelps23") || null;
    const input24 = document.querySelector("#inputFiltroFelps24") || null;

    if (input22.checked) {
        filtrarPorAno(felpsInfo, 22);
    } else if (input23.checked) {
        filtrarPorAno(felpsInfo, 23);
    } else if (input24.checked) {
        filtrarPorAno(felpsInfo, 24);
    } else {return;};
}

function filtrarPorAno(objetos, ano) {
    for (const felps of objetos) {
        const elemento = document.querySelector(`#b${felps.id}`);
        const classes = elemento.classList;
        if (felps.data.substring(6, 8) == ano) { 
            classes.remove("filtrado");
        } else { 
            classes.contains("filtrado")?null:classes.add("filtrado");
        }
    }
}