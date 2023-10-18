let numeroPagina = 1;

let body = document.querySelector('body') 
let paginaAtual = document.querySelector('.pagina-atual')
let categorias = document.querySelector(".categorias");
let navegacao = document.querySelector(".navegacao")

let linkImgs = "assets/img/categorias/"

let arrayCategorias = [
    { nome: "Filmes", tema: [""] },
    { nome: "Animes" , tema: ["Dragon Ball Z", "Naruto", "One Piece", "Attack on Titan"]},
    { nome: "Datas comemorativas", tema: ["Dia das maes", "Dia dos namorados", "Natal", "Pascoa","Dia dos pais", "Halloween"]},
    { nome: "Times", tema: ["Botafogo","Corinthians", "Cruzeiro", "Flamengo", "Fluminense", "Gremio", "Internacional", "Palmeiras", "Santos", "São Paulo", "Vasco"] },
    { nome: "Testando a vercel", tema: ["ok"]}
];

arrayCategorias.sort((a, b) => a.nome.localeCompare(b.nome));

function ordenarTemasAlfabeticamente(categoria) {
    if (Array.isArray(categoria.tema)) {
        categoria.tema.sort((a, b) => a.localeCompare(b));
    }
}

// Iterar sobre as categorias e organizar tanto as categorias quanto os temas em ordem alfabética
arrayCategorias.forEach(categoria => {
    ordenarTemasAlfabeticamente(categoria);
});

arrayCategorias.forEach(categoria => {
    criarCategoria(categoria.nome);
});

function criarCategoria(nomeCategoria) {
    let novaCategoria = document.createElement("li");
    novaCategoria.textContent = nomeCategoria;
    novaCategoria.classList.add("categoria")
    categorias.appendChild(novaCategoria);
}

let cadaCategoria = [...document.querySelectorAll(".categoria")]

cadaCategoria.forEach(categoria => {
    categoria.addEventListener("click", nome => {
        categorias.remove()
        paginaAtual.textContent = categoria.textContent
        linkImgs += categoria.textContent + "/"
        percorrerTemasPorNomeCategoria(categoria.textContent)
        numeroPagina++
        botoes()
    });
  });

  function percorrerTemasPorNomeCategoria(nomeCategoria) {
    const categoria = arrayCategorias.find(categoria => categoria.nome === nomeCategoria);
    const ul = document.createElement("ul")
    ul.classList.add("temas")
    body.appendChild(ul)

    if (categoria) {
      let temas = Array.isArray(categoria.tema) ? categoria.tema : [categoria.tema];
  
      temas.forEach(tema => {
        let li = document.createElement("li");
        li.classList.add("tema");
        li.textContent = tema;
        
        // Adicione o evento de clique a cada elemento de lista
        li.addEventListener("click", () => {
          // Ação a ser realizada quando um tema for clicado
          linkImgs += tema + "/"
          linkImgs += tema
          paginaAtual.textContent = tema
          ul.remove()    
          linkImgs = linkImgs.toLowerCase().replace(/\s/g, "")
          numeroPagina++
          botoes()
          criarImgs(linkImgs)
        });
        ul.appendChild(li);
      });
    } else {
      console.log(`Categoria '${nomeCategoria}' não encontrada.`);
    }
  }

  async function criarImgs(link) {
    let div = document.createElement("div");
    let i = 1;
    let body = document.body; // Personalize conforme necessário
    body.appendChild(div)
  
    async function carregarImagem() {
      let img = document.createElement("img");
      img.src = link + i + ".png";
  
      img.onload = function () {
        // A imagem carregou com sucesso, então a adicionamos à div
        div.appendChild(img);
  
        // Continue carregando a próxima imagem
        i++;
  
        // Verifica se a próxima imagem existe
        const proximaImagem = new Image();
        proximaImagem.src = link + i + ".png";
  
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