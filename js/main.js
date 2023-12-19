import Categoria from "./categorias.js";
import Temas from "./temas.js";
import TemaSelecionado from "./tema-selecionado.js"
import { adicionarItem } from "./carrinho.js"

let url_atual = window.location.href;
console.log(url_atual)

if(url_atual.endsWith("index.html") || url_atual == "https://4funcafe.vercel.app/"){
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

    TemaSelecionado.criarImgs(sessionStorage.getItem("linkImgs"));
        
    window.addEventListener("load", () => {
    let botoesDasImg = [...document.querySelectorAll(".button-carrinho")];
    botoesDasImg.forEach(element => {
            element.addEventListener("click", () => {
                let p = document.createElement("p")
                let quantidade = document.createElement("p")
                let buttonMais = document.createElement("button")
                let buttonMenos = document.createElement("button")
                let container = document.createElement("div")
                let botaoAdicionarAoCarrinho = document.createElement("button")

                container.classList.add("container-quant")
                p.classList.add("p-quantidade")
                quantidade.classList.add("quantidade")
                buttonMais.classList.add("btn-mais")
                buttonMenos.classList.add("btn-menos")
                botaoAdicionarAoCarrinho.classList.add("adicionar-ao-carrinho")

                p.textContent = "Quantidade: "
                quantidade.textContent = 0;
                buttonMais.textContent = "+"        
                buttonMenos.textContent = "-"
                botaoAdicionarAoCarrinho.textContent = "Adicionar ao carrinho"

                container.appendChild(p)
                container.appendChild(buttonMais)
                container.appendChild(quantidade)
                container.appendChild(buttonMenos)

                element.parentElement.appendChild(container)
                element.parentElement.appendChild(botaoAdicionarAoCarrinho)

                addQuant(buttonMais, quantidade)
                removerQuant(buttonMenos, quantidade)
                botaoAdicionarAoCarrinho.addEventListener("click", ()=>{
                    adicionarItem(parseInt(quantidade.textContent))
                })
                element.remove()
            });
        });
    });
}

function addQuant(botao, quantidade){
    botao.addEventListener('click', () =>{
        quantidade.textContent++
    })
}

function removerQuant(botao, quantidade){
    botao.addEventListener('click', () =>{
        if(quantidade.textContent == 0){
            return
        }else{
            quantidade.textContent--
        }
    })
}

function funAdicionarAoCarrinho(botao)
{
    adicionarItem()
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(()=>{
        let quantItemP = document.querySelector(".quant-itens-p");
        quantItemP.textContent = localStorage.getItem("quantItens")
    },1000)
})
    
