# Checklist de Testes Manuais – DoughLabPro

Este documento serve como um guia rápido para testes de regressão manuais após implementações de novas funcionalidades. O objetivo é garantir que as funcionalidades principais continuam operando como esperado.

---

### 1. Navegação e Layout Básico

- [ ] **Abrir o app:** Carregar a aplicação pela primeira vez.
- [ ] **Navegação Principal:** Clicar em cada item da barra de navegação principal (desktop e mobile) e verificar se a rota correta é carregada:
  - [ ] Meu Lab (`/lab`)
  - [ ] Calcular (`/calculate`)
  - [ ] Comunidade (`/community`)
  - [ ] Insights (`/insights`)
- [ ] **Navegação Secundária:** Acessar páginas como Perfil, Farinhas, etc., e verificar se o link/botão de "Voltar" funciona.

### 2. Calculadora (`/calculate`)

- [ ] **Carregar Preset:**
  - [ ] Selecionar "Pizza" e depois "Pizza Napolitana".
  - [ ] Verificar se os valores padrão de hidratação (62%), sal (2.8%) e óleo (0%) são aplicados.
- [ ] **Cálculo Básico:**
  - [ ] Alterar a quantidade para `3` pizzas e o peso para `280g`.
  - [ ] Confirmar que a seção de "Resultados" atualiza os totais de ingredientes corretamente.
- [ ] **Ajustes Inteligentes:**
  - [ ] Selecionar uma farinha (ex: "Farinha Tipo 00").
  - [ ] Preencher a temperatura ambiente (ex: "Quente").
  - [ ] Verificar se o bloco "Ajustes Inteligentes" exibe mensagens de sugestão/alerta. A tela não deve quebrar.
  - [ ] Verificar se o botão "Aplicar Sugestão" (se aparecer) funciona e atualiza o respectivo campo.
- [ ] **Sugestões de Recheio:**
    - [ ] Com a Pizza Napolitana selecionada, verificar se o bloco "Sugestões de Recheio" aparece e mostra combinações como "Margherita".
    - [ ] Confirmar que as quantidades por pizza e para a fornada inteira são calculadas.

### 3. Meu Lab (`/lab`) e Fornadas (Batches)

- [ ] **Criar Fornada:**
  - [ ] Na calculadora, com uma receita configurada, clicar em "Iniciar Fornada".
  - [ ] Dar um nome à fornada (ex: "Teste Napolitana 1").
- [ ] **Listar Fornada:**
  - [ ] Verificar se a nova fornada aparece na página `/lab`.
- [ ] **Detalhes da Fornada:**
    - [ ] Clicar em "Ver Detalhes" na fornada criada.
    - [ ] Na página de detalhes (`/batch/:id`), alterar o status para "Concluído" e dar uma nota (ex: 4 estrelas). Salvar.
    - [ ] Voltar para `/lab` e confirmar que o status e a nota foram atualizados no card.
- [ ] **Repetir Fornada:**
  - [ ] Em `/lab`, clicar em "Repetir Fornada".
  - [ ] Verificar se a página `/calculate` é aberta com a configuração exata daquela fornada.

### 4. Perfil e Meus Fornos (`/profile`)

- [ ] **Cadastrar Forno:**
  - [ ] Navegar para `/profile` -> "Meus Fornos".
  - [ ] Clicar em "Adicionar Forno".
  - [ ] Cadastrar um forno: Nome: "Forno de Casa", Tipo: "A Gás", Temp. Máx: `250`°C, marcar "Usa Pedra Refratária".
  - [ ] Salvar e verificar se o forno aparece na lista.
- [ ] **Definir Forno Padrão:**
  - [ ] Marcar o "Forno de Casa" como padrão.
- [ ] **Verificar Integração:**
  - [ ] Voltar para `/calculate` com a receita de Pizza Napolitana.
  - [ ] Verificar se os "Ajustes Inteligentes" agora exibem sugestões relacionadas a um forno doméstico de baixa temperatura (ex: sugerir adição de óleo).

### 5. Bibliotecas

- [ ] **Farinhas (`/flours`):**
  - [ ] Acessar a página.
  - [ ] Verificar se a lista de farinhas pré-cadastradas é exibida corretamente.
  - [ ] Definir uma farinha como padrão e verificar se ela é pré-selecionada na calculadora.
- [ ] **Recheios (`/toppings`):**
  - [ ] Acessar a página.
  - [ ] Verificar se as combinações de recheios (Margherita, Pepperoni, etc.) são listadas sem erro.

### 6. Comunidade (`/community`)

- [ ] **Tornar Público:**
  - [ ] Abrir os detalhes de uma fornada (`/batch/:id`).
  - [ ] Marcar a opção "Tornar este batch público".
- [ ] **Verificar na Comunidade:**
  - [ ] Navegar para `/community`.
  - [ ] Confirmar que a fornada marcada como pública agora aparece na lista.
- [ ] **Clonar Receita:**
  - [ ] Clicar no botão "Clonar receita" de uma fornada na comunidade.
  - [ ] Verificar se a página `/calculate` abre com a configuração daquela fornada.

### 7. Insights (`/insights`)

- [ ] **Verificar Dados:**
  - [ ] Após criar 2-3 fornadas com estilos diferentes.
  - [ ] Navegar para `/insights`.
  - [ ] Confirmar que a contagem de receitas, os estilos mais usados e a hidratação média são exibidos corretamente.

### 8. Robustez e Casos de Borda

- [ ] **Estado Vazio (LocalStorage Limpo):**
  - [ ] Limpar o `localStorage` do navegador para o domínio da aplicação.
  - [ ] Recarregar a página.
  - [ ] Verificar se o app carrega sem erros.
  - [ ] Navegar para `/lab`, `/community` e `/insights` e confirmar que mensagens amigáveis de "estado vazio" são exibidas em vez de telas quebradas.
