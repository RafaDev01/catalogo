import Categoria from "./categorias.js";
import Temas from "./temas.js";
import TemaSelecionado from "./tema-selecionado.js"
import { adicionarItem, adicionarItemAoCarrinho, limparCarrinho, visualizarCarrinho } from "./carrinho.js"

let url_atual = window.location.href;
console.log(url_atual)

if(url_atual.endsWith("index.html") || url_atual == "https://4funcafe.vercel.app/"){
    let quantItemP = document.querySelector(".quant-itens-p")
    quantItemP.textContent = localStorage.getItem("quantItens")
    console.log("p-->" + localStorage.getItem("linkImgs"))
    console.log("aux-->" + localStorage.getItem("storageAux"))
    Categoria.organizarCategoriasTemas()
    let getCategorias = [...document.querySelectorAll(".categoria")]
    for (let i = 0; i < getCategorias.length; i++) {
        // Adicione um evento de clique a cada categoria
        
        getCategorias[i].addEventListener("click", function(evento) {
            let categoriaTexto = getCategorias[i].textContent.replace(/\s/g, '');
            let categoriaSemAcentos = categoriaTexto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "");
            let linkImgs = "../assets/img/categorias/"+ categoriaSemAcentos + "/"
            linkImgs = linkImgs.toLowerCase()
            localStorage.setItem("indexArrayCategoria", i)
            localStorage.setItem("auxLinkImgs", linkImgs)
            localStorage.setItem("categoria", getCategorias[i].textContent)
            evento.stopPropagation()
        });
      }
}else if(url_atual.endsWith("/temas.html")) {
    let quantItemP = document.querySelector(".quant-itens-p")
    quantItemP.textContent = localStorage.getItem("quantItens")
    console.log("p-->" + localStorage.getItem("linkImgs"))
    console.log("aux-->" + localStorage.getItem("storageAux"))
Categoria.arrayCategorias.sort((a, b) => a.nome.localeCompare(b.nome));
Temas.percorrerTemasPorNomeCategoria(Categoria.arrayCategorias[localStorage.getItem("indexArrayCategoria")].nome);

let temas = [...document.querySelectorAll(".tema")];
temas.forEach((categoria, i) => {
  categoria.addEventListener("click", (evento) => {
            localStorage.setItem("linkImgs",localStorage.getItem("auxLinkImgs"))
            let categoriaTexto = categoria.textContent.replace(/\s/g, '');
            let categoriaSemAcentos = categoriaTexto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, "");
            categoriaSemAcentos = categoriaSemAcentos.toLowerCase();
            let linkImgs = localStorage.getItem("linkImgs");
            var aux = localStorage.getItem("linkImgs") + categoriaSemAcentos + '/' + categoriaSemAcentos
            localStorage.setItem("linkImgs", aux);
        });
});

} else if(url_atual.endsWith("/tema-selecionado.html")){
    let quantItemP = document.querySelector(".quant-itens-p")
    quantItemP.textContent = localStorage.getItem("quantItens")
    async function carregarConteudo() {
        // Aguarde a conclusão da função assíncrona
        await TemaSelecionado.criarImgs(localStorage.getItem("linkImgs"));
      
        criarBotoesDoCarrinho()
      
        // Adicione aqui o restante do código que deseja executar após a carga do conteúdo.
      }
      
      // Chame a função que contém a lógica assíncrona
      carregarConteudo();
}else if(url_atual.endsWith("/carrinho.html")){
    let limpar = document.querySelector(".btn-limpar-carrinho")
    limpar.addEventListener("click",()=>{
        limparCarrinho()
        let a = document.querySelector(".container-carrinho")
        a.remove()
    })  
    let arrayCarrinho = localStorage.getItem("carrinhoItens")
    visualizarCarrinho(arrayCarrinho)
}

function criarBotoesDoCarrinho(){
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
                    container.appendChild(buttonMenos)
                    container.appendChild(quantidade)
                    container.appendChild(buttonMais)
    
                    element.parentElement.appendChild(container)
                    element.parentElement.appendChild(botaoAdicionarAoCarrinho)
    
                    addQuant(buttonMais, quantidade)
                    removerQuant(buttonMenos, quantidade)
                    botaoAdicionarAoCarrinho.addEventListener("click", ()=>{
                        
                        if(quantidade.textContent > 0){
                        let categoria = localStorage.getItem("categoria")
                        let numeroDaArte = parseInt(botaoAdicionarAoCarrinho.parentElement.firstChild.textContent.split(":")[1].trim())
                        
                        let nomeDoTema = localStorage.getItem("nomeDoTemaDaPagina")

                        adicionarItemAoCarrinho(categoria ,nomeDoTema, numeroDaArte, parseInt(quantidade.textContent));

                            adicionarItem(parseInt(quantidade.textContent))
                            botaoAdicionarAoCarrinho.remove()
                            buttonMais.remove()
                            buttonMenos.remove()
                            quantidade.remove()
                            p.textContent = "Itens adicionados ao carrinho."
                        }
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

