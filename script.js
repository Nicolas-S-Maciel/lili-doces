// ==========================================================
// CONFIGURAÇÕES GERAIS E BANCO DE DADOS
// ==========================================================
const NUMERO_WHATSAPP = "5511985732485"; 
const textoObservacaoPadrao = "Produto sob encomenda. Mínimo 10 dias de antecedência para produção.";
const textoPrecoPadrao = "Valor: A combinar";

const produtos = [
    { id: 1, categoria: "bolos", nome: "Bolos Recheados Artesanais", tagline: "Alta Confeitaria para Grandes Momentos", descricao: "Nossos bolos recheados são a escolha perfeita para celebrações inesquecíveis como Casamentos, Aniversários e Mesversários. Feitos com técnicas de confeitaria fina, massa aerada e recheios autorais. Selecione o tamanho abaixo para vermos a disponibilidade!", ingredientes: textoObservacaoPadrao, preco: textoPrecoPadrao, img: "assets/img/capa-bolorecheado.jpeg" },
    { id: 8, categoria: "caseirinhos", nome: "Bolos Caseirinhos", tagline: "O carinho do café da tarde", descricao: "Bolos fofinhos e afetivos, com aquela cobertura generosa que abraça o coração. Perfeitos para presentear ou saborear em um momento relaxante em casa.", ingredientes: textoObservacaoPadrao, preco: textoPrecoPadrao, img: "assets/img/capa-bolocaseiro.jpeg" },
    { id: 2, categoria: "docinhos", nome: "Docinhos Tradicionais", tagline: "O sabor clássico da festa", descricao: "Brigadeiros, beijinhos e os clássicos que todo mundo ama, feitos com ingredientes de primeira linha.", ingredientes: textoObservacaoPadrao, preco: textoPrecoPadrao, img: "assets/img/capa-docetradicional.jpeg" },
    { id: 3, categoria: "docinhos", nome: "Docinhos Gourmet", tagline: "Sofisticação em cada mordida", descricao: "Docinhos finos com chocolates nobres e finalizações diferenciadas para eventos elegantes.", ingredientes: textoObservacaoPadrao, preco: textoPrecoPadrao, img: "assets/img/capa-docegourmet.jpeg" },
    { id: 4, categoria: "sobremesas", nome: "Brigadeirão e Pudim", tagline: "O fechamento perfeito", descricao: "Sobremesas clássicas de família. Textura lisinha e sabor que derrete na boca.", ingredientes: textoObservacaoPadrao, preco: textoPrecoPadrao, img: "assets/img/capa-pudim.jpg" },
    { id: 5, categoria: "sobremesas", nome: "Tortas de Limão e Maracujá", tagline: "Cremosidade Refrescante", descricao: "Massa crocante com recheio cítrico natural. O equilíbrio perfeito.", ingredientes: textoObservacaoPadrao, preco: textoPrecoPadrao, img: "assets/img/capa-tlimao.jpg" },
    { id: 6, categoria: "personalizados", nome: "Cupcakes e Mini Cake Donuts", tagline: "Mimos que encantam", descricao: "Mini bolinhos decorados, perfeitos para lembrancinhas personalizadas.", ingredientes: textoObservacaoPadrao, preco: textoPrecoPadrao, img: "assets/img/capa-minido.jpeg" },
    { id: 7, categoria: "personalizados", nome: "Doces Decorados (Pirulito, Trufa e Brownie)", tagline: "A identidade da sua festa", descricao: "Doces personalizados de acordo com o tema da sua comemoração.", ingredientes: textoObservacaoPadrao, preco: textoPrecoPadrao, img: "assets/img/capa-pirulito.jpeg" }
];

// ==========================================================
// VARIÁVEIS E SELETORES GLOBAIS
// ==========================================================
const gridProdutos = document.getElementById('grid-produtos');
const modal = document.getElementById('produto-modal');
const closeBtn = document.querySelector('.close-btn');

const modalImg = document.getElementById('modal-img');
const modalTitulo = document.getElementById('modal-titulo');
const modalTag = document.getElementById('modal-tag');
const modalPreco = document.getElementById('modal-preco');
const modalDescricao = document.getElementById('modal-descricao');
const modalIngredientes = document.getElementById('modal-ingredientes');
const modalPeso = document.getElementById('modal-peso');
const modalRendimento = document.getElementById('modal-rendimento');
const btnComprar = document.getElementById('btn-comprar');

const wrapperPeso = document.getElementById('wrapper-peso');
const wrapperRendimento = document.getElementById('wrapper-rendimento');
const modalOpcoesTamanho = document.getElementById('modal-opcoes-tamanho');
const selectTamanho = document.getElementById('select-tamanho');

let produtoAtualSelecionado = null;

// ==========================================================
// INICIALIZAÇÃO E EVENTOS PRINCIPAIS
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. RENDERIZAR PRODUTOS INICIAIS
    if (gridProdutos) renderizarProdutos(produtos);

    // 2. LÓGICA DO SCROLL (Header)
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scroll-active');
            } else {
                header.classList.remove('scroll-active');
            }
        });
    }

    // 3. MODO ESCURO COM MEMÓRIA (Unificado)
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme'); // Usa a mesma chave da galeria

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
    }

    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            let theme = 'light';
            if (document.body.classList.contains('dark-theme')) {
                theme = 'dark';
                themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
            } else {
                themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
            }
            localStorage.setItem('theme', theme);
        });
    }

    // 4. MENU MOBILE (Abre, fecha e fecha ao clicar nos links ou no fundo)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const menuBackdrop = document.getElementById('menu-backdrop');

    function fecharMenuMobile() {
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            if (menuBackdrop) menuBackdrop.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('ri-close-line');
                    icon.classList.add('ri-menu-line');
                }
            }
        }
    }

    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', () => {
            const estaAtivo = navList.classList.toggle('active');
            if (menuBackdrop) menuBackdrop.classList.toggle('active', estaAtivo);
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('ri-menu-line', !estaAtivo);
                icon.classList.toggle('ri-close-line', estaAtivo);
            }
        });
    }

    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', fecharMenuMobile);
    }

    // Fecha o menu automaticamente ao clicar em qualquer link
    if (navList) {
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', fecharMenuMobile);
        });
    }
    
    // 5. FILTROS
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderizarProdutos(filter === 'all' ? produtos : produtos.filter(p => p.categoria === filter));
        });
    });
    
    // 6. EVENTOS DO MODAL
    if (closeBtn) closeBtn.addEventListener('click', fecharModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) fecharModal(); });
    
    // 7. BOTÃO WHATSAPP
    if (btnComprar) {
        btnComprar.addEventListener('click', () => {
            if(produtoAtualSelecionado) {
                let detalheAdicional = "";
                if (produtoAtualSelecionado.id === 1 && selectTamanho) {
                    detalheAdicional = ` no tamanho *${selectTamanho.value}*`;
                }
                const texto = `Olá Lili! Gostaria de combinar os detalhes do: *${produtoAtualSelecionado.nome}*${detalheAdicional}. Como funciona para encomendar?`;
                window.open(`https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
            }
        });
    }
});

// ==========================================================
// FUNÇÕES DE INTERFACE
// ==========================================================
function renderizarProdutos(produtosParaExibir) {
    if (!gridProdutos) return;
    gridProdutos.innerHTML = ''; 
    produtosParaExibir.forEach((produto, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index % 3) * 100);
        
        card.innerHTML = `
            <div class="card-img-container"><img src="${produto.img}" alt="${produto.nome}" loading="lazy"></div>
            <div class="card-info">
                <span class="section-tag">${produto.categoria}</span>
                <h3>${produto.nome}</h3>
                <p class="preco-card">${produto.preco}</p>
                <button class="card-btn">Ver Detalhes</button>
            </div>
        `;
        card.addEventListener('click', () => abrirModal(produto));
        gridProdutos.appendChild(card);
    });
}

function abrirModal(produto) {
    produtoAtualSelecionado = produto;
    if(modalImg) modalImg.src = produto.img;
    if(modalTitulo) modalTitulo.innerText = produto.nome;
    if(modalTag) modalTag.innerText = produto.categoria;
    if(modalPreco) modalPreco.innerText = produto.preco;
    if(modalDescricao) modalDescricao.innerText = produto.descricao;
    if(modalIngredientes) modalIngredientes.innerText = produto.ingredientes;
    
    // Mostra/Esconde opções extras baseadas no ID
    if (produto.id === 1) {
        if(modalOpcoesTamanho) modalOpcoesTamanho.style.display = 'block';
        if(wrapperPeso) wrapperPeso.style.display = 'block';
        if(wrapperRendimento) wrapperRendimento.style.display = 'block';
        if(modalPeso) modalPeso.innerText = "Conforme seleção abaixo";
        if(modalRendimento) modalRendimento.innerText = "Conforme seleção abaixo";
    } else {
        if(modalOpcoesTamanho) modalOpcoesTamanho.style.display = 'none';
        if(wrapperPeso) wrapperPeso.style.display = 'none';
        if(wrapperRendimento) wrapperRendimento.style.display = 'none';
    }
    
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function fecharModal() {
    if(modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================================
// REMOVER TELA DE CARREGAMENTO (Destrava o Scroll)
// ==========================================================
function destrancarScroll() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0'; // Faz o preloader sumir suavemente
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('carregando'); // Destrava o scroll
        }, 400);
    } else {
        document.body.classList.remove('carregando');
    }
}

window.addEventListener('load', destrancarScroll);
// Fallback de segurança para redes móveis lentas (máximo 1.5s travado)
setTimeout(destrancarScroll, 1500);