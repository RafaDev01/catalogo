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
        numeroDaArte.setAttribute("class", "numero-da-arte")
        numeroDaArte.textContent =  `Numero da arte: ${i}`;

        let buttonCarrinho = document.createElement("button");
        buttonCarrinho.setAttribute("class", "button-carrinho");
        buttonCarrinho.textContent = "Selecionar";

        div.appendChild(divBox);
        divBox.appendChild(numeroDaArte);
        divBox.appendChild(img);
        divBox.appendChild(buttonCarrinho);

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
          console.log("Imgs carregadas com sucesso");
        };
      };

      img.onerror = function () {
        // A imagem não carregou corretamente, então não fazemos nada
        body.appendChild(div);
      };
    }

    // Inicie o processo de carregamento da primeira imagem
    carregarImagem(1);
  }
}

export default TemaSelecionado;