import Categoria from "./categorias.js";
import Temas from "./temas.js";
import TemaSelecionado from "./tema-selecionado.js"

var url_atual = window.location.href;

if(url_atual.endsWith("/index.html")){
    console.log("Pagina inicial")
}else if(url_atual.endsWith("/categorias.html")){
    Categoria.organizarCategoriasTemas()
    let getCategorias = [...document.querySelectorAll(".categoria")]
    for (let i = 0; i < getCategorias.length; i++) {
        // Adicione um evento de clique a cada categoria
        localStorage.setItem("linkImgs", "../assets/img/categorias/")
        getCategorias[i].addEventListener("click", function() {
            let categoriaTexto = getCategorias[i].textContent.replace(/\s/g, '');
            let categoriaSemAcentos = categoriaTexto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "");
            let linkImgs = "../assets/img/categorias/"+ categoriaSemAcentos + "/"
            linkImgs = linkImgs.toLowerCase()
            localStorage.setItem("linkImgs", linkImgs)
            localStorage.setItem("indexArrayCategoria", i)
        });
      }
}else if(url_atual.endsWith("/temas.html")) {
// Suponha que você tenha a URL atual armazenada em localStorage
var linkImgs = localStorage.getItem("linkImgs");

// Verifique se a URL no localStorage já possui mais de cinco partes
if (linkImgs) {
  var partes = linkImgs.split('/');
  if (partes.length > 5) {
    // Use slice para manter apenas as cinco primeiras partes e junte-as novamente
    linkImgs = partes.slice(0, 5).join('/') + '/';
  }
}

// Atualize o valor no localStorage


// Restante do código, incluindo a lógica para adicionar event listeners para categorias
Categoria.arrayCategorias.sort((a, b) => a.nome.localeCompare(b.nome));
Temas.percorrerTemasPorNomeCategoria(Categoria.arrayCategorias[localStorage.getItem("indexArrayCategoria")].nome);

let temas = [...document.querySelectorAll(".tema")];
temas.forEach(categoria => {
  categoria.addEventListener("click", () => {
    let linkImgs = localStorage.getItem("linkImgs");
    let categoriaTexto = categoria.textContent.replace(/\s/g, '');
    let categoriaSemAcentos = categoriaTexto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "");
    categoriaSemAcentos = categoriaSemAcentos.toLowerCase();
    localStorage.setItem("linkImgs", linkImgs + categoriaSemAcentos + '/' + categoriaSemAcentos);
  });
  localStorage.setItem("linkImgs", linkImgs);
});

} else if(url_atual.endsWith("/tema-selecionado.html")){
    TemaSelecionado.criarImgs(localStorage.getItem("linkImgs"))
}

    console.log()