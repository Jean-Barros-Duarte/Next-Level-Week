const express = require("express");/* PEDINDO PARA PEGAR O EXPRESS NA PASTA NODE_MODULOS*/
const server = express();/*ESTA EXECUTANDO A FUNCAO NO SERVER, VAI SERVIR PARA LIGAR O SERVIDOR */




/*-----------------------------------------------------------------------------------------*/
//CONFIGURANDO O TEMPLATE ENGINE
//NUNJUCKS: permite q a gente possa manipular e renderizar o html com javascript
const nunjucks = require("nunjucks");
//configurando o pasta principal
nunjucks.configure("src/views", {//como aqui ja foi configurado os caminhos, entao pode deixar so "index.html" la no get
    express: server,
    noCache: true //CACHE: SALVA NA MEMORIA PARA DAR RELOAD MAIS RAPIDO! E NOCACHE cancela isso!
});





/*-----------------------------------------------------------------------------------------*/
//CONFIGURA A PASTA PUBLIC PARA QUE OS CSS, JS E IMGS POSSAM SER RECONHECIDOS NO SITE
//esta buscando todos os arquivos staticos da pasta public para colocar no site
//arquivos staticos sao: css, imgs e etc...
server.use(express.static("public"));




/*-----------------------------------------------------------------------------------------*/
//CONFIGURA A APRESENTAÇÃO DA PAGINA INICIAL OU CAMINHOS DA APLICAÇÃO
//METODO GET SERVE PARA EU PEDIR E ELE VAI ME DAR UMA RESPOSTA
server.get("/", function (require, response) {
    /*REQ: requesiçoes, ou seja, pedir algo ///// RES: reponder, ou seja, obter respostas*/
    // response.send("Cheguei nesta PORRA!");//retornando a res
    /*
       response.sendFile(__dirname + "/views/index.html");
       /*"__dirname": server para mostrar o caminho do diretorio do index.html, ou sej, 
           ele corresponde ao caminho home/jean/Downloads/nlw/src...*/

    return response.render("index.html");//vai renderizar a pagina pelo nunjucks
    /*{ title: "Um titulo!" }: para jogar dentro do render*/
});

server.get("/create-point", function (require, response) {
    return response.render("create-point.html");
    /*OBS.: Vai ate a pasta views e tire o ".html" das rotas para funcionar*/
});

server.get("/search-results", function (require, response) {
    return response.render("search-results.html");
});




/*-----------------------------------------------------------------------------------------*/
//CRIANDO/INICIALIZANDO O SERVIDOR E PERMITIR ACESSO NA PORTA http://127.0.0.1:3000
server.listen(3000);
/*OBS.: BAIXAR NODEMON (npm install nodemon - ctrl+r na pagina para att) PRA MONITORAR DE FORMA "AUTOMATICA" AS MUDANÇAS NO CODIGO*/

