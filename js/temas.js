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
      temas.sort((a, b) => a.localeCompare(b));

      temas.forEach(tema => {
        let li = document.createElement("li");
        let a = document.createElement("a")
        a.setAttribute("href", "/pages/tema-selecionado.html")

        a.classList.add("tema");
        a.textContent = tema;
        li.appendChild(a)

        li.addEventListener("click", () => {
           localStorage.setItem("nomeDoTemaDaPagina", a.textContent)
        });

        ul.appendChild(li);
        
      });
    } else {
      console.log(`Categoria '${nomeCategoria}' não encontrada.`);
    }
  }
}

export default Temas;