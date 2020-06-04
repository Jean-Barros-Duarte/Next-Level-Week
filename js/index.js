
const buttonPtColeta = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");

/*QUANDO TIVER UM EVENTO DE CLICK FAÇA... */
buttonPtColeta.addEventListener("click", function () {
    /*Remova a classe hide do id modal */
    modal.classList.remove("hide")
});


close.addEventListener("click", function () {
    /*habilite a classe hide do id modal */
    modal.classList.add("hide");
});
