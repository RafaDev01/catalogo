import Categoria from "./categorias.js";
import Temas from "./temas.js";
import TemaSelecionado from "./tema-selecionado.js"

let url_atual = window.location.href;

if(url_atual.endsWith("index.html") || url_atual.endsWith("vercel.app")){
    console.log("p-->" + sessionStorage.getItem("linkImgs"))
    console.log("aux-->" + sessionStorage.getItem("storageAux"))
    Categoria.organizarCategoriasTemas()
    let getCategorias = [...document.querySelectorAll(".categoria")]
    for (let i = 0; i < getCategorias.length; i++) {
        // Adicione um evento de clique a cada categoria
        
        getCategorias[i].addEventListener("click", function(evento) {
            let categoriaTexto = getCategorias[i].textContent.replace(/\s/g, '');
            let categoriaSemAcentos = categoriaTexto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "");
            let linkImgs = "../assets/img/categorias/"+ categoriaSemAcentos + "/"
            linkImgs = linkImgs.toLowerCase()
            sessionStorage.setItem("linkImgs", linkImgs)
            sessionStorage.setItem("indexArrayCategoria", i)
            sessionStorage.setItem("storageAux", sessionStorage.getItem("linkImgs"))
            sessionStorage.setItem("auxLinkImgs", linkImgs)
            evento.stopPropagation()
        });
      }
}else if(url_atual.endsWith("/temas.html")) {
    console.log("p-->" + sessionStorage.getItem("linkImgs"))
    console.log("aux-->" + sessionStorage.getItem("storageAux"))
Categoria.arrayCategorias.sort((a, b) => a.nome.localeCompare(b.nome));
Temas.percorrerTemasPorNomeCategoria(Categoria.arrayCategorias[sessionStorage.getItem("indexArrayCategoria")].nome);

let temas = [...document.querySelectorAll(".tema")];
temas.forEach((categoria, i) => {
  categoria.addEventListener("click", (evento) => {
            sessionStorage.setItem("linkImgs",sessionStorage.getItem("auxLinkImgs"))
            let categoriaTexto = categoria.textContent.replace(/\s/g, '');
            let categoriaSemAcentos = categoriaTexto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "");
            categoriaSemAcentos = categoriaSemAcentos.toLowerCase();
            let linkImgs = sessionStorage.getItem("linkImgs");
            var aux = sessionStorage.getItem("linkImgs") + categoriaSemAcentos + '/' + categoriaSemAcentos
            sessionStorage.setItem("linkImgs", aux);
        });
});

} else if(url_atual.endsWith("/tema-selecionado.html")){
        TemaSelecionado.criarImgs(sessionStorage.getItem("linkImgs"))

console.log("p-->" + sessionStorage.getItem("linkImgs"))
console.log("aux-->" + sessionStorage.getItem("storageAux"))
}