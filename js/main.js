import Categoria from "./categorias.js";
import Temas from "./temas.js";

var url_atual = window.location.href;

if(url_atual.endsWith("/index.html")){
    console.log("Pagina inicial")
}else if(url_atual.endsWith("/categorias/categorias.html")){
    Categoria.organizarCategoriasTemas()
    let getCategorias = [...document.querySelectorAll(".categoria")]
    for (let i = 0; i < getCategorias.length; i++) {
        // Adicione um evento de clique a cada categoria
        getCategorias[i].addEventListener("click", function() {
            localStorage.setItem("indexArrayCategoria", i)
        });
      }
}else if(url_atual.endsWith("/temas/temas.html")){
    Categoria.arrayCategorias.sort((a, b) => a.nome.localeCompare(b.nome));
    Temas.percorrerTemasPorNomeCategoria(Categoria.arrayCategorias[localStorage.getItem("indexArrayCategoria")].nome);
    Temas.adicionarEventos();
    console.log(categoriaClicada)
}

console.log(url_atual)