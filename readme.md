ONG Criança Feliz - Projeto de Frontend
Este é o projeto final para a disciplina de Frontend, desenvolvido em quatro etapas (Entregas I, II, III e IV). O objetivo foi simular a criação de um site institucional completo para a ONG fictícia "Criança Feliz".

Status do Projeto: Concluído (Pronto para a Entrega IV)

Tecnologias Essenciais
O projeto foi construído utilizando um stack moderno e focado em performance:

HTML5: A fundação, com foco total na estruturação semântica.

CSS3: Utilizado para um Sistema de Design robusto (Variáveis, Grid, Flexbox), com uma abordagem Mobile-First completa e criação de componentes modulares.

JavaScript (ES6+): Responsável pela manipulação do DOM, gestão de eventos e a implementação da arquitetura SPA (Single Page Application).

Git & GitHub: Usado para versionamento, com releases marcadas (v1.0, v2.0, v3.0) para cada grande etapa.

Como Iniciar o Projeto Localmente
Por se tratar de uma SPA (Single Page Application) que utiliza requisições fetch para carregar o conteúdo das páginas, o projeto deve ser executado a partir de um servidor local para evitar problemas de CORS.

Clone o repositório para sua máquina.

Se você trabalha com VS Code, a maneira mais fácil é instalar a extensão Live Server.

Abra o arquivo index.html no VS Code.

Use o botão "Go Live" no canto inferior direito para iniciar o servidor.

O site será carregado automaticamente no seu navegador no endereço http://127.0.0.1:5500 (ou endereço similar).

Funcionalidades Implementadas
Entrega I (HTML Estrutural)
Criação da estrutura semântica completa, abrangendo as três páginas do site (<header>, <main>, <footer>, etc.).

Desenvolvimento de um formulário complexo com validações nativas (usando atributos pattern e required).

Entrega II (CSS e Design System)
Sistema de Design Consistente: Definição de uma paleta de 8 cores, 5 tamanhos de fonte e espaçamento modular de 8px, todos gerenciados por Variáveis CSS.

Layout Flexível: Estrutura principal baseada em CSS Grid e um sistema de Grid de 12 colunas (.row, .col-*) para controle total da responsividade.

Mobile-First: Implementação de 5 breakpoints para garantir que o design se ajuste perfeitamente em qualquer dispositivo.

Componentes: Estilização de elementos reutilizáveis como Botões (incluindo estados :hover e :focus), Cards, Tags, Alertas e Formulários.

Entrega III (Interatividade com JS)
SPA: A navegação entre as diferentes seções do site foi convertida em uma Single Page Application, utilizando fetch para carregar o conteúdo sem recarregar a página e a History API para manter o histórico de navegação.

Navegação Dinâmica: Menu hambúrguer totalmente funcional, controlado por JavaScript.

Feedback de Formulário: Validação em tempo real com mensagens claras de sucesso ou erro para o usuário.

Entrega IV (Qualidade e Polimento)
Acessibilidade: Foco na experiência do usuário, com verificação de contraste de cores (WCAG AA), navegação completa através do teclado (tabulação e menus) e uso correto do HTML semântico para leitores de tela.

Otimização de Performance: Redução do tamanho dos ativos através da compressão de imagens e minificação dos arquivos style.css e script.js.

Versionamento: Manutenção de um histórico de commits limpo e marcação de Releases seguindo a Versionamento Semântico no GitHub.

Estrutura de Pastas

├── css/ │ ├── style.css (Código-fonte CSS) │ └── style.min.css (CSS minificado para produção) ├── js/ │ ├── script.js (Código-fonte JS) │ └── script.min.js (JS minificado para produção) ├── imagens/ │ └── (Imagens otimizadas do projeto) ├── index.html (A "casca" principal do SPA) ├── home.html (Template da página inicial) ├── projetos.html (Template da página de projetos) ├── cadastro.html (Template da página de cadastro) └── README.md (Este arquivo)


Autor

**José Victor Santos de Lira**