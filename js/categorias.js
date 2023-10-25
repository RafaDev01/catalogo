class Categoria {

    static arrayCategorias = [
        { nome: "Animes" , tema: ["Dragon Ball Z", "Naruto", "One Piece", "Attack on Titan"]},
        { nome: "Nao tem nada aqui é so teste" , tema: ["xamppp", "Naruto", "One Piece", "Attack on Titan"]},
        { nome: "Datas comemorativas", tema: ["Dia das maes", "Dia dos namorados", "Natal", "Páscoa","Dia dos pais", "Halloween"]},
        {nome: "Desenhos", tema: ["Barbie" , "Bojack Horseman", "Futurama", "Lilo e Stitch", "Ateste", "Mario", "Meninas Super Poderosas", "Mickey", "Minions", "Princesas", "Rick and Morty", "Simpsons", "South Park", "Timão e Pumba", "Turma da Mônica"]},
        { nome: "Times", tema: ["Botafogo","Corinthians", "Cruzeiro", "Flamengo", "Fluminense", "Gremio", "Internacional", "Palmeiras", "Santos", "São Paulo", "Vasco"] },
    ]; 

  static categorias = document.querySelector(".categorias");

  static organizarCategoriasTemas() {
    // Verifique se ArrayCategoriasTemas.arrayCategorias é uma matriz
    if (Array.isArray(Categoria.arrayCategorias)) {
      // Ordenar as categorias em ordem alfabética
      Categoria.arrayCategorias.sort((a, b) => a.nome.localeCompare(b.nome));

      // Iterar sobre as categorias e temas
      Categoria.arrayCategorias.forEach(categoria => {
        // Verifique se categoria.tema é uma matriz
        if (Array.isArray(categoria.tema)) {
          // Ordene os temas alfabeticamente
          categoria.tema.sort((a, b) => a.localeCompare(b));
        }
      });

      // Agora você pode criar categorias
      Categoria.arrayCategorias.forEach(categoria => {
        this.criarCategoria(categoria.nome);
      });
    }
  }

  static criarCategoria(nomeCategoria) {
    // Implemente a lógica para criar categorias aqui
    let novaCategoria = document.createElement("li");
    let aNavegacao = document.createElement("a");

    aNavegacao.textContent = nomeCategoria;
    aNavegacao.classList.add("categoria");
    aNavegacao.setAttribute("href", "/pages/temas.html")

    novaCategoria.appendChild(aNavegacao);
    this.categorias.appendChild(novaCategoria);
  }

  static cadaCategoria = [...document.querySelectorAll(".categoria")]
}

export default Categoria;