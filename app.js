// Lista interna que armazena os nomes para o sorteio
const listaAmigosInterna = [];
// Lista visível que será exibida para o usuário (não será alterada durante o sorteio)
const listaAmigosVisivel = [];

// Função para limpar o campo de entrada
function limparCampo() {
    document.getElementById("amigo").value = "";
}

// Função para atualizar a exibição da lista na interface (mostra a lista visível)
function atualizarLista() {
    const listaElement = document.getElementById("listadeAmigos");
    listaElement.innerHTML = ''; // Limpa a lista atual

    listaAmigosVisivel.forEach(amigo => {
        const li = document.createElement("li"); // Cria um novo item de lista
        li.textContent = amigo;
        listaElement.appendChild(li); // Adiciona o item à lista
    });
}

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    let amigo = document.getElementById("amigo").value.trim();

    if (amigo === "") {
        alert("Por favor, insira um nome antes de continuar.");
        limparCampo();
        return;
    }

    if (listaAmigosInterna.includes(amigo)) {
        alert("Esse nome já foi inserido no jogo!");
        limparCampo();
        return;
    }

    // Adiciona o amigo à lista interna e à lista visível (fantasma)
    listaAmigosInterna.push(amigo);
    listaAmigosVisivel.push(amigo);
    limparCampo();
    atualizarLista();

    // Habilita o botão de sorteio se houver pelo menos 2 amigos
    document.getElementById("btnSortear").disabled = listaAmigosInterna.length < 2;
}

// Função para sortear um amigo secreto
function sortearAmigo() {
    // Verifica se todos os amigos já foram sorteados
    if (listaAmigosInterna.length === 0) {
        alert("Todos os amigos já foram sorteados!");
        recomeçarSorteio(); // Reinicia o jogo
        return;
    }

    // Sorteio normal
    const indiceAleatorio = Math.floor(Math.random() * listaAmigosInterna.length);
    const amigoSorteado = listaAmigosInterna[indiceAleatorio];

    // Exibe o resultado na tela
    document.getElementById("resultado").innerHTML = `<strong>🎉 O seu amigo secreto é: ${amigoSorteado} 🎉</strong>`;

    // Remove o nome sorteado da lista interna (não altera a lista visível)
    listaAmigosInterna.splice(indiceAleatorio, 1);
    atualizarLista();

    // Se todos os amigos foram sorteados, desabilita o botão de sorteio e esconde a lista visível
    if (listaAmigosInterna.length === 0) {
        document.getElementById("btnSortear").disabled = true;
        document.getElementById("listadeAmigos").innerHTML = ''; // Esconde a lista
    }
}

// Função para recomeçar o sorteio
function recomeçarSorteio() {
    // Limpa a lista interna e visível de amigos
    listaAmigosInterna.length = 0;
    listaAmigosVisivel.length = 0;

    // Atualiza a lista visível
    atualizarLista();

    // Limpa o campo de resultado e reabilita o botão de sortear
    document.getElementById("resultado").innerHTML = '';
    document.getElementById("btnSortear").disabled = false;
    document.getElementById("listadeAmigos").style.display = 'block'; // Mostra novamente a lista
}

// Função para detectar a posição do mouse e aplicar a lógica de escurecer
function detectarPosicaoMouse(event) {
    const larguraTela = window.innerWidth; // Largura total da tela
    const posicaoX = event.clientX; // Posição horizontal do mouse

    // Detecta se o mouse está no lado direito ou esquerdo
    if (posicaoX > larguraTela / 2) {
        // Mouse no lado direito: aplica a classe .darken no lado esquerdo
        document.querySelector('.header-banner').classList.add('darken');
        document.querySelector('.input-section').classList.remove('darken');
    } else {
        // Mouse no lado esquerdo: aplica a classe .darken no lado direito
        document.querySelector('.header-banner').classList.remove('darken');
        document.querySelector('.input-section').classList.add('darken');
    }
}

// Adiciona o evento de movimento do mouse
document.addEventListener('mousemove', detectarPosicaoMouse);