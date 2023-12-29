import Categoria from "./categorias.js";

const quantItemP = document.querySelector(".quant-itens-p");

function obterQuantidadeItens() {
    const quantItens = localStorage.getItem("quantItens");
    return quantItens ? parseInt(quantItens) : 0;
}

function atualizarQuantidadeItens(quantidade) {
    localStorage.setItem("quantItens", quantidade.toString());
}

function inicializarQuantidadeItens() {
    if (localStorage.getItem("quantItens") === null) {
        atualizarQuantidadeItens(0);
    }
}

function adicionarItem(quantidade) {
    const quantItens = obterQuantidadeItens() + quantidade;
    atualizarQuantidadeItens(quantItens);
    quantItemP.textContent = quantItens;
}

function adicionarItemAoCarrinho(nomeCategoria, nomeItem, numeroItem, quantidade) {
    const carrinhoItens = JSON.parse(localStorage.getItem("carrinhoItens")) || [];
    carrinhoItens.push({ categoria: nomeCategoria, nome: nomeItem, numeroArte: numeroItem, quantidade });
    localStorage.setItem("carrinhoItens", JSON.stringify(carrinhoItens));
}

function limparCarrinho() {
    localStorage.setItem("quantItens", "0");
    localStorage.setItem("carrinhoItens", JSON.stringify([]));
}

function visualizarCarrinho(arrayDeItens) {
    if (typeof arrayDeItens === 'string') {
        try {
            arrayDeItens = JSON.parse(arrayDeItens);
        } catch (error) {
            console.error("Erro ao fazer o parse da string JSON:", error);
            return;
        }
    }

    if (Array.isArray(arrayDeItens)) {
        arrayDeItens.forEach(gerarItensDoCarrinho);
    } else {
        console.error("O parâmetro arrayDeItens não é um array.");
    }
}

function gerarItensDoCarrinho(argArray) {
    const containerCarrinho = document.querySelector(".container-carrinho");
    const li = document.createElement("li");
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    const btnApagar = document.createElement("button");

    const criarLI = (texto) => {
        const li = document.createElement("li");
        li.textContent = texto;
        return li;
    };

    div.classList.add("box-item-carrinho");
    btnApagar.classList.add("apagar-item");

    ul.appendChild(criarLI(`Categoria: ${argArray.categoria}`));
    ul.appendChild(criarLI(`Nome: ${argArray.nome}`));
    ul.appendChild(criarLI(`Numero da arte: ${argArray.numeroArte}`));
    ul.appendChild(criarLI(`QUANTIDADE: ${argArray.quantidade}`));

    div.appendChild(ul);
    div.appendChild(btnApagar);
    li.appendChild(div);
    containerCarrinho.appendChild(li);

    btnApagar.addEventListener("click", () => {
        const arrayDeItens = JSON.parse(localStorage.getItem("carrinhoItens")) || [];
        const indice = containerCarrinho.children.length - 1;

        if (indice >= 0 && indice < arrayDeItens.length) {
            arrayDeItens.splice(indice, 1);
            localStorage.setItem("carrinhoItens", JSON.stringify(arrayDeItens));
            li.remove();
        }
    });
}

function apagarItem() {
    const botaoApagar = [...document.querySelectorAll(".apagar-item")];

    botaoApagar.forEach((element) => {
        element.addEventListener("click", () => {
            const indice = parseInt(element.dataset.index, 10);
            const arrayDeItens = JSON.parse(localStorage.getItem("carrinhoItens")) || [];

            if (!isNaN(indice) && indice >= 0 && indice < arrayDeItens.length) {
                const itemRemovido = arrayDeItens[indice];
                arrayDeItens.splice(indice, 1);
                localStorage.setItem("carrinhoItens", JSON.stringify(arrayDeItens));
                element.parentElement.remove();
                enviarMensagemNoWhatsApp(arrayDeItens);
            }
        });
    });
}

function enviarMensagemNoWhatsApp(itens) {
    let mensagem = "Itens no carrinho:\n";

    itens.forEach((item) => {
        mensagem += `Categoria: ${item.categoria}\nNumero da Arte: ${item.numeroArte}\nNome: ${item.nome}\n\nQUANTIDADE: ${item.quantidade}*\n----------------------------\n`;
    });
    const linkWhatsApp = `https://wa.me/+5511970652887?text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsApp, '_blank');
}

inicializarQuantidadeItens();

export {
    adicionarItem,
    adicionarItemAoCarrinho,
    limparCarrinho,
    visualizarCarrinho,
    enviarMensagemNoWhatsApp
};