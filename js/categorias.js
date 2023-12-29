class Categoria {
  static arrayCategorias = [
    { nome: "Animes", tema: ["Dragon Ball Z", "Naruto", "One Piece", "Attack on Titan"] },
    { nome: "Memes", tema: ["Flork"] },
    { nome: "Marvel", tema: ["Diversos", "Homem Aranha", "Homem de Ferro"] },
    { nome: "Jogos", tema: ["Free Fire"] },
    { nome: "DC", tema: ["Arlequina", "Coringa", "Flash", "Jovens Titans", "Lanterna Verde", "Diversos"] },
    { nome: "Datas comemorativas", tema: ["Dia das maes", "Dia dos namorados", "Natal", "Páscoa", "Dia dos pais", "Halloween"] },
    { nome: "Desenhos", tema: ["Barbie", "Bojack Horseman", "Futurama", "Lilo e Stitch", "Ateste", "Mario", "Meninas Super Poderosas", "Mickey", "Minions", "Princesas", "Rick and Morty", "Simpsons", "South Park", "Timão e Pumba", "Turma da Mônica"] },
    { nome: "Times", tema: ["Botafogo", "Corinthians", "Cruzeiro", "Flamengo", "Fluminense", "Gremio", "Internacional", "Palmeiras", "Santos", "São Paulo", "Vasco"] }
  ];

  static categoriasContainer = document.querySelector(".categorias");
  static categoriaLinks = [];

  static organizarCategoriasTemas() {
    if (Array.isArray(Categoria.arrayCategorias)) {
      Categoria.arrayCategorias.forEach(categoria => {
        categoria.tema && categoria.tema.sort((a, b) => a.localeCompare(b));
      });

      Categoria.arrayCategorias.sort((a, b) => a.nome.localeCompare(b.nome));

      Categoria.arrayCategorias.forEach(categoria => {
        this.criarCategoria(categoria.nome);
      });
    }
  }

  static criarCategoria(nomeCategoria) {
    let novaCategoria = document.createElement("li");
    let aNavegacao = document.createElement("a");

    aNavegacao.textContent = nomeCategoria;
    aNavegacao.classList.add("categoria");
    aNavegacao.setAttribute("href", "/pages/temas.html");

    novaCategoria.appendChild(aNavegacao);
    this.categoriasContainer.appendChild(novaCategoria);
    this.categoriaLinks.push(aNavegacao);
  }
}

export default Categoria;