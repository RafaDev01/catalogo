import { arrayCategorias, categorias, paginaAtual, linkImgs  } from "./categorias.js";

export let cadaCategoria = [...document.querySelectorAll(".categoria")]

let body = document.querySelector('body') 

function removerAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

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

export const criarTemas = function percorrerTemasPorNomeCategoria(nomeCategoria) {
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
          linkImgs = removerAcentos(linkImgs)
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

  console.log(cadaCategoria)

  export default criarTemas;