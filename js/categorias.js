export let categorias = document.querySelector(".categorias");
export let paginaAtual = document.querySelector('.pagina-atual')
export let linkImgs = "assets/img/categorias/"

export let arrayCategorias = [
    { nome: "Animes" , tema: ["Dragon Ball Z", "Naruto", "One Piece", "Attack on Titan"]},
    { nome: "Datas comemorativas", tema: ["Dia das maes", "Dia dos namorados", "Natal", "Páscoa","Dia dos pais", "Halloween"]},
    {nome: "Desenhos", tema: ["Barbie" , "Bojack Horseman", "Futurama", "Lilo e Stitch", "Mario", "Meninas Super Poderosas", "Mickey", "Minions", "Princesas", "Rick and Morty", "Simpsons", "South Park", "Timão e Pumba", "Turma da Mônica"]},
    { nome: "Times", tema: ["Botafogo","Corinthians", "Cruzeiro", "Flamengo", "Fluminense", "Gremio", "Internacional", "Palmeiras", "Santos", "São Paulo", "Vasco"] },
];

arrayCategorias.sort((a, b) => a.nome.localeCompare(b.nome));

function ordenarTemasAlfabeticamente(categoria) {
    if (Array.isArray(categoria.tema)) {
        categoria.tema.sort((a, b) => a.localeCompare(b));
    }
}

// Iterar sobre as categorias e organizar tanto as categorias quanto os temas em ordem alfabética
arrayCategorias.forEach(categoria => {
    ordenarTemasAlfabeticamente(categoria);
});

arrayCategorias.forEach(categoria => {
    criarCategoria(categoria.nome);
});

function criarCategoria(nomeCategoria) {
    let novaCategoria = document.createElement("li");
    let aNavecacao = document.createElement("a")
    aNavecacao.setAttribute("src" , "../categorias/temas/temas.html")

    novaCategoria.appendChild(aNavecacao)
    aNavecacao.textContent = nomeCategoria;
    
    aNavecacao.classList.add("categoria")
    categorias.appendChild(novaCategoria);
}

export default arrayCategorias; categorias; paginaAtual; linkImgs;