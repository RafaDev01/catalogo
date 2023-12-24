import Categoria from "./categorias.js";

let quantItemP = document.querySelector(".quant-itens-p");

function obterQuantidadeItens() {
    const quantItens = localStorage.getItem("quantItens");
    return quantItens ? parseInt(quantItens) : 0;
}

// Função para atualizar a quantidade de itens no localStorage
function atualizarQuantidadeItens(quantidade) {
    localStorage.setItem("quantItens", quantidade.toString());
}

// Função para inicializar a quantidade de itens no localStorage
function inicializarQuantidadeItens() {
    if (localStorage.getItem("quantItens") === null) {
        atualizarQuantidadeItens(0);
    }
}

// Função para adicionar um item e atualizar a quantidade no localStorage
function adicionarItem(quantidade) {
    let quantItens = obterQuantidadeItens() + quantidade;
    atualizarQuantidadeItens(quantItens);

    quantItemP.textContent = quantItens;
}

function adicionarItemAoCarrinho(nomeCategoria, nomeItem, numeroItem, quantidade) {
    // Verifica se já existe algum item no carrinho
    let carrinhoItens = JSON.parse(localStorage.getItem("carrinhoItens")) || [];

    // Adiciona o novo item ao carrinho
    carrinhoItens.push({
        categoria: nomeCategoria,
        nome: nomeItem,
        numeroArte: numeroItem,
        quantidade: quantidade
    });

    // Atualiza o carrinho no localStorage
    localStorage.setItem("carrinhoItens", JSON.stringify(carrinhoItens));
}

function limparCarrinho() {
        const carrinhoVazio = [];
        localStorage.setItem("quantItens", 0)
    
        // Atualiza o carrinho no localStorage
        localStorage.setItem("carrinhoItens", JSON.stringify(carrinhoVazio));
        
}

function visualizarCarrinho(arrayDeItens) {
    // Verifica se arrayDeItens é uma string JSON e converte para array de objetos
    if (typeof arrayDeItens === 'string') {
        try {
            arrayDeItens = JSON.parse(arrayDeItens);
        } catch (error) {
            console.error("Erro ao fazer o parse da string JSON:", error);
            return;
        }
    }

    // Verifica se arrayDeItens é um array
    if (Array.isArray(arrayDeItens)) {
        arrayDeItens.forEach(element => {
            gerarItensDoCarrinho(element)
        });
    } else {
        console.error("O parâmetro arrayDeItens não é um array.");
    }
}

function gerarItensDoCarrinho(argArray){
    let containerCarrinho = document.querySelector(".container-carrinho") 
    let li = document.createElement("li")
    let div = document.createElement("div")
    let ul = document.createElement("ul")
    let liCategoira = document.createElement("li")
    let liNome = document.createElement("li")
    let liNumeroArte = document.createElement("li")
    let liQuantidade = document.createElement("li")

    liCategoira.textContent = argArray.categoria
    liNome.textContent = argArray.nome
    liNumeroArte.textContent = argArray.numeroArte
    liQuantidade.textContent = argArray.quantidade

    ul.appendChild(liCategoira)
    ul.appendChild(liNome)
    ul.appendChild(liNumeroArte)
    ul.appendChild(liQuantidade)


    console.log(argArray)

    div.appendChild(ul)

    li.appendChild(div)
    containerCarrinho.appendChild(li)

}

inicializarQuantidadeItens()

export { adicionarItem, adicionarItemAoCarrinho, limparCarrinho, visualizarCarrinho };