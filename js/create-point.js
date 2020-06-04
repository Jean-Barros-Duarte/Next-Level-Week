
function buscarEstados(ufSelect) {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then((res) => {
        return res.json();
    }).then((states) => {

        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    });
}



function ufsPopulares() {
    const ufSelect = document.querySelector("select[name=UF]");
    buscarEstados(ufSelect);

}
ufsPopulares();







function buscarCidades(citySelect) {
    const ufValue = event.target.value;
    const stateInput = document.querySelector("[name=state]");
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"; //limpando o campo, para q possa ser atualizado
    citySelect.disabled = true;

    fetch(url).then((res) => {
        return res.json();
    }).then((cities) => {

        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }
        citySelect.disabled = false;//DESABILITA O CAMPO DE CIDADE
    });
}

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    buscarCidades(citySelect);
}

document.querySelector("select[name=UF]").addEventListener("change", getCities);
