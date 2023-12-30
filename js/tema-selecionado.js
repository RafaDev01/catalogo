import { adicionarItem, adicionarItemAoCarrinho } from "./carrinho.js"

class TemaSelecionado {
  static async criarImgs(link) {
    let div = document.createElement("div");
    div.setAttribute("class", "boxes");
    let body = document.body; // Personalize conforme necessário
    body.appendChild(div);

    async function carregarImagem(i) {
      let img = document.createElement("img");
      img.src = link + i + ".webp";

      img.onload = function () {
        let divBox = document.createElement("div");
        divBox.setAttribute("class", "box-img");

        let numeroDaArte = document.createElement("p");
        numeroDaArte.setAttribute("class", "numero-da-arte");
        numeroDaArte.textContent = `Numero da arte: ${i}`;

        div.appendChild(divBox);
        divBox.appendChild(numeroDaArte);
        divBox.appendChild(img);

        adicionarBotaoSelecionar(divBox);  // Adiciona botão "Selecionar" e ouvinte

        i++;

        const proximaImagem = new Image();
        proximaImagem.src = link + i + ".webp";

        proximaImagem.onload = function () {
          carregarImagem(i);
        };

        proximaImagem.onerror = function () {
          adicionarBotaoSelecionar();
        };
      };

      img.onerror = function () {
        body.appendChild(div);
      };
    }

    function adicionarBotaoSelecionar(divBox) {
      let buttonCarrinho = document.createElement("button");
      buttonCarrinho.setAttribute("class", "button-carrinho");
      buttonCarrinho.textContent = "Selecionar";
      divBox.appendChild(buttonCarrinho);

      buttonCarrinho.addEventListener("click", () => {
        criarBotoesDoCarrinho(divBox);
        buttonCarrinho.remove()
      });
    }

    function criarBotoesDoCarrinho(divBox) {
      let container = document.createElement("div");
      let p = document.createElement("p");
      let quantidade = document.createElement("p");
      let buttonMais = document.createElement("button");
      let buttonMenos = document.createElement("button");
      let botaoAdicionarAoCarrinho = document.createElement("button");

      container.classList.add("container-quant");
      p.classList.add("p-quantidade");
      quantidade.classList.add("quantidade");
      buttonMais.classList.add("btn-mais");
      buttonMenos.classList.add("btn-menos");
      botaoAdicionarAoCarrinho.classList.add("adicionar-ao-carrinho");

      p.textContent = "Quantidade: ";
      quantidade.textContent = 0;
      buttonMais.textContent = "+";
      buttonMenos.textContent = "-";
      botaoAdicionarAoCarrinho.textContent = "Adicionar ao carrinho";

      container.appendChild(p);
      container.appendChild(buttonMenos);
      container.appendChild(quantidade);
      container.appendChild(buttonMais);

      divBox.appendChild(container);
      divBox.appendChild(botaoAdicionarAoCarrinho);

      addQuant(buttonMais, quantidade);
      removerQuant(buttonMenos, quantidade);

      botaoAdicionarAoCarrinho.addEventListener("click", () => {
        if (quantidade.textContent > 0) {
          let categoria = localStorage.getItem("categoria");
          let numeroDaArte = parseInt(
            divBox.querySelector(".numero-da-arte").textContent.split(":")[1].trim()
          );
          let nomeDoTema = localStorage.getItem("nomeDoTemaDaPagina");

          adicionarItemAoCarrinho(categoria, nomeDoTema, numeroDaArte, parseInt(quantidade.textContent));

          adicionarItem(parseInt(quantidade.textContent));
          botaoAdicionarAoCarrinho.remove();
          buttonMais.remove();
          buttonMenos.remove();
          quantidade.remove();
          p.textContent = "Itens adicionados ao carrinho.";
        }
      });
    }

    function addQuant(botao, quantidade) {
      botao.addEventListener('click', () => {
        quantidade.textContent++
      });
    }

    function removerQuant(botao, quantidade) {
      botao.addEventListener('click', () => {
        if (quantidade.textContent == 0) {
          return;
        } else {
          quantidade.textContent--;
        }
      });
    }

    // Inicie o processo de carregamento da primeira imagem
    carregarImagem(1);
  }
}

export default TemaSelecionado;