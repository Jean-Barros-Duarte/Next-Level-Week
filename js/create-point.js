
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







/*========================================================== ITENS DE COLETA ==========================================================*/

//PEGAR TODOS OS ITENS

const itensToCollect = document.querySelectorAll(".itens-grid li");

for (const itens of itensToCollect) {
    itens.addEventListener("click", handleSelectedItem);
}




/*ATUALIZAR O CAMPO ESCONDIDO COM OS ITENS SELECIONADOS */
const collectedItens = document.querySelector("input[name=items]");

let selectedItens = [];

function handleSelectedItem(event) {
    /*add ou remover uma classe em js */
    const itemLI = event.target;
    itemLI.classList.toggle("selected");// toggle: faz tanto a funcao de add ou remover, a funcao dele server dizer se um item foi selecionado ou nao
    const itemId = itemLI.dataset.id;/*dataset.id: serve para pegar o data-id q esta no html*/
    //console.log();


    /*Verificar se existem itens selecionados, se sim, entao pegar os itens selecionados */
    const alreadySelected = selectedItens.findIndex(function (item) {
        //para cada item achado ele vai verificar se o item existe e se existir e for igual ao q foi selecionado ele vai guardar no array selectedItens
        const itemEcontrado = item == itemId;
        return itemEcontrado;
    });

    // console.log(alreadySelected); teste para ver se esta sendo selecionado

    /*Se já estiver selecionado */
    if (alreadySelected >= 0) {
        /*entao tire da selecão */

        const filteredItems = selectedItens.filter(function (item) {
            /*vai checar se o itens selecionados sao diferentes, caso ele forem iguais, entao tira ele do array */
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });

        // console.log(filteredItems);

        selectedItens = filteredItems;

    } else {
        /*SE NAO ESTIVER SELECIONADO, ENTAO ADICIONE NO ARRAY */
        selectedItens.push(itemId);
    }

    // console.log(selectedItens);


    /*ATUALIZAR O CAMPO ESCONDIDO COM OS ITENS SELECIONADOS */
    collectedItens.value = selectedItens;
}

