let numeroPagina = 1;

let navegacao = document.querySelector(".navegacao")
  
  async function criarImgs(link) {
    let div = document.createElement("div");
    let i = 1;
    let body = document.body; // Personalize conforme necessário
    body.appendChild(div)
  
    async function carregarImagem() {
      let img = document.createElement("img");
      img.src = link + i + ".webp";
  
      img.onload = function () {
        // A imagem carregou com sucesso, então a adicionamos à div
        div.appendChild(img);
  
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
  
  criarImgs(linkImgs);

 

  function botoes()
  {
    if(numeroPagina == 2){
      criarBotoes()
    }

    if(numeroPagina != 1){
      let botaoPaginaInicial = document.querySelector('.botao-pagina-inicial')
      botaoPaginaInicial.addEventListener("click",()=>{
        location. reload()
      })
    }
  }

function criarBotoes()
{
  let divBotoes = document.createElement("div")
  divBotoes.classList.add("div-botoes")

  let botaoPaginaInicial = document.createElement("button")

  botaoPaginaInicial.textContent = "páginaInicial"
  botaoPaginaInicial.classList.add("botao-pagina-inicial")

  divBotoes.appendChild(botaoPaginaInicial)

  navegacao.appendChild(divBotoes)
}

//categorias

let linkImgs = "link"
let paginaAtual = document.querySelector(".pagina-atual-2")










 