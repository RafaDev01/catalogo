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
        // A imagem carregou com sucesso, então a adicionamos à div
        let divBox = document.createElement("div");
        divBox.setAttribute("class", "box-img");

        let numeroDaArte = document.createElement("p");
        numeroDaArte.setAttribute("class", "numero-da-arte");
        numeroDaArte.textContent = `Numero da arte: ${i}`;

        div.appendChild(divBox);
        divBox.appendChild(numeroDaArte);
        divBox.appendChild(img);

        // Continue carregando a próxima imagem
        i++;

        // Verifica se a próxima imagem existe
        const proximaImagem = new Image();
        proximaImagem.src = link + i + ".webp";

        proximaImagem.onload = function () {
          // A próxima imagem existe, continue carregando
          carregarImagem(i);
        };

        proximaImagem.onerror = function () {
          // Todas as imagens foram carregadas, agora adicionamos o botão
          adicionarBotaoSelecionar();
        };
      };

      img.onerror = function () {
        // A imagem não carregou corretamente, então não fazemos nada
        body.appendChild(div);
      };
    }

    function adicionarBotaoSelecionar() {
      let buttonCarrinho = document.createElement("button");
      buttonCarrinho.setAttribute("class", "button-carrinho");
      buttonCarrinho.textContent = "Selecionar";

      // Adiciona o botão "Selecionar" a cada box-img
      div.querySelectorAll(".box-img").forEach((boxImg) => {
        boxImg.appendChild(buttonCarrinho.cloneNode(true));
      });

      // Adicione aqui a lógica para o que acontece quando o botão é selecionado
      div.addEventListener("click", (event) => {
        if (event.target.classList.contains("button-carrinho")) {
          console.log("Botão Selecionar clicado!");
          // Adicione a lógica desejada para quando o botão for clicado
        }
      });
    }

    // Inicie o processo de carregamento da primeira imagem
    carregarImagem(1);
  }
}

export default TemaSelecionado;