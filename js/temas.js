import Categoria from "./categorias.js";

class Temas {
  static temas = Categoria.cadaCategoria;

  static adicionarEventos() {
    // Use forEach para adicionar eventos a cada tema
    this.temas.forEach(categoria => {
      categoria.addEventListener("click", () => {        
        this.percorrerTemasPorNomeCategoria(categoria.textContent);
      });
    });
  }

  static percorrerTemasPorNomeCategoria(nomeCategoria) {
    const categoria = Categoria.arrayCategorias.find(categoria => categoria.nome === nomeCategoria);

    if (categoria) {
      const ul = document.createElement("ul");
      ul.classList.add("temas");
      document.body.appendChild(ul);

      let temas = Array.isArray(categoria.tema) ? categoria.tema : [categoria.tema];

      temas.forEach(tema => {
        let li = document.createElement("li");
        li.classList.add("tema");
        li.textContent = tema;

        li.addEventListener("click", () => {
          // Ação a ser realizada quando um tema for clicado
          linkImgs = removerAcentos(linkImgs);
          linkImgs = linkImgs.toLowerCase().replace(/\s/g, "");
          numeroPagina++;
          criarImgs(linkImgs);
        });

        ul.appendChild(li);
      });
    } else {
      console.log(`Categoria '${nomeCategoria}' não encontrada.`);
    }
  }
}

export default Temas;