function inicializarApp() {
    console.log("App inicializado. Entrega III.");
    inicializarMenuHamburguer();
    inicializarSPA();
}

function inicializarMenuHamburguer() {
    const botaoHamburguer = document.querySelector('.menu-hamburguer');
    const menuPrincipal = document.querySelector('.menu-principal');

    if (botaoHamburguer && menuPrincipal) {
        botaoHamburguer.addEventListener('click', () => {
            botaoHamburguer.classList.toggle('menu-aberto');
            menuPrincipal.classList.toggle('menu-aberto');
            
            const estaAberto = menuPrincipal.classList.contains('menu-aberto');
            botaoHamburguer.setAttribute('aria-expanded', estaAberto);
        });
    }
}

async function carregarConteudo(url) {
    const container = document.getElementById('app-content');
    if (!container) return;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Não foi possível carregar a página.');
        }
        
        const text = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const novoConteudo = doc.querySelector('main').innerHTML;
        
        container.innerHTML = novoConteudo;
        
       container.innerHTML = novoConteudo;

        if (url === 'cadastro.html') {
            console.log("Detectei cadastro.html. Agendando inicialização da validação...");
            
            setTimeout(() => {
                inicializarValidacaoFormulario();
            }, 0);
        }

    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
        container.innerHTML = "<h2>Erro ao carregar esta seção.</h2>";
    }
}

function inicializarSPA() {
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        carregarConteudo('home.html');
    }

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        
        if (!link || link.target === '_blank' || !link.href.startsWith(window.location.origin)) {
            return;
        }

        if (link.href.includes('#')) {
            return;
        }

        e.preventDefault(); 
        
        let paginaAlvo = new URL(link.href).pathname.substring(1); 
        
        if (paginaAlvo === 'index.html' || paginaAlvo === '') {
            paginaAlvo = 'home.html';
        }

        window.history.pushState({}, '', paginaAlvo === 'home.html' ? '/' : paginaAlvo);
        
        carregarConteudo(paginaAlvo);
    });

    window.addEventListener('popstate', () => {
        const paginaAlvo = window.location.pathname.substring(1) || 'home.html';
        carregarConteudo(paginaAlvo);
    });
}

function inicializarValidacaoFormulario() {
    console.log("Função inicializarValidacaoFormulario() FOI CHAMADA.");
    const form = document.querySelector('form');
    if (!form) {
        console.error("ERRO: Não encontrei o elemento <form>!");
        return; 
    }

    console.log("Encontrei o formulário. Adicionando o 'submit' listener...");
    form.setAttribute('novalidate', true);

    form.addEventListener('submit', (e) => {
        console.log("Listener de SUBMIT foi ACIONADO!");
        e.preventDefault(); 

        const alertaAntigo = document.querySelector('.alert');
        if (alertaAntigo) {
            alertaAntigo.remove();
        }

        const formularioValido = form.checkValidity();

        if (formularioValido) {
            console.log("Formulário válido. Enviando (simulado).");
            mostrarAlerta('<strong>Sucesso!</strong> Seu cadastro foi enviado e será analisado.', 'alert-sucesso', form);
            form.reset(); 
            
            form.querySelectorAll('input').forEach(input => {
                input.classList.remove('touched'); 
            });

        } else {
            console.log("Formulário inválido.");
            mostrarAlerta('<strong>Erro!</strong> Por favor, verifique os campos destacados em vermelho.', 'alert-erro', form);

            const primeiroCampoInvalido = form.querySelector('input:invalid');
            if (primeiroCampoInvalido) {
                primeiroCampoInvalido.focus();
            }
            
             form.querySelectorAll('input').forEach(input => {
                input.classList.add('touched'); 
            });
        }
    });

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('blur', () => {
             input.classList.add('touched');
        });
    });
}

function mostrarAlerta(mensagem, tipo, formElement) {
    if (!formElement) return;
    
    const alerta = document.createElement('div');
    alerta.className = `alert ${tipo}`; 
    alerta.innerHTML = mensagem;
    
    formElement.parentNode.insertBefore(alerta, formElement);
    
    alerta.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validarEmail(email) { 
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
 }
function validarCPF(cpf) { 
    const re = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return re.test(cpf);
}

document.addEventListener('DOMContentLoaded', inicializarApp);