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
    // Define o carrinho como um array vazio
    const carrinhoVazio = [];
    
    // Atualiza o carrinho no localStorage
    localStorage.setItem("carrinhoItens", JSON.stringify(carrinhoVazio));
}

inicializarQuantidadeItens()

export { adicionarItem, adicionarItemAoCarrinho, limparCarrinho };