import Categoria from "./categorias.js";

class Temas {
  //static temas = Categoria.cadaCategoria;

  static percorrerTemasPorNomeCategoria(nomeCategoria) {
    const categoria = Categoria.arrayCategorias.find(categoria => categoria.nome === nomeCategoria);

    if (categoria) {
      const ul = document.createElement("ul");
      ul.classList.add("temas");
      document.body.appendChild(ul);

      let temas = Array.isArray(categoria.tema) ? categoria.tema : [categoria.tema];

      temas.forEach(tema => {
        let li = document.createElement("li");
        let a = document.createElement("a")
        a.setAttribute("href", "/pages/tema-selecionado.html")

        a.classList.add("tema");
        a.textContent = tema;
        li.appendChild(a)

        li.addEventListener("click", () => {
          // Ação a ser realizada quando um tema for clicado
          //linkImgs = linkImgs.toLowerCase().replace(/\s/g, "");
        });

        ul.appendChild(li);
        
      });
    } else {
      console.log(`Categoria '${nomeCategoria}' não encontrada.`);
    }
  }
}

export default Temas;