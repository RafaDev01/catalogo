let numeroPagina = 1;

let navegacao = document.querySelector(".navegacao")
  
  

 

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










 