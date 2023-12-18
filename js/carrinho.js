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
function adicionarItem() {
    let quantItens = obterQuantidadeItens() + 1;
    atualizarQuantidadeItens(quantItens);

    quantItemP.textContent = quantItens;
}

inicializarQuantidadeItens()

export { adicionarItem };