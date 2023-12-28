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

function gerarItensDoCarrinho(argArray) {
    let containerCarrinho = document.querySelector(".container-carrinho");
    let li = document.createElement("li");
    let div = document.createElement("div");
    let ul = document.createElement("ul");
    let liCategoira = document.createElement("li");
    let liNome = document.createElement("li");
    let liNumeroArte = document.createElement("li");
    let liQuantidade = document.createElement("li");
    let btnApagar = document.createElement("button");

    div.setAttribute("class", "box-item-carrinho")
    btnApagar.setAttribute("class", "apagar-item");
    liCategoira.textContent = "Categoria: " + argArray.categoria;
    liNome.textContent = "Nome: " + argArray.nome;
    liNumeroArte.textContent = "Numero da arte: " + argArray.numeroArte;
    liQuantidade.innerHTML = `QUANTIDADE: 
    <b>${argArray.quantidade}</b>`;

    ul.appendChild(liCategoira);
    ul.appendChild(liNome);
    ul.appendChild(liNumeroArte);
    ul.appendChild(liQuantidade);

    div.appendChild(ul);
    div.appendChild(btnApagar);

    li.appendChild(div);
    containerCarrinho.appendChild(li);

    // Adiciona o evento de clique diretamente no botão
    btnApagar.addEventListener("click", () => {
        // Obtém o array de itens do localStorage
        let arrayDeItens = JSON.parse(localStorage.getItem("carrinhoItens")) || [];

        // Remove o item do array
        const indice = containerCarrinho.children.length - 1;
        if (indice >= 0 && indice < arrayDeItens.length) {
            arrayDeItens.splice(indice, 1);

            // Atualiza o localStorage com o novo array
            localStorage.setItem("carrinhoItens", JSON.stringify(arrayDeItens));

            // Remove o elemento do DOM
            li.remove();

            console.log(localStorage.getItem("carrinhoItens"));
        }
    });
}

function apagarItem() {
    let botaoApagar = [...document.querySelectorAll(".apagar-item")];

    botaoApagar.forEach((element) => {
        element.addEventListener("click", () => {
            // Obtém o índice do item a ser removido
            const indice = parseInt(element.dataset.index, 10);

            // Obtém o array de itens do localStorage
            let arrayDeItens = JSON.parse(localStorage.getItem("carrinhoItens")) || [];

            // Remove o item do array
            if (!isNaN(indice) && indice >= 0 && indice < arrayDeItens.length) {
                // Guarda o item removido para criar a mensagem depois
                const itemRemovido = arrayDeItens[indice];

                // Atualiza o localStorage com o novo array
                arrayDeItens.splice(indice, 1);
                localStorage.setItem("carrinhoItens", JSON.stringify(arrayDeItens));

                // Remove o elemento do DOM
                element.parentElement.remove();

                // Cria e envia a mensagem no WhatsApp com os itens restantes
                enviarMensagemNoWhatsApp(arrayDeItens);

                console.log(localStorage.getItem("carrinhoItens"));
            }
        });
    });
}

function enviarMensagemNoWhatsApp(itens) {
    // Crie a mensagem com base nos itens
    let mensagem = "Itens no carrinho:\n";

    itens.forEach((item) => {
        mensagem += `Categoria: ${item.categoria}\nNumero da Arte: ${item.numeroArte}\nNome: ${item.nome}\n\nQUANTIDADE: ${item.quantidade}*\n----------------------------\n`;
    });

    // Substitua este link pela API do WhatsApp ou pela lógica específica do seu aplicativo
    const linkWhatsApp = `https://wa.me/+5511970652887?text=${encodeURIComponent(mensagem)}`;
    
    // Abre uma nova janela ou guia com o link do WhatsApp
    window.open(linkWhatsApp, '_blank');
}

inicializarQuantidadeItens()

export { adicionarItem, adicionarItemAoCarrinho, limparCarrinho, visualizarCarrinho, enviarMensagemNoWhatsApp };