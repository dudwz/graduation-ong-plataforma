# Plataforma ONG Vida Nova

![Licença MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Bem-vindo ao repositório do meu projeto final para a disciplina de "Desenvolvimento Front-end para Web". O desafio foi criar uma plataforma web completa, responsiva e acessível para uma ONG fictícia, utilizando **apenas HTML, CSS e JavaScript puros (Vanilla JS)**.

Este projeto vai além de um site estático simples. Ele implementa uma arquitetura de Single Page Application (SPA), um pipeline de build customizado com Vite e um **fallback inteligente** que permite ao site funcionar perfeitamente tanto online (via `http://`) quanto offline (diretamente do sistema de arquivos via `file:///`).

## 🚀 Demo ao Vivo

[**https://dudwz.github.io/graduation-ong-plataforma/**](https://dudwz.github.io/graduation-ong-plataforma/)

## ✨ Destaques Técnicos (Funcionalidades)

* **Arquitetura de Modo Duplo (SPA & Estático):**
    * **Modo Online (`http://`):** Navegação fluida de Single Page Application, com animações e carregamento de conteúdo via `fetch` e History API.
    * **Modo Offline (`file:///`):** O roteador detecta o protocolo local e desativa a si mesmo, revertendo para a navegação HTML tradicional (com recarregamento de página).

* **Pipeline de Build Customizado (Vite + Node.js):**
    * O código-fonte é 100% modular (ES6 Modules) para um desenvolvimento limpo.
    * O script `npm run build` executa o Vite e um script Node.js (`patch-html.js`) para gerar pacotes IIFE específicos para cada página. Isso garante que o site funcione perfeitamente no modo offline (`file:///`).

* **Acessibilidade (WCAG 2.1 AA):**
    * Navegação completa por teclado.
    * Implementação de "Focus Trap" no modal para que o foco não escape.
    * Gerenciamento de foco na SPA (o foco é movido para o título `<h2>` da nova página).
    * Suporte total a leitores de tela com `aria-labels` dinâmicos, `aria-live="polite"` e `role="alert"` para erros.

* **Design Responsivo & Otimizado:**
    * **Modo Escuro & Alto Contraste:** Alternância de tema com persistência no `localStorage` e respeito à preferência do sistema (`prefers-color-scheme`).
    * **Carregamento Otimizado:** Lazy loading de imagens com um *spinner* customizado, usando `loading="lazy"` nativo e um *fallback* com `IntersectionObserver`.

* **Formulário Dinâmico:**
    * Máscaras de input (CPF, CEP, Telefone) aplicadas em tempo real.
    * Validação de consistência (ex: CPF válido, maioridade) com feedback de erro acessível.

## 🛠️ Tech Stack

* **HTML5:** Estrutura semântica.
* **CSS3:** Layouts com Grid e Flexbox, Variáveis CSS e Animações.
* **JavaScript (Vanilla JS):** Todo o dinamismo (SPA, validação, acessibilidade) foi construído sem frameworks.
* **Vite:** Usado como servidor de desenvolvimento e motor de build.
* **Node.js:** Para o script de pós-processamento que automatiza o build final.

## 🚀 Começando

Este projeto pode ser executado de duas maneiras:

**Pré-requisitos:** [Node.js](https://nodejs.org/) (v18 ou superior).

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/dudwz/graduation-ong-plataforma.git
    cd graduation-ong-plataforma
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```

---

### 🖥️ Modo de Desenvolvimento (Recomendado)

Para rodar o projeto com a experiência completa de SPA e Hot Module Replacement (HMR).

```bash
npm run dev
```

O site estará disponível em `http://localhost:5173` (ou similar).

-----

### 📦 Build de Produção

Para gerar a pasta `dist/` final, minificada e otimizada, pronta para deploy ou para rodar localmente.

1.  **Execute o script de build:**
    ```bash
    npm run build
    ```
2.  **Visualize o resultado:**
      * **Opção A (Servidor):** `npm run preview` (inicia um servidor local servindo a pasta `dist`).
      * **Opção B (Local):** Abra qualquer arquivo `.html` de dentro da pasta `dist/` diretamente no seu navegador (ex: `file:///.../dist/index.html`). O site funcionará no modo de fallback estático.

## 🎓 Contexto Acadêmico

Este projeto foi desenvolvido seguindo 4 entregas progressivas:

  * **Entrega I – Fundamentos:** Estrutura HTML semântica e formulários nativos.
  * **Entrega II – Estilização:** Design System com CSS, responsividade e componentes (menu hambúrguer) em CSS puro.
  * **Entrega III – Interatividade:** Arquitetura JavaScript modular (SPA, templates, validação).
  * **Entrega IV – Acessibilidade e Deploy:** Implementação de WCAG AA, pipeline de build customizado e documentação profissional.

## ⚖️ Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
