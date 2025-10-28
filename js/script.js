document.addEventListener('DOMContentLoaded', () => {
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
});