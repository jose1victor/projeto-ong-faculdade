function inicializarModoEscuro() {
    const botaoToggle = document.querySelector('.botao-modo-escuro');
    const body = document.body;

    const modoEscuroAtivo = localStorage.getItem('modoEscuro') === 'true';

    if (modoEscuroAtivo) {
        body.classList.add('dark-mode');
        botaoToggle.innerHTML = '☀️';
    }

    botaoToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('modoEscuro', 'true');
            botaoToggle.innerHTML = '☀️';
        } else {
            localStorage.setItem('modoEscuro', 'false');
            botaoToggle.innerHTML = '🌙';
        }
    });
}
function inicializarApp() {
  console.log("App inicializado. Entrega III.");
  inicializarMenuHamburguer();
  inicializarSPA();
  inicializarModoEscuro();
}

function inicializarMenuHamburguer() {
  const botaoHamburguer = document.querySelector(".menu-hamburguer");
  const menuPrincipal = document.querySelector(".menu-principal");

  if (!botaoHamburguer || !menuPrincipal) return;

  const itensFocaveisNoMenu = menuPrincipal.querySelectorAll("a[href]");
  const primeiroItem = itensFocaveisNoMenu[0];
  const ultimoItem = itensFocaveisNoMenu[itensFocaveisNoMenu.length - 1];

  function toggleMenu(abrir) {
    const estaAberto =
      typeof abrir === "boolean"
        ? abrir
        : !menuPrincipal.classList.contains("menu-aberto");

    botaoHamburguer.classList.toggle("menu-aberto", estaAberto);
    menuPrincipal.classList.toggle("menu-aberto", estaAberto);
    botaoHamburguer.setAttribute("aria-expanded", estaAberto);

    if (estaAberto) {
      document.addEventListener("keydown", handleTeclaPressionada);
      primeiroItem?.focus();
    } else {
      document.removeEventListener("keydown", handleTeclaPressionada);
      botaoHamburguer.focus();
    }
  }

  botaoHamburguer.addEventListener("click", () => {
    toggleMenu();
  });

  function handleTeclaPressionada(e) {
    if (!menuPrincipal.classList.contains("menu-aberto")) return;

    if (e.key === "Escape") {
      toggleMenu(false);
    }

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (
          document.activeElement === primeiroItem ||
          document.activeElement === botaoHamburguer
        ) {
          e.preventDefault();
          ultimoItem?.focus();
        }
      } else {
        if (document.activeElement === ultimoItem) {
          e.preventDefault();
          botaoHamburguer.focus();
        } else if (document.activeElement === botaoHamburguer) {
          e.preventDefault();
          primeiroItem?.focus();
        }
      }
    }
  }
}

async function carregarConteudo(url) {
  const container = document.getElementById("app-content");
  if (!container) return;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Não foi possível carregar a página.");
    }

    const text = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const novoConteudo = doc.querySelector("main").innerHTML;

    container.innerHTML = novoConteudo;

    container.innerHTML = novoConteudo;

    if (url === "cadastro.html") {
      console.log(
        "Detectei cadastro.html. Agendando inicialização da validação..."
      );

      setTimeout(() => {
        inicializarValidacaoFormulario();
      }, 0);
    }
  } catch (error) {
    console.error("Erro ao carregar conteúdo:", error);
    container.innerHTML = "<h2>Erro ao carregar esta seção.</h2>";
  }
}

function inicializarSPA() {
  if (
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("index.html")
  ) {
    carregarConteudo("home.html");
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");

    if (
      !link ||
      link.target === "_blank" ||
      !link.href.startsWith(window.location.origin)
    ) {
      return;
    }

    if (link.href.includes("#")) {
      return;
    }

    e.preventDefault();

    let paginaAlvo = new URL(link.href).pathname.substring(1);

    if (paginaAlvo === "index.html" || paginaAlvo === "") {
      paginaAlvo = "home.html";
    }

    window.history.pushState(
      {},
      "",
      paginaAlvo === "home.html" ? "/" : paginaAlvo
    );

    carregarConteudo(paginaAlvo);
  });

  window.addEventListener("popstate", () => {
    const paginaAlvo = window.location.pathname.substring(1) || "home.html";
    carregarConteudo(paginaAlvo);
  });
}

function inicializarValidacaoFormulario() {
  console.log("Função inicializarValidacaoFormulario() FOI CHAMADA.");
  const form = document.querySelector("form");
  if (!form) {
    console.error("ERRO: Não encontrei o elemento <form>!");
    return;
  }

  console.log("Encontrei o formulário. Adicionando o 'submit' listener...");
  form.setAttribute("novalidate", true);

  form.addEventListener("submit", (e) => {
    console.log("Listener de SUBMIT foi ACIONADO!");
    e.preventDefault();

    const alertaAntigo = document.querySelector(".alert");
    if (alertaAntigo) {
      alertaAntigo.remove();
    }

    const formularioValido = form.checkValidity();

    if (formularioValido) {
      console.log("Formulário válido. Enviando (simulado).");
      mostrarAlerta(
        "<strong>Sucesso!</strong> Seu cadastro foi enviado e será analisado.",
        "alert-sucesso",
        form
      );
      form.reset();

      form.querySelectorAll("input").forEach((input) => {
        input.classList.remove("touched");
      });
    } else {
      console.log("Formulário inválido.");
      mostrarAlerta(
        "<strong>Erro!</strong> Por favor, verifique os campos destacados em vermelho.",
        "alert-erro",
        form
      );

      const primeiroCampoInvalido = form.querySelector("input:invalid");
      if (primeiroCampoInvalido) {
        primeiroCampoInvalido.focus();
      }

      form.querySelectorAll("input").forEach((input) => {
        input.classList.add("touched");
      });
    }
  });

  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("blur", () => {
      input.classList.add("touched");
    });
  });
}

function mostrarAlerta(mensagem, tipo, formElement) {
  if (!formElement) return;

  const alerta = document.createElement("div");
  alerta.className = `alert ${tipo}`;
  alerta.innerHTML = mensagem;

  formElement.parentNode.insertBefore(alerta, formElement);

  alerta.scrollIntoView({ behavior: "smooth", block: "start" });
}

function validarEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
}
function validarCPF(cpf) {
  const re = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return re.test(cpf);
}

document.addEventListener("DOMContentLoaded", inicializarApp);

