import Categoria from "./categorias.js";
import Temas from "./temas.js";
import TemaSelecionado from "./tema-selecionado.js"

let url_atual = window.location.href;

if(url_atual.endsWith("/index.html")){
    console.log("Pagina inicial")
}else if(url_atual.endsWith("/categorias.html")){
    Categoria.organizarCategoriasTemas()
    let getCategorias = [...document.querySelectorAll(".categoria")]
    for (let i = 0; i < getCategorias.length; i++) {
        // Adicione um evento de clique a cada categoria
        localStorage.setItem("linkImgs", "../assets/img/categorias/")
        getCategorias[i].addEventListener("click", function(evento) {
            let categoriaTexto = getCategorias[i].textContent.replace(/\s/g, '');
            let categoriaSemAcentos = categoriaTexto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "");
            let linkImgs = "../assets/img/categorias/"+ categoriaSemAcentos + "/"
            linkImgs = linkImgs.toLowerCase()
            localStorage.setItem("linkImgs", linkImgs)
            localStorage.setItem("indexArrayCategoria", i)
            localStorage.setItem("storageAux", localStorage.getItem("linkImgs"))
            evento.stopPropagation()
        });
      }
}else if(url_atual.endsWith("/temas.html")) {
Categoria.arrayCategorias.sort((a, b) => a.nome.localeCompare(b.nome));
Temas.percorrerTemasPorNomeCategoria(Categoria.arrayCategorias[localStorage.getItem("indexArrayCategoria")].nome);

localStorage.setItem("linkImgs", localStorage.getItem("storageAux"))

let temas = [...document.querySelectorAll(".tema")];
temas.forEach((categoria, i) => {
  categoria.addEventListener("click", (evento) => {
            let linkImgs = localStorage.getItem("linkImgs");
            let categoriaTexto = categoria.textContent.replace(/\s/g, '');
            let categoriaSemAcentos = categoriaTexto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "");
            categoriaSemAcentos = categoriaSemAcentos.toLowerCase();
            localStorage.setItem("linkImgs", linkImgs + categoriaSemAcentos + '/' + categoriaSemAcentos);
  });
});

} else if(url_atual.endsWith("/tema-selecionado.html")){
        TemaSelecionado.criarImgs(localStorage.getItem("linkImgs"))

console.log("p-->" + localStorage.getItem("linkImgs"))
console.log("aux-->" + localStorage.getItem("storageAux"))
}