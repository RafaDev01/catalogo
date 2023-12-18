class TemaSelecionado{
    static async criarImgs(link) {
        let div = document.createElement("div");
        div.setAttribute("class", "boxes")
        let i = 1;
        let body = document.body; // Personalize conforme necessário
        body.appendChild(div)
      
        async function carregarImagem() {
          let img = document.createElement("img");
          img.src = link + i + ".webp";

          img.onload = function () {
            // A imagem carregou com sucesso, então a adicionamos à div
            let divBox = document.createElement("div");
            divBox.setAttribute("class", "box-img")

            let buttonCarrinho = document.createElement("button");
            buttonCarrinho.setAttribute("class", "button-carrinho")
            buttonCarrinho.textContent = "Adicionar ao carrinho"

            div.appendChild(divBox);
            divBox.appendChild(img);
            divBox.appendChild(buttonCarrinho)
      
            // Continue carregando a próxima imagem
            i++;
      
            // Verifica se a próxima imagem existe
            const proximaImagem = new Image();
            proximaImagem.src = link + i + ".webp";
      
            proximaImagem.onload = function () {
              // A próxima imagem existe, continue carregando
              carregarImagem();
            };
      
            proximaImagem.onerror = function () {
              console.log("Imgs carregadas com sucesso")
            };
          };
      
          img.onerror = function () {
            // A imagem não carregou corretamente, então não fazemos nada
            body.appendChild(div);
          };
        }
        carregarImagem(); // Inicie o processo de carregamento da primeira imagem
      }
}

export default TemaSelecionado