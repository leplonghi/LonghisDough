

import { Tutorial, TutorialSection, YeastType } from './types';

export const TUTORIALS: Tutorial[] = [
  {
    id: 'maturacao_fria',
    section: TutorialSection.FERMENTATION,
    title: 'Maturação em Massa-Fria: Por que e como aplicar',
    image: 'https://images.unsplash.com/photo-1627435199109-6_m8J4s_V-0?q=80&w=2070&auto=format&fit=crop',
    intro: 'A maturação da massa em ambiente refrigerado (tipicamente 3-5 °C por 12 a 72 h) permite que a levedura atue mais lentamente e que enzimas da farinha — amilases, proteases — quebrem complexos de proteína e amido de forma mais eficaz.',
    why: '<ul><li>Permite maior desenvolvimento de sabor e aroma;</li><li>Relaxamento da rede de glúten = melhor extensibilidade e menor risco de rasgo;</li><li>Resultado mais consistente e repetível, reduzindo “depende” no processo.</li></ul>',
    howTo: '<ol><li>Use escala para pesar ingredientes com precisão.</li><li>Misture e bolote normalmente;</li><li>Coloque em recipiente fechado e leve à geladeira a 3-5 °C por 12-72h;</li><li>Retire 1-2h antes de abrir para o banco de trabalho para aclimatar.</li></ol>',
    tips: [
      'Evite caixas quentes diretas na geladeira — pode haver condensação;',
      'Em ambientes de verão (>28 °C), prefira iniciar a mistura pela manhã e refrigerar depois;',
      'Use farinha de força (W ≥ 280) para melhores resultados.'
    ],
    reference: {
      name: "Gozney Blog – Pizza Dough Hydration Explained",
      url: "https://eu.gozney.com/blogs/news/pizza-dough-hydration-explained"
    },
    accessLevel: 'free'
  },
  {
    id: 'biga_vs_poolish',
    section: TutorialSection.FERMENTATION,
    title: 'Prefermentos: Biga vs Poolish – escolha técnica',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Entre os prefermentos mais usados por pizzaiolos técnicos estão a poolish (hidratação ~100 %) e a biga (hidratação ~45-60%) — cada um traz características distintas na fermentação, no sabor e na estrutura da massa.',
    why: '<ul><li>Poolish favorece massa leve, mais aberta;</li><li>Biga favorece estrutura forte, textura mastigável;</li><li>Escolha técnica muda sabor, textura e comportamento de manuseio.</li></ul>',
    howTo: '<p>– Para Poolish: mistura 100% farinha/água + pequena levedura, fermentar 8-18 h;<br>– Para Biga: hidratação baixa (~45-55%), fermentar 12-24 h ou mais, incorporar como ~20 % da farinha total.</p>',
    tips: [
      'Se você sovar à mão, poolish pode ser mais simples de incorporar;',
      'Evite poolish em ambiente muito quente sem refrigeração ou o prazo de uso será curto;',
      'Biga exige boa farinha e força de glúten para suportar alta hidratação na massa final.'
    ],
    reference: {
      name: "PizzaBlab – Biga vs Poolish for Pizza Dough",
      url: "https://www.pizzablab.com/learning-and-resources/general-articles/biga-vs-poolish/"
    },
    accessLevel: 'pro'
  },
   {
    id: 'pizza_detroit',
    section: TutorialSection.TECHNIQUES,
    title: 'Pizza Detroit Style: Guia Completo',
    image: 'https://images.unsplash.com/photo-1633342537224-3c6c5233fe2a?q=80&w=2070&auto=format&fit=crop',
    intro: 'A pizza estilo Detroit é conhecida por sua massa de alta hidratação, assada em bandejas retangulares com bordas altas, queijo que vai até as bordas e textura aerada, diferindo muito da Napolitana.',
    why: '<ul><li>Alta hidratação gera miolo extremamente aerado;</li><li>Estilo em bandeja favorece cortes e porções mais generosas;</li><li>Difere da Napolitana em técnica e equipamento — entusiasta ganha nova dimensão.</li></ul>',
    howTo: '<ol><li>Misture massa com hidratação ~65-70%;</li><li>Fermente preferencialmente em poolish ou direta, 18-24h;</li><li>Divida, coloque em bandeja untada, conforme peso/unidade definidos;</li><li>Asse por 12-15 min a forno bem quente (~250-300 °C) ou ajustado para seu equipamento.</li></ol>',
    tips: [
      'Use farinha com proteína ≥ 12.5% para melhor estrutura;',
      'Bandeja untada com azeite ou óleo neutro garante bordas crocantes;',
      'Se forno limitar em temperatura, aumente tempo de cocção em 1-2 min e monitore base para evitar queima.'
    ],
    reference: {
      name: "Ooni Blog – Pizza Dough Hydration Explained",
      url: "https://ooni.com/blogs/ooni-insights/pizza-dough-hydration-explained"
    },
    accessLevel: 'pro',
    calculatorAction: {
        mode: 'basic',
        presetId: 'pizza_detroit'
    }
  },
  {
    id: 'hidratacao_alta',
    section: TutorialSection.INGREDIENTS,
    title: 'Hidratação Alta: 70%+ na Massa de Pizza',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Quando entramos no universo das massas de pizza com hidratação superior a 70 %, adentramos uma técnica refinada que exige sensibilidade e conhecimento pronunciado, resultando em miolos aerados e crostas leves.',
    why: '<ul><li>Maior hidratação = mais vapor interno = miolo mais aberto;</li><li>Rede de glúten relaxada favorece expansão e textura leve;</li><li>Diferenciação técnica: entrega “faça como pro”, mesmo sendo amador.</li></ul>',
    howTo: '<ol><li>Selecione % de hidratação desejada (ex: 72%).</li><li>O sistema recalcula água, sal, óleo e fermento.</li><li>Adote técnica de dobragens (folds) durante o bulk.</li><li>Prepare bancada bem enfarinhada e use espátula para manipular a massa.</li></ol>',
    tips: [
      'Use farinha com absorção alta ou farinha forte para sustentar massa solta;',
      'Em ambiente quente (> 28 °C) reduza levedura ou prolongue fermentação;',
      'Para forno limitado (< 300 °C) prefira hidratação entre 65-67% para controle facilitado.'
    ],
    reference: {
      name: 'Ooni – Pizza Dough Hydration Explained',
      url: 'https://ooni.com/blogs/ooni-insights/pizza-dough-hydration-explained',
    },
    accessLevel: 'free',
    calculatorAction: {
      mode: 'advanced',
    },
  },
  {
    id: 'ddt_controle',
    section: TutorialSection.ENVIRONMENT,
    title: 'Temperatura da Massa (DDT) – Controle e fórmula para consistência',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'A Temperatura Desejada da Massa (DDT) é a meta de temperatura após a mistura. Controlá-la garante consistência na fermentação, mesmo com variações de clima ou equipamento.',
    why: '<ul><li>Sem controle da temperatura, a fermentação pode sair do ritmo — muito rápida ou muito lenta.</li><li>O controle da DDT traz previsibilidade e repetibilidade, chave para resultados de nível técnico.</li><li>Ensinar esse conceito eleva o valor percebido do app além de “receita automática”.</li></ul>',
    howTo: '<ol><li>Meça temperatura da farinha e do ambiente com termômetro.</li><li>No app, selecione ‘Ajuste por Temperatura’ e insira os valores.</li><li>O sistema calcula a temperatura da água ideal.</li><li>Proceda à mistura e registre o resultado no diário.</li></ol>',
    tips: [
      'Termômetro digital de leitura rápida acelera o processo.',
      'Em ambientes >28 °C, reduza levedura ou aumente tempo de bulk.',
      'Em ambientes frios, aqueça inicialmente massa ou água para alcançar meta de DDT.'
    ],
    reference: {
      name: 'The Perfect Loaf – The Importance of Dough Temperature in Baking',
      url: 'https://www.theperfectloaf.com/the-importance-of-dough-temperature-in-baking/',
    },
    accessLevel: 'pro',
    calculatorAction: {
      mode: 'advanced',
    },
  },
  {
    id: 'superficies_assamento',
    section: TutorialSection.TECHNIQUES,
    title: 'Superfícies de Assamento: Pedra vs Aço – escolha técnica',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'A escolha da superfície (pedra, aço) tem impacto direto na crosta e textura. O aço aquece mais rápido, ideal para fornos domésticos, enquanto a pedra é melhor para calor extremo, evitando que a base queime.',
    why: '<ul><li>Aço = rápido aquecimento, ideal para fornos domésticos.</li><li>Pedra = melhor para calor extremo e estilos autênticos.</li><li>Escolha errada leva a base queimada ou miolo cru.</li></ul>',
    howTo: '<ol><li>No perfil de equipamento no app, selecione a sua base.</li><li>Informe tipo de forno e temperatura máxima.</li><li>Na receita, ative “Adaptar à minha base”.</li><li>A calculadora propõe ajustes automaticamente.</li></ol>',
    tips: [
      'Pré-aqueça a base por 30-40 min.',
      'Em forno doméstico <300 °C: escolha aço para compensar menor temperatura.',
      'Em forno >400 °C: use pedra para evitar queimar a base.'
    ],
    reference: {
      name: 'PizzaBlab – Steel vs. Stone for Pizza Surfaces',
      url: 'https://www.pizzablab.com/learning-and-resources/baking/pizza-baking-surfaces-guide/',
    },
    accessLevel: 'pro',
  },
  {
    id: 'gestao_levain',
    section: TutorialSection.FERMENTATION,
    title: 'Controle de Fermentação em Massa Madre',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Gerir uma cultura de levain (massa-mãe) é um diferencial técnico. O módulo “Meu Levain” permite registrar sua cultura, e a calculadora usa esse perfil para ajustar a receita à sua própria massa-mãe.',
    why: '<ul><li>Levain contribui com sabor complexo e fermentação mais lenta e controlada.</li><li>Registrar dados da cultura aumenta repetibilidade e reduz variabilidade.</li><li>Integrar esses dados à calculadora reforça a proposta de “ferramenta profissional acessível”.</li></ul>',
    howTo: '<ol><li>Acesse Meu Levain → Novo perfil: insira nome, hidratação, etc.</li><li>Na calculadora, selecione ‘Usar meu Levain’.</li><li>Insira % de levain desejado (ex: 20%).</li><li>A ferramenta atualiza hidratação e tempo de bulk automaticamente.</li></ol>',
    tips: [
      'Em ambientes quentes (> 28 °C): diminua % de levain para evitar fermentação acelerada.',
      'Use vidro transparente para observar bolhas e crescimento antes de usar.',
      'Registe notas da cultura após cada uso para gerar histórico e aprendizado.'
    ],
    reference: {
      name: 'King Arthur Baking – Hydration in Bread Dough, Explained',
      url: 'https://www.kingarthurbaking.com/blog/2023/01/11/bread-hydration',
    },
    accessLevel: 'pro',
    calculatorAction: {
      mode: 'advanced',
      yeastType: YeastType.USER_LEVAIN
    }
  },
  {
    id: 'recheios_proporcoes',
    section: TutorialSection.TECHNIQUES,
    title: 'Recheios & Proporções: Cálculo além da massa',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'O módulo de ‘massa + recheio’ amplia a utilidade do app. Ele calcula a quantidade ideal de queijo, molho e toppings para o estilo e tamanho da sua pizza, transformando o app em uma ferramenta completa.',
    why: '<ul><li>Recheio bem dimensionado garante equilíbrio de sabor e textura.</li><li>Adicionar essa funcionalidade transforma o app em ferramenta completa.</li><li>Eleva a retenção: o usuário volta para ajustar cobertura e testar variações.</li></ul>',
    howTo: '<ol><li>Em Calculadora selecione estilo Pizza.</li><li>Ative aba ‘Recheio’ e informe número de pizzas.</li><li>O sistema mostra quantidades sugeridas.</li><li>Ajuste % se quiser e salve como preset.</li></ol>',
    tips: [
      'Em forno doméstico limitado (<300 °C): prefira topping leve.',
      'Use molho à parte se quiser massa mais crocante.',
      'Em batch maior, use “Relatório de Recheio” para calcular custo e insumos.'
    ],
    reference: {
      name: 'Serious Eats – The Pizza Lab: Sauce-to-Cheese Ratios & Build Tips',
      url: 'https://www.seriouseats.com/pizza-lab-sauce-cheese-ratios-build-tips-4167416',
    },
    accessLevel: 'pro',
  },
  {
    id: 'hidratacao_gluten',
    section: TutorialSection.INGREDIENTS,
    title: 'Hidratação e Rede de Glúten: A Ciência por Trás da Massa',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'A hidratação é a quantidade de líquido em relação à farinha. Ela ativa as proteínas que formam o glúten. O modo “Hidratação Personalizada” permite controle total sobre esse parâmetro crucial.',
    why: '<ul><li>Hidratação define textura e abertura de miolo.</li><li>Rede de glúten forte depende de água suficiente.</li><li>Entender hidratação dá controle e previsibilidade à massa.</li></ul>',
    howTo: '<ol><li>No formulário, insira a % de hidratação desejada.</li><li>O app recalcula todos os outros ingredientes.</li><li>Observe a consistência: massa mais solta indica alta hidratação.</li><li>Monitore o “ponto de véu” para avaliar o glúten.</li></ol>',
    tips: [
      'Se usar farinha integral, aumente a hidratação em +2% a +4%.',
      'Massa com > 80% de hidratação precisa de dobras (folds) em vez de sova.',
      'Enfarinhe bem a bancada para manusear massas muito hidratadas.'
    ],
    reference: {
      name: 'King Arthur Baking – Hydration in Bread Dough, Explained',
      url: 'https://www.kingarthurbaking.com/blog/2023/01/11/bread-hydration',
    },
    accessLevel: 'free',
  },
  {
    id: 'troubleshooting_massa',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Troubleshooting de Massa: Snap-Back, Gum Line e falhas comuns',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Problemas como snap-back (massa que encolhe) ou gum line (base crua) são comuns. O módulo “Diagnóstico Rápido” oferece um checklist de sintomas e sugere correções automáticas.',
    why: '<ul><li>Problemas na massa causam frustração e abandono do app.</li><li>Diagnóstico preciso fortalece retenção e confiança.</li><li>Ajustes técnicos reduzem tentativa e erro.</li></ul>',
    howTo: '<ol><li>Acesse Diagnóstico e selecione o sintoma.</li><li>O app exibe causas prováveis e sugere um ajuste.</li><li>Aplique o ajuste e salve o aprendizado.</li><li>Use o histórico para evitar repetir o erro.</li></ol>',
    tips: [
      'Sempre pese os ingredientes — erros pequenos afetam o resultado.',
      'Em dias quentes (>30 °C), reduza o fermento em –10%.',
      'Calibre seu forno antes de uma grande fornada.'
    ],
    reference: {
      name: 'Pizza Today – Troubleshooting Your Pizza Dough',
      url: 'https://pizzatoday.com/news/troubleshooting-your-pizza-dough-a-guide-to-making-pizza-better/147346/',
    },
    accessLevel: 'pro',
  },
  {
    id: 'banco_farinhas',
    section: TutorialSection.INGREDIENTS,
    title: 'Banco de Farinhas & Substituições Inteligentes',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'A farinha é o núcleo da massa. O “Banco de Farinhas” permite registrar a marca, teor de proteína e consultar dados de outros usuários. Se sua farinha acabar, o app sugere uma alternativa e ajusta a receita.',
    why: '<ul><li>Farinha define estrutura, textura e estabilidade.</li><li>Substituição errada é causa frequente de falhas.</li><li>Ter um banco de dados fortalece a comunidade.</li></ul>',
    howTo: '<ol><li>Acesse Banco de Farinhas > Adicionar nova.</li><li>Informe marca, % de proteína, etc.</li><li>Ao criar uma receita, selecione sua farinha cadastrada.</li><li>Se indisponível, use a sugestão de substituição.</li></ol>',
    tips: [
      'Ao testar uma nova farinha, faça um lote pequeno e registre o resultado.',
      'Farinhas integrais geralmente precisam de +2-4% de hidratação.',
      'Use uma balança de precisão para dados consistentes.'
    ],
    reference: {
      name: 'BakerPedia – Gluten Hydration: Processes',
      url: 'https://bakerpedia.com/processes/gluten-hydration/',
    },
    accessLevel: 'pro',
  },
  {
    id: 'escalas_precisao',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Escalas, Precisão e Porcentagem de Padeiro',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'A imprecisão nas medidas é uma barreira para resultados consistentes. A ‘porcentagem de padeiro’ (farinha = 100%) é o método profissional para escalar e prever resultados, e está disponível no app.',
    why: '<ul><li>Porcentagem de padeiro traz clareza e escalabilidade.</li><li>Precisão com balança digital reduz erros.</li><li>Permite ao entusiasta trabalhar como um profissional.</li></ul>',
    howTo: '<ol><li>Na calculadora, ative o ‘Modo Porcentagem de Padeiro’.</li><li>Insira a farinha total (ex: 1000 g).</li><li>Use os sliders para hidratação, sal, óleo, etc.</li><li>A calculadora exibe os pesos reais e você pode salvar o preset.</li></ol>',
    tips: [
      'Use balança digital com precisão de 0,1 g para fermento e sal.',
      'Mantenha o ambiente controlado para evitar variáveis externas.',
      'Salve seus presets com nome claro e data.'
    ],
    reference: {
      name: 'BakerPedia – The Baker’s Percentage and How to Use It',
      url: 'https://bakerpedia.com/processes/baker-percentages/',
    },
    accessLevel: 'free'
  },
  {
    id: 'modo_pratico_avancado',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Modo Prático vs. Modo Avançado',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'O app oferece dois modos: Prático, com presets automáticos para uso rápido, e Avançado, que permite alterar livremente todas as porcentagens para experimentação, acomodando tanto usuários casuais quanto técnicos.',
    why: '<ul><li>Entusiasta casual quer simplicidade.</li><li>Usuário avançado busca controle completo.</li><li>Dois modos evitam que o app fique intimidante ou básico demais.</li></ul>',
    howTo: '<ol><li>Alterne entre ‘Modo Prático’ / ‘Modo Avançado’.</li><li>No Prático: defina apenas estilo, quantidade e peso.</li><li>No Avançado: todos os sliders (hidratação, sal, etc.) são liberados.</li><li>Salve presets em ambos os modos.</li></ol>',
    tips: [
      'Use os tooltips para entender a diferença entre os modos.',
      'O app salva sua preferência de modo para a próxima vez.',
      'No Modo Avançado, há um botão para resetar para o preset original.'
    ],
    reference: {
      name: 'MyPizzaCorner – Common Dough Problems and How to Fix Them',
      url: 'https://mypizzacorner.com/pizza-tips/pizza-dough-problems/',
    },
    accessLevel: 'free'
  },
  {
    id: 'modo_reverso',
    section: TutorialSection.TECHNIQUES,
    title: 'Modo Reverso: Calcule com o que você já tem',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'O ‘Modo Reverso’ permite inserir uma variável fixa (ex: 350 g de levain, 1 kg de farinha) e a ferramenta recalcula os demais ingredientes, adaptando-se a situações reais e reduzindo desperdício.',
    why: '<ul><li>Atende ao cenário real de cozinha: o que tenho em mãos?</li><li>Evita desperdício e transforma um problema em oportunidade.</li><li>Diferencia o app por pensamento funcional e adaptativo.</li></ul>',
    howTo: '<ol><li>Na calculadora, selecione ‘Modo Reverso’.</li><li>Insira o parâmetro que você conhece (ex: ’Tenho 350 g de levain’).</li><li>O sistema calcula os demais ingredientes.</li><li>Salve essa receita adaptada como um novo batch.</li></ol>',
    tips: [
      'Use este modo para sobras de levain ou farinha.',
      'Marque como “batch especial” para ajudar no histórico.',
      'Combine com o diário para ver quantas vezes esse modo foi utilizado.'
    ],
    reference: {
      name: 'Reddit r/Pizza – How to Calculate Biga and Poolish % in Pizza Dough',
      url: 'https://www.reddit.com/r/Cooking/comments/1bomiza/how_to_calculate_biga_and_poolish_in_pizza/',
    },
    accessLevel: 'pro'
  },
  {
    id: 'referencias_credibilidade',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Referências e Credibilidade: Bases Técnicas das Receitas',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Para que o DoughLabPro seja percebido como ferramenta séria, cada preset e tutorial é apoiado por referências reais e verificáveis, transmitindo profissionalismo e confiança.',
    why: '<ul><li>Usuários querem comprovar que a técnica funciona.</li><li>Transparência nas fontes aumenta a credibilidade.</li><li>Ajuda a criar uma comunidade técnica e engajada.</li></ul>',
    howTo: '<ol><li>Em cada preset/técnica, incluímos uma seção ‘Referência Técnica’.</li><li>Na página ‘Aprender’, você pode filtrar por ‘Validação’.</li><li>Permitimos visualizar a fonte original.</li><li>Adicionamos um selo de ‘Validação Técnica’ para receitas populares.</li></ol>',
    tips: [
      'Usamos fontes reconhecidas: associações, revistas e blogs técnicos.',
      'Atualizamos as referências periodicamente.',
      'Promovemos co-criação com especialistas que assinam receitas ‘certificadas’.'
    ],
    reference: {
      name: 'Scott’s Pizza Tours – The Dreaded “Gumline”',
      url: 'https://www.scottspizzatours.com/blog/gumline/',
    },
    accessLevel: 'free'
  },
  {
    id: 'no_knead_method',
    section: TutorialSection.TECHNIQUES,
    title: 'Método No-Knead para Massas de Panificação Fácil',
    image: 'https://images.unsplash.com/photo-1589301773952-79055811c47c?q=80&w=2070&auto=format&fit=crop',
    intro: 'O método ‘No-Knead’ (sem sova intensa) ganhou popularidade por facilitar massas de alto nível técnico com mínimo esforço. Ele usa hidratações elevadas (~75%) e fermentações longas (12h ou mais) para alinhar o glúten automaticamente.',
    why: '<ul><li>Permite que entusiastas com menos equipamento façam massas sofisticadas.</li><li>Textura do miolo mais aberta, casca mais crocante.</li><li>Eleva a técnica sem complicar a interface.</li></ul>',
    howTo: '<ol><li>No modo Avançado da calculadora, ative ‘No-Knead’.</li><li>Insira hidratação elevada (ex: 70-75%).</li><li>Configure fermentação longa (ex: 12-24h).</li><li>Siga as instruções de descanso e grave o resultado no diário.</li></ol>',
    tips: [
      'Em ambiente quente (>28 °C) reduza hidratação ~2% para evitar massa super fluida.',
      'Use recipiente fechado para fermentar para evitar crosta seca.',
      'Faça um lote pequeno na primeira vez para validar o processo.'
    ],
    reference: {
      name: "No-knead Bread – Wikipedia",
      url: "https://en.wikipedia.org/wiki/No-knead_bread"
    },
    accessLevel: 'pro'
  },
  {
    id: 'scoring_techniques',
    section: TutorialSection.TECHNIQUES,
    title: 'Padrões de Corte (Scoring) e Expansão da Massa',
    image: 'https://images.unsplash.com/photo-1585399103509-24d119a9f11f?q=80&w=2070&auto=format&fit=crop',
    intro: 'O corte da massa antes de assar (*scoring*) não é apenas estético: regula onde o gás escapa, como a massa se expande, e afeta textura e crosta.',
    why: '<ul><li>Controlar a expansão da massa evita rupturas indesejadas.</li><li>Permite estética diferenciada.</li><li>Ajuda a criar consistência no resultado final.</li></ul>',
    howTo: '<ol><li>No módulo ‘Técnicas’ selecione ‘Scoring’.</li><li>Escolha o padrão conforme o estilo do pão.</li><li>Antes de assar, execute o padrão com uma lâmina.</li><li>No diário, marque qual padrão usou e avalie o resultado.</li></ol>',
    tips: [
      'Use lâmina afiada ou *lame* para cortes limpos.',
      'Em massas de alta hidratação (>70%), prefira cortes mais profundos (~0.5 cm).',
      'Fotografe de cima após o corte para comparar nos próximos batches.'
    ],
    reference: {
      name: "King Arthur Baking – Bread Scoring Techniques",
      url: "https://www.kingarthurbaking.com/blog/2017/10/20/bread-scoring-techniques"
    },
    accessLevel: 'pro'
  },
  {
    id: 'baking_methods',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Métodos de Panificação: Straight Dough, Sponge & Dough, Sourdough',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2070&auto=format&fit=crop',
    intro: 'Existem vários métodos de preparo: *straight dough* (tudo junto), *sponge & dough* (com pré-fermento), ou *sourdough* (massa madre). Cada um impacta o tempo, sabor e textura final.',
    why: '<ul><li>O método define sabor, textura e ritmo da produção.</li><li>Ajuda a entender por que algumas massas “pedem” mais tempo ou técnica.</li><li>Dá profundidade ao app e faz o usuário se sentir no controle.</li></ul>',
    howTo: '<ol><li>Na calculadora, selecione ‘Método de Massa’.</li><li>Escolha entre Straight, Sponge ou Sourdough.</li><li>O sistema ajusta os campos visíveis (ex: % pré-fermento para Sponge).</li><li>Execute o processo e registre no diário.</li></ol>',
    tips: [
      'Se tiver menos de 4h livre, use método Straight.',
      'Para sabor mais complexo, reserve 12-24h para Sponge ou Sourdough.',
      'Inicie com menos fermento se for Sourdough e registre o resultado.'
    ],
    reference: {
      name: "Bread-Making Methods: From Basic to Advanced",
      url: "https://hospitality.institute/bha101/bread-making-methods-basic-to-advanced/"
    },
    accessLevel: 'free'
  },
  {
    id: 'pizza_baking_science',
    section: TutorialSection.ENVIRONMENT,
    title: 'Ciência por Trás da Cocção de Pizza – Física e Termodinâmica',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop',
    intro: 'Estudos analisam como fornos de alvenaria vs. domésticos impactam o tempo de cocção e a textura. O app permite inserir seu tipo de forno e material da base para adaptar a receita à sua realidade.',
    why: '<ul><li>Entender o equipamento leva a consistência real.</li><li>Usuários se sentem capacitados com dados, não só “receita genérica”.</li><li>Alto valor percebido significa maior retenção.</li></ul>',
    howTo: '<ol><li>Na configuração do forno, insira tipo, base e temperatura.</li><li>Ative ‘Simulação de Cocção’ para ver sugestões de tempo/ajuste.</li><li>No diário, compare o resultado com a sugestão e ajuste para a próxima.</li></ol>',
    tips: [
      'Fornos domésticos < 300 °C: aumente pré-aquecimento para >30 min.',
      'Base de aço aquece mais rápido que pedra — cuidado com queima da base.',
      'Fotografe a crosta e registre o tempo real de cocção.'
    ],
    reference: {
      name: "The Physics of Baking Good Pizza – arXiv",
      url: "https://arxiv.org/abs/1806.08790"
    },
    accessLevel: 'pro'
  },
  {
    id: 'cold_retard_flavor',
    section: TutorialSection.FERMENTATION,
    title: 'Fermentação em Retardo (Cold Retard) e Perfil de Sabor',
    image: 'https://images.unsplash.com/photo-1627435199109-6_m8J4s_V-0?q=80&w=2070&auto=format&fit=crop',
    intro: 'O retardo frio (fermentação em baixa temperatura) é usado por profissionais para desenvolver sabor, estrutura e aroma. O app guia você a configurar a receita para essa técnica avançada.',
    why: '<ul><li>Fermentação lenta = maior complexidade de sabor.</li><li>O usuário se diferencia de práticas básicas de massa rápida.</li><li>Oferece padrão de “produção de nível profissional”.</li></ul>',
    howTo: '<ol><li>Na calculadora, ative ‘Retardo Frio’.</li><li>Insira tempo de refrigeração e temperatura.</li><li>O motor ajusta % de fermento e hidratação.</li><li>Após cocção, salve no diário e compare sabor e textura.</li></ol>',
    tips: [
      'Use um recipiente selado para evitar secagem da massa.',
      'Se sua geladeira estiver >8 °C, ajuste manualmente a condição.',
      'Faça um lote de teste antes de adotar no volume pleno.'
    ],
    reference: {
      name: "The Science Behind Pizza Dough – PizzaVolta",
      url: "https://pizzavolta.com/the-science-behind-pizza-dough/"
    },
    accessLevel: 'pro'
  },
  {
    id: 'yeast_types_dosage',
    section: TutorialSection.INGREDIENTS,
    title: 'Fermentos e Leveduras: Tipos, Dosagem e Efeitos',
    image: 'https://images.unsplash.com/photo-1617470715842-9ebd65b8a03f?q=80&w=2070&auto=format&fit=crop',
    intro: 'Entender o tipo de levedura (IDY, ADY, Levain) e sua dosagem é vital para consistência. Este guia ajuda você a escolher o tipo e a dosagem corretos para sua receita.',
    why: '<ul><li>Dosagem incorreta compromete a textura.</li><li>O usuário ganha controle fino sobre a receita.</li><li>Permite que o app suporte escalabilidade de lote.</li></ul>',
    howTo: '<ol><li>Na calculadora, abra ‘Tipo de Fermento’.</li><li>Escolha entre IDY, ADY, ou Levain.</li><li>Insira a % sugerida ou use o valor padrão.</li><li>Após o batch, registre o tempo de fermentação real e ajuste a % para a próxima.</li></ol>',
    tips: [
      'Em ambiente quente (>30 °C) reduza o fermento ~10-20%.',
      'Em ambiente frio (<18 °C) aqueça a água em vez de aumentar a levedura.',
      'Mantenha um registro no diário para evoluir seu fator pessoal.'
    ],
    reference: {
      name: "Influence of Yeast Concentrations and Fermentation Times on Bread Dough",
      url: "https://www.sciencedirect.com/science/article/pii/S0023643824003426"
    },
    accessLevel: 'free'
  },
  {
    id: 'stretch_and_fold_technique',
    section: TutorialSection.TECHNIQUES,
    title: 'Técnica Stretch & Fold: Melhorando a Estrutura com Pouca Energia',
    image: 'https://images.unsplash.com/photo-1614532843595-3b74b1df092b?q=80&w=2070&auto=format&fit=crop',
    intro: 'A técnica *stretch & fold* (esticar e dobrar) é eficaz para massas de alta hidratação, reforçando o glúten e criando bolhas grandes e estáveis com menos esforço que a sova tradicional.',
    why: '<ul><li>Evita esforço excessivo para quem não tem batedeira.</li><li>Melhora a textura de massas muito hidratadas.</li><li>Oferece uma técnica profissional acessível.</li></ul>',
    howTo: '<ol><li>No formulário da calculadora ative ‘Usar Stretch & Fold’.</li><li>Insira o número de ciclos (ex: 3-4 a cada 30 min).</li><li>O motor calcula tempo e hidratação recomendada.</li><li>Registre no diário e compare com a sova tradicional.</li></ol>',
    tips: [
      'Em massas muito fluidas (>68% hidratação), prefira dobrar a sovar.',
      'Se a bancada estiver fria, aqueça levemente a massa antes de iniciar.',
      'Fotografe o miolo cortado para ver a abertura e evolução.'
    ],
    reference: {
      name: "Advanced No-Knead Bread – Taste of Artisan",
      url: "https://tasteofartisan.com/no-knead-bread/"
    },
    accessLevel: 'pro'
  },
  {
    id: 'connected_oven_profile',
    section: TutorialSection.ENVIRONMENT,
    title: 'Perfil de Forno Conectado: Ajuste Automático da Receita ao Equipamento',
    image: 'https://images.unsplash.com/photo-1579752048924-f53d5c58746b?q=80&w=2070&auto=format&fit=crop',
    intro: 'Saber o perfil exato do seu forno faz a diferença. O app permite que você registre seu equipamento e, com o ‘Perfil Conectado’, a calculadora recomenda ajustes de hidratação, óleo e tempo de cocção.',
    why: '<ul><li>Garante que uma receita funcione no seu forno.</li><li>Reduz a frustração de sucessivas tentativas.</li><li>Eleva o valor técnico do app para entusiastas.</li></ul>',
    howTo: '<ol><li>Em Configurações > Perfil do Forno, insira os dados do seu equipamento.</li><li>Inicie o “Teste de Forno” no app para registrar tempo e temperatura real.</li><li>Ative ‘Auto-Ajuste de Base’ para que a calculadora adapte a receita.</li><li>No diário, marque “Usou perfil conectado” para filtrar resultados.</li></ol>',
    tips: [
      'Faça pré-aquecimento de no mínimo 30 min.',
      'Em forno doméstico ≤300 °C, aumente o óleo em ~1% ou reduza a hidratação ~2%.',
      'Substitua a pedra por aço se buscar crocância extra em forno limitado.'
    ],
    reference: {
      name: "Exploring the Role of Baking Process on Technological Properties of Bread",
      url: "https://pubs.acs.org/doi/10.1021/acsfoodscitech.4c00987"
    },
    accessLevel: 'pro'
  },
  {
    id: 'error_logging_diary',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Registro de Erros e Diagnósticos no Diário',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2070&auto=format&fit=crop',
    intro: 'Aprender com o que deu errado é essencial. O ‘Diário de Batches’ permite registrar erros comuns (ex: over-proof), associá-los aos parâmetros usados e analisar padrões para melhorar consistentemente.',
    why: '<ul><li>Aprender dos erros diferencia o hobby da técnica.</li><li>Cria o hábito de registro diário, que gera retenção.</li><li>Prepara dados para futuras funcionalidades de ‘insights’.</li></ul>',
    howTo: '<ol><li>Após o batch, clique ‘Registrar Erro/Observação’ no diário.</li><li>Marque o tipo de erro e insira os parâmetros usados.</li><li>Depois, filtre no módulo Insights para ver padrões.</li><li>Ajuste sua próxima fornada com base no diagnóstico.</li></ol>',
    tips: [
      'Use fotos antes/depois para entender visualmente o erro.',
      'Use etiquetas padrão (“over-proof”) para filtros rápidos.',
      'Compare erros no tempo para evoluir seu nível técnico.'
    ],
    reference: {
      name: "Stages of Bread Making – VegPatch Kitchen",
      url: "https://vegpatchkitchen.co.uk/the-stages-of-bread-making/"
    },
    accessLevel: 'pro'
  },
  {
    id: 'recipe_scaling',
    section: TutorialSection.TECHNIQUES,
    title: 'Escalonamento de Receita: De 500g a 10kg sem perder qualidade',
    image: 'https://images.unsplash.com/photo-1627888636881-8985b671f49b?q=80&w=2070&auto=format&fit=crop',
    intro: 'A porcentagem de padeiro permite escalar receitas com precisão. O modo “Escalonar Lote” recalcula todos os ingredientes e parâmetros, assegurando que a qualidade seja mantida em lotes maiores.',
    why: '<ul><li>Mantém a consistência ao produzir em escala maior.</li><li>Aumenta o valor do app para ambientes semi-profissionais.</li><li>Evita erros de proporção em grandes lotes.</li></ul>',
    howTo: '<ol><li>Na calculadora, selecione ‘Modo Escalonar Lote’.</li><li>Insira o peso da farinha alvo (ex: 5000 g).</li><li>Mantenha ou ajuste as porcentagens.</li><li>O sistema recalcula tudo para você.</li><li>Salve como batch e registre o resultado.</li></ol>',
    tips: [
      'Ao escalar >10×, verifique seu equipamento para garantir desempenho.',
      'Em lotes grandes, a massa pode aquecer mais rápido na batedeira.',
      'Use os registros do diário para comparar lotes de tamanhos diferentes.'
    ],
    reference: {
      name: "A Pizza Primer – The Fresh Loaf",
      url: "https://www.thefreshloaf.com/recipes/pizza"
    },
    accessLevel: 'pro'
  },
  {
    id: 'long_term_fermentation',
    section: TutorialSection.FERMENTATION,
    title: 'Técnica de Fermentação de Longo Prazo: “Sour Ferment”',
    image: 'https://images.unsplash.com/photo-1594311242637-a2d2a4585c54?q=80&w=2070&auto=format&fit=crop',
    intro: 'Fermentar por 48h ou mais permite maior desenvolvimento de sabor e quebra de amidos. O app ensina a ativar o ‘Modo Fermentação Ultra Longa’ e ajusta a receita para essa técnica avançada.',
    why: '<ul><li>Sabor mais complexo, miolo com melhores alvéolos e melhor digestibilidade.</li><li>Perfeito para entusiastas que querem um resultado artesanal premium.</li><li>Valor percebido elevado para o app.</li></ul>',
    howTo: '<ol><li>Na calculadora, ative ‘Fermentação > 24h’.</li><li>Ajuste o tempo e o modo (ex: frio/refrigeração).</li><li>O sistema sugere ajustes de fermento e hidratação.</li><li>Execute e registre fotos da massa e notas de sabor/textura.</li></ol>',
    tips: [
      'Use um recipiente transparente para observar as bolhas de gás.',
      'Em lotes grandes, garanta controle de temperatura.',
      'Compare um lote normal vs. um ultra-fermentado para sentir a diferença.'
    ],
    reference: {
      name: "High Temperature 1H DOSY NMR Reveals Sourdough Fermentation Changes",
      url: "https://arxiv.org/abs/2503.07071"
    },
    accessLevel: 'pro'
  },
  {
    id: 'natural_fermentation_levain',
    section: TutorialSection.FERMENTATION,
    title: 'Uso de Fermentação Natural (Levain) para Pizzas e Pães Premium',
    image: 'https://images.unsplash.com/photo-1560181313-a5370557e411?q=80&w=2070&auto=format&fit=crop',
    intro: 'A fermentação natural via levain traz sabor e complexidade técnica. O app guia você na ativação do “Modo Levain”, permitindo registrar seu cultivo e conectar com o diário para um histórico completo.',
    why: '<ul><li>Valor artesanal e diferencial de sabor.</li><li>O usuário sente que o app acompanha seu cultivo pessoal.</li><li>Facilita a transição de entusiasta para micro-empreendedor.</li></ul>',
    howTo: '<ol><li>Em “Cultivo de Levain”, registre sua cultura.</li><li>Na calculadora escolha “Fermentação Natural (Levain)” e insira a %.</li><li>O motor ajusta hidratação/tempo conforme o perfil do seu levain.</li><li>Grave o batch, registre o vigor do levain e avalie o resultado.</li></ol>',
    tips: [
      'Use um vidro transparente para observar a atividade do levain.',
      'Alimente o levain sempre no mesmo horário para consistência.',
      'Salve o histórico para ver qual alimentação gera as melhores massas.'
    ],
    reference: {
      name: "High Temperature 1H DOSY NMR – Sourdough Fermentation Study",
      url: "https://arxiv.org/abs/2503.07071"
    },
    accessLevel: 'pro'
  },
  {
    id: 'micro_batch_mode',
    section: TutorialSection.TECHNIQUES,
    title: 'Micro-Batch Mode: Produza 1 ou 2 Unidades com Precisão',
    image: 'https://images.unsplash.com/photo-1528731708534-816fe59f90cb?q=80&w=2070&auto=format&fit=crop',
    intro: 'O modo *Micro-Batch* permite fazer 1 ou 2 pizzas/pães com precisão usando medidas de volume (xícaras/colheres), ideal para quem não tem balança de precisão ou quer fazer lotes menores.',
    why: '<ul><li>Expande a base de usuários para entusiastas com menos equipamento.</li><li>Aumenta o uso diário do app, não apenas para grandes produções.</li><li>Facilita o hábito de praticar.</li></ul>',
    howTo: '<ol><li>Na calculadora selecione ‘Modo Micro-Batch’.</li><li>Escolha o tamanho (1 pizza ou 2 pães).</li><li>O app troca as unidades para volume e ajusta a receita.</li><li>Salve o preset “Mini Batch” para repetição rápida.</li></ol>',
    tips: [
      'Use xícaras medidoras se não tiver balança.',
      'Prefira ingredientes de marca conhecida para minimizar a variação.',
      'Compare o resultado vs. um lote maior para calibrar seu paladar.'
    ],
    reference: {
      name: "Easy Homemade Pizza Dough – Girl Versus Dough",
      url: "https://www.girlversusdough.com/pizza-dough-recipe/"
    },
    accessLevel: 'free'
  },
  {
    id: 'visual_indicators_photography',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Uso de Indicadores Visuais e Fotografia de Massa e Crosta',
    image: 'https://images.unsplash.com/photo-1513312999432-a7afa260d8a0?q=80&w=2070&auto=format&fit=crop',
    intro: 'Fotografar a massa, o miolo e a crosta fornece dados visuais para calibrar parâmetros. O app integra ao diário a opção “Adicionar Foto Técnico” para gerar gráficos visuais de evolução.',
    why: '<ul><li>Permite ver progresso concreto, o que é mais motivador.</li><li>Ajuda na identificação rápida de problemas visuais.</li><li>Diferencia o app como ferramenta de aprendizado visual.</li></ul>',
    howTo: '<ol><li>No diário, ao salvar um batch, selecione “Adicionar Foto Técnico”.</li><li>Tire fotos da bola de massa, crosta e miolo cortado.</li><li>O app analisa e gera um ‘indicador’ (ex: % de alvéolos).</li><li>Compare com batches anteriores e visualize sua evolução.</li></ol>',
    tips: [
      'Use a mesma iluminação para consistência nas fotos.',
      'Colete fotos da crosta inteira e do miolo em seção transversal.',
      'Nomeie as fotos com data e perfil da receita para fácil busca.'
    ],
    reference: {
      name: "Homemade Pizza Dough from Scratch – Food & Style",
      url: "https://foodandstyle.com/pizza-dough/"
    },
    accessLevel: 'pro'
  },
  {
    id: 'prefermentos_poolish_biga_sponge',
    section: TutorialSection.FERMENTATION,
    title: 'Prefermentos: Poolish, Biga e Sponge',
    image: 'placeholder_url_prefermentos.jpg',
    intro: 'Os pré-fermentos — como Poolish, Biga e Sponge — são técnicas amplamente utilizadas por padeiros e pizzaiolos para gerar sabores mais complexos, danificar menos a rede de glúten e melhorar a textura da massa. Conforme o guia da PizzaBlab, esses métodos envolvem misturar uma parte da farinha e água (± álcool de fermento mínimo) e deixá-la fermentar por 6-24 h antes de incorporá-la à massa final.',
    why: '<ul><li>Gera sabor mais profundo porque permite ação de bactérias lácticas antes da massa final.</li><li>Permite massa mais leve ou com miolo mais aberto, conforme escolha da técnica.</li><li>Eleva o entusiasta do ‘fazer massa’ para ‘engenheiro de massas’.</li></ul>',
    howTo: '<ol><li>Na calculadora, selecione técnica ‘Com Prefermento’.</li><li>Escolha tipo (Poolish/Biga).</li><li>Insira % de farinha no prefermento (ex: 30 %).</li><li>O app calcula automaticamente farinha/água/fermento do prefermento e da massa final.</li><li>Salve como preset ou batch.</li></ol>',
    tips: [
      'Em ambiente quente (>28 °C): reduza % de prefermento ou diminua levedura no prefermento.',
      'Observe bolhas visíveis no prefermento — se passar do ponto, acidez excessiva pode afetar cor e sabor.',
      'Registre no diário quantidade de prefermento + resultado para futuras comparações.'
    ],
    reference: {
      name: 'The Complete Guide to Preferment in Pizza Dough',
      url: 'https://www.pizzablab.com/learning-and-resources/general-articles/guide-to-preferments/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'mistura_tempos_amassamento',
    section: TutorialSection.TECHNIQUES,
    title: 'Mistura e tempos de amassamento: como impactam a massa',
    image: 'placeholder_url_mistura_amassamento.jpg',
    intro: 'A fase de mistura/amassamento da massa (miscelagem, sova ou dobras) define a formação da rede de glúten, o alinhamento das proteínas e bolhas de gás, e afeta como a massa crescerá e assará. Conforme revisão acadêmica sobre mixagem em alimentos fermentados, as forças de cisalhamento e padrões de fluxo influenciam aroma, textura e qualidade final.',
    why: '<ul><li>Sob-desenvolver glúten → massa que rasga ou não cresce adequadamente.</li><li>Sobremisturar → massa muito elástica, difícil de abrir e com miolo fechado.</li><li>Controlar essa variável ajuda a repetir receitas com exatidão.</li></ul>',
    howTo: '<ol><li>Na calculadora, abra opção ‘Tempo/Dobras’.</li><li>Selecione tecnologia de amassamento (mão/misturador).</li><li>Vá em modo avançado para ajustar número de minutos ou dobras.</li><li>Execute e salve resultado no diário para comparar desempenho.</li></ol>',
    tips: [
      'Em farinhas de alta proteína (>13 %), prefira menor tempo de amassamento para evitar endurecimento.',
      'Fazer autólise antes (20-30 min) reduz necessidade de sova intensa.',
      'Use termômetro: se massa aquece mais que ~28 °C no amassamento, reduza tempo ou adicione gelo.'
    ],
    reference: {
      name: 'Impact of Mixing on Flavor and Aroma Development in Fermented Foods',
      url: 'https://arxiv.org/abs/2412.10190'
    },
    accessLevel: 'pro'
  },
  {
    id: 'controle_temp_umidade_ambiente',
    section: TutorialSection.ENVIRONMENT,
    title: 'Controle de Temperatura e Umidade Ambiente',
    image: 'placeholder_url_controle_ambiente_massa.jpg',
    intro: 'A temperatura e a umidade do ambiente em que a massa é preparada e fermentada têm impacto direto sobre a fermentação, crescimento de bolhas, maturação enzimática e mesmo sabor final. O app ajuda a ajustar a receita para compensar essas variações.',
    why: '<ul><li>Massa em ambiente quente fermenta rapidamente demais → pode perder estrutura ou sabor.</li><li>Ambiente frio → fermentação lenta, mais risco de subcrescimento ou textura densa.</li><li>Ajustar com dados aumenta precisão e evita o erro do “depende”.</li></ul>',
    howTo: '<ol><li>Use termômetro para medir temp. ambiente e temp. da farinha.</li><li>No app, selecione ‘Ambiente’ e insira os valores.</li><li>O sistema sugere ou ajusta automaticamente: temperatura da água / % fermento / tempo de bulk.</li><li>Salve essa condição no diário e acompanhe variações.</li></ol>',
    tips: [
      'Em ambientes > 30 °C, adicione gelo à água ou reduza fermento ~10-20%.',
      'Em climas secos (<30 % UR), reduza hidratação em ~2% para compensar absorção mais rápida.',
      'Salve histórico de ambiente vs. resultado para construir um padrão pessoal.'
    ],
    reference: {
      name: 'Hydration in Bread Dough, explained',
      url: 'https://www.kingarthurbaking.com/blog/2023/01/11/bread-hydration'
    },
    accessLevel: 'pro'
  },
  {
    id: 'metodos_cozimento_superficies',
    section: TutorialSection.TECHNIQUES,
    title: 'Métodos de Cozimento & Superfícies de Forno',
    image: 'placeholder_url_forno_superficie.jpg',
    intro: 'O tipo de forno e da superfície de cocção (pedra, aço, lastro) mudam radicalmente o comportamento da massa. O app permite ajustar o perfil do seu forno e a calculadora sugere ajustes de receita para adaptar à sua realidade.',
    why: '<ul><li>Uma receita “universal” ignora variáveis críticas de forno.</li><li>Adaptar cozimento ao seu equipamento maximiza textura e crocância.</li><li>Empodera o usuário a obter resultados de pizzaria em forno doméstico.</li></ul>',
    howTo: '<ol><li>No perfil do usuário, cadastre seu forno: tipo, max °C, base (aço/pedra).</li><li>Na calculadora, selecione seu forno e o app ajusta automaticamente os parâmetros.</li><li>Após cocção, registre o resultado para histórico e ajustes futuros.</li></ol>',
    tips: [
      'Em forno doméstico ≤ 300 °C: aumentar óleo (~1%) e reduzir hidratação ~2%.',
      'Pizzas a lenha 485 °C: hidratação ~60-62%, base de pedra com baixa condutividade.',
      'Verifique se a pedra ou aço estão devidamente pré-aquecidos por ≥30 min.'
    ],
    reference: {
      name: 'The Physics of baking good Pizza',
      url: 'https://arxiv.org/abs/1806.08790'
    },
    accessLevel: 'pro'
  },
  {
    id: 'tecnica_autolise',
    section: TutorialSection.TECHNIQUES,
    title: 'Técnica Autólise – Aumentando Extensibilidade e Volume',
    image: 'placeholder_url_autolyse.jpg',
    intro: 'A autólise consiste em misturar apenas farinha e água, descansar, e só depois adicionar sal e o restante. Essa pausa permite que o glúten se desenvolva com menos sova, resultando em massa mais extensível.',
    why: '<ul><li>Facilita manuseio de massas de alta hidratação.</li><li>Reduz necessidade de sova prolongada.</li><li>Aumenta volume e textura do miolo sem alterar a fórmula.</li></ul>',
    howTo: '<ol><li>Ative ‘Usar Autólise’ na calculadora.</li><li>Insira o tempo de autólise desejado (ex: 30 min).</li><li>O app ajusta o processo e exibe instruções de descanso antes da sova.</li><li>Grave o resultado no diário e compare com versões sem autólise.</li></ol>',
    tips: [
      'Em farinhas de alto W (>300): autólise de 40-45 min pode melhorar a estrutura.',
      'Se o ambiente estiver frio (<20 °C): aqueça a água alguns graus.',
      'Use recipiente fechado para evitar ressecamento.'
    ],
    reference: {
      name: 'Raymond Calvel – The Taste of Bread',
      url: 'https://en.wikipedia.org/wiki/Raymond_Calvel'
    },
    accessLevel: 'free'
  },
  {
    id: 'tecnica_tangzhong_yudane',
    section: TutorialSection.TECHNIQUES,
    title: 'Técnica Tangzhong/Yudane para Massas Enriquecidas',
    image: 'placeholder_url_tangzhong.jpg',
    intro: 'A técnica Tangzhong (ou Yudane) envolve cozinhar uma parte da farinha com água/leite a ~65 °C para formar um gel. Adicionado à massa, permite maior absorção de líquido, maciez e maior tempo de frescor.',
    why: '<ul><li>Permite aumentar a hidratação sem tornar a massa incontrolável.</li><li>Perfis híbridos de pizza (ex: borda estilo pão) se beneficiam.</li><li>Diferenciação do app com uma técnica avançada.</li></ul>',
    howTo: '<ol><li>Na calculadora, marque “Usar Tangzhong”.</li><li>Insira % da farinha a ser usada no tangzhong (ex: 20%).</li><li>O app calcula e ajusta a hidratação da massa final.</li><li>Salve o resultado e registre as melhorias percebidas.</li></ol>',
    tips: [
      'Ideal para massas com óleo ou manteiga (>2%).',
      'Mantenha o restante da hidratação da massa equilibrada.',
      'Tangzhong tende a escurecer a crosta mais rápido.'
    ],
    reference: {
      name: 'Tangzhong – Technique of Making Yeast Dough',
      url: 'https://en.wikipedia.org/wiki/Tangzhong'
    },
    accessLevel: 'pro'
  },
  {
    id: 'modo_reverso_adaptativo2',
    section: TutorialSection.TECHNIQUES,
    title: 'Modo Reverso Adaptativo: Fazer Receitas com o que Você Tem',
    image: 'placeholder_url_modo_reverso_adaptativo2.jpg',
    intro: 'Para entusiastas que já têm um ingrediente fixo (como 300 g de levain), o “Modo Reverso” permite inserir esse parâmetro e calcular automaticamente o restante da receita, evitando desperdício.',
    why: '<ul><li>Resolve o cenário real de cozinha “o que tenho em mãos?”.</li><li>Aumenta a retenção do usuário.</li><li>Cria diferencial competitivo frente às calculadoras simples.</li></ul>',
    howTo: '<ol><li>Selecione “Modo Reverso” na calculadora.</li><li>Insira o parâmetro que você conhece.</li><li>O sistema recalcula automaticamente o restante.</li><li>Salve como novo preset ou batch.</li></ol>',
    tips: [
      'Use para ‘sobras’ de levain, farinha ou tempos limitados.',
      'Marque no diário “Modo Reverso usado” para consultar com frequência.',
      'Observe padrões para calibrar de forma personalizada.'
    ],
    reference: {
      name: 'MyPizzaCorner – Common Dough Problems and How to Fix Them',
      url: 'https://mypizzacorner.com/pizza-tips/pizza-dough-problems/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'alta_hidratacao_tecnicas',
    section: TutorialSection.INGREDIENTS,
    title: 'Alta Hidratação: Técnicas para Miolo Aberto e Textura Leve',
    image: 'placeholder_url_alta_hidracao.jpg',
    intro: 'Massas com hidratação elevada (> 70 %) oferecem miolos mais abertos e textura leve, mas exigem bom manuseio e farinha de qualidade. Este card aborda o contexto, riscos e ajustes recomendados.',
    why: '<ul><li>Aperfeiçoamento técnico para quem busca nível de pizzaiolo.</li><li>Aumenta a satisfação e o “orgulho do resultado”.</li><li>Permite diferenciação do app.</li></ul>',
    howTo: '<ol><li>No modo avançado, ative “Hidratação Livre” e insira o valor.</li><li>O app ajusta automaticamente as recomendações.</li><li>Siga as instruções de manuseio (autólise, dobras).</li><li>Salve o resultado, registre e compare.</li></ol>',
    tips: [
      'Usar farinha forte (>13% proteína) e forno potente (>400 °C) facilita.',
      'Em forno doméstico limitado, prefira 66-68%.',
      'Documente cada fornada para entender a tolerância da sua cozinha.'
    ],
    reference: {
      name: 'Baking Science: Dough Hydration',
      url: 'https://beginwithbutter.com/baking-science-dough-hydration/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'gerenciar_batch_diario',
    section: TutorialSection.TROUBLESHOOTING,
    title: 'Gerenciar Batch e Diário de Fornadas',
    image: 'placeholder_url_diario_batches.jpg',
    intro: 'O módulo de *Diário de Batches* oferece registro de foto, parâmetros, nota e anotações, com análise automática de consistência para transformar experimentação em aprendizado.',
    why: '<ul><li>Transformar experimentação em aprendizado e repetibilidade.</li><li>Aumentar o engajamento do usuário.</li><li>Preparar base para módulos avançados de “insights”.</li></ul>',
    howTo: '<ol><li>Após finalizar, clique “Salvar Batch”.</li><li>Preencha foto, nota e anotações.</li><li>Periodicamente, acesse “Relatórios” para ver gráficos.</li><li>Use filtros para identificar melhores parâmetros.</li></ol>',
    tips: [
      'Use fotos consistentes para comparativos visuais.',
      'Aplique etiquetas (“erro: over-proof”) para filtro rápido.',
      'Exporte o relatório trimestral para ver seu progresso.'
    ],
    reference: {
      name: 'Production of pizza dough with reduced fermentation time',
      url: 'https://www.redalyc.org/pdf/3959/395940114010.pdf'
    },
    accessLevel: 'free'
  },
  {
    id: 'cadastro_farinhas_substituicoes',
    section: TutorialSection.INGREDIENTS,
    title: 'Cadastro de Farinhas e Substituições Inteligentes',
    image: 'placeholder_url_cadastro_farinhas.jpg',
    intro: 'Entender sua farinha é um diferencial. O app permite cadastrar “Minha Farinha”, inserir valores técnicos, e ativar “substituição sugerida” se a sua marca não estiver disponível.',
    why: '<ul><li>Sem saber sua farinha, você depende do “feeling”.</li><li>O cadastro cria histórico e valor percebido premium.</li><li>Substituições evitam frustração na hora da compra.</li></ul>',
    howTo: '<ol><li>Acesse o módulo “Farinha” > “Adicionar nova”.</li><li>Insira marca, lote, % proteína, etc.</li><li>Na calculadora, selecione a farinha cadastrada.</li><li>Ative “Substituir automaticamente por similar”.</li></ol>',
    tips: [
      'Teste nova farinha com um lote pequeno.',
      'Atualize o lote quando trocar de saco de farinha.',
      'Compare entre marcas e salve a nota no diário.'
    ],
    reference: {
      name: 'Milling Technology: Interpreting Functional Properties',
      url: 'https://www.cerealscanada.ca/wp-content/uploads/2020/05/Milling-Technology-Interpretation.pdf'
    },
    accessLevel: 'pro'
  },
  {
    id: 'sustentabilidade_impacto_ambiental',
    section: TutorialSection.ENVIRONMENT,
    title: 'Sustentabilidade & Impacto Ambiental nas Massas',
    image: 'placeholder_url_sustentabilidade_massas.jpg',
    intro: 'O módulo de *Impacto Ambiental* calcula CO₂ e água estimados por batch, dá sugestões de farinhas locais, fermentações longas (menos energia) e reaproveitamento de sobras.',
    why: '<ul><li>Diferenciar o app com valor alinhado a consumo consciente.</li><li>O usuário se sente bem ao ver seu impacto positivo.</li><li>Pode abrir caminho para parcerias com marcas sustentáveis.</li></ul>',
    howTo: '<ol><li>No módulo “Sustentabilidade”, ative ‘Calcular impacto’.</li><li>Insira os ingredientes e sua origem.</li><li>O sistema calcula a estimativa de impacto.</li><li>Receba sugestões de melhoria.</li></ol>',
    tips: [
      'Use farinha de origem local para reduzir o impacto do transporte.',
      'Faça fermentações longas para menor consumo de energia.',
      'Reaproveite sobras de massa para novos produtos.'
    ],
    reference: {
      name: 'Effect of different producing methods on physicochemical properties of dough',
      url: 'https://www.sciencedirect.com/science/article/pii/S0889157523001424'
    },
    accessLevel: 'pro'
  },
  {
    id: 'assistente_voz_comandos',
    section: TutorialSection.TECHNIQUES,
    title: 'Assistente por Voz e Comandos de Cozinha',
    image: 'placeholder_url_assistente_voz.jpg',
    intro: 'A integração com assistentes de voz (Google, Siri) permite comandos como “próximo passo” ou “tempo de bulk restante”, ideal para quando você está com as mãos na massa.',
    why: '<ul><li>Incrementa a usabilidade prática.</li><li>Fortalece a percepção de “ferramenta de nível profissional”.</li><li>Aumenta a retenção pois o app acompanha a produção.</li></ul>',
    howTo: '<ol><li>Em Configurações > Assistente de Voz > Ativar.</li><li>Vincule seu assistente e grave comandos personalizados.</li><li>Durante a produção, use a voz para avançar etapas ou adicionar notas.</li><li>Salve comandos favoritos.</li></ol>',
    tips: [
      'Use microfone em ambiente isolado para evitar acionamentos acidentais.',
      'Grave comandos curtos e claros.',
      'Anote quantas vezes usou o modo voz e veja se acelera seu processo.'
    ],
    reference: {
      name: 'Modernist Bread – Techniques & Equipment',
      url: 'https://modernistcuisine.com/books/modernist-bread/'
    },
    accessLevel: 'pro'
  },
  {
    id: 'leaderboard_desafios_comunidade',
    section: TutorialSection.FUNDAMENTALS,
    title: 'Leaderboard e Desafios Semanais da Comunidade',
    image: 'placeholder_url_leaderboard_desafios.jpg',
    intro: 'A gamificação com *Leaderboard de Batches* e *Desafios Semanais* torna o app mais engajador, com badges de progresso e ranking por pontos para motivar a produção diária.',
    why: '<ul><li>Engajamento contínuo: usuários voltam para competir e aprender.</li><li>Comunidade cria ciclo de feedback.</li><li>Eleva o app de utilitário para plataforma social.</li></ul>',
    howTo: '<ol><li>Ative o “Modo Comunidade” no seu perfil.</li><li>Complete o primeiro desafio semanal.</li><li>Suba no leaderboard e ganhe seu primeiro badge.</li><li>Consulte o ranking e compare seus pontos com a comunidade.</li></ol>',
    tips: [
      'Incentive amigos a competirem.',
      'Ofereça badges visuais para compartilhar no Instagram.',
      'Use notificações para lembrar dos desafios.'
    ],
    reference: {
      name: 'Serious Eats – The Pizza Lab: Three Doughs to Know',
      url: 'https://www.seriouseats.com/the-pizza-lab-three-doughs-to-know'
    },
    accessLevel: 'pro'
  }
];