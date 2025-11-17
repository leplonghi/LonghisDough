import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BookOpenIcon } from '../../components/IconComponents';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            {children}
        </div>
    </div>
);

const ParbakingPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Pré-assamento e Duplo Assamento: Quando e Por Quê"
      subtitle="A ciência por trás da técnica de assar a massa em duas etapas para controlar a textura e a umidade."
    >
        <Section title="Vantagens do Duplo Assamento">
            <p>O pré-assamento (par-baking) ou o duplo assamento é uma técnica comum em estilos como a Pizza Romana (Teglia) e em pizzas de forma (pan pizza) com muitas coberturas úmidas. A principal vantagem é o controle sobre a umidade. Ao assar a base primeiro, cria-se uma estrutura selada e parcialmente cozida que é mais resistente à umidade dos ingredientes que serão adicionados na segunda etapa. Isso ajuda a garantir uma base crocante e a evitar a temida "gum line" (linha de massa crua).</p>
        </Section>
        <Section title="Efeito na Estrutura da Base">
            <p>O primeiro assamento gelatiniza o amido e fixa a estrutura do miolo. Isso cria uma base estável. No segundo assamento, o foco é aquecer as coberturas e finalizar a crocância da crosta, sem se preocupar tanto com o cozimento interno da massa. Essa técnica permite alcançar uma crocância que muitas vezes é difícil de obter em um único assamento, especialmente com fornos domésticos.</p>
        </Section>
        <Section title="Condução Térmica e Acabamento">
            <p>Em estilos como a "pizza alla pala" romana, a base pode ser assada diretamente no lastro do forno e, em seguida, finalizada com os ingredientes. O duplo assamento também é uma estratégia para otimizar a produção em pizzarias, permitindo que as bases sejam preparadas com antecedência.</p>
        </Section>
        <Section title="Riscos do Pré-assamento Exagerado">
            <p>O risco principal é secar demais a base no primeiro assamento. Se a base for excessivamente assada na primeira etapa, ela pode se tornar dura e quebradiça, como uma bolacha, em vez de crocante por fora e macia por dentro. O objetivo do pré-assamento é apenas firmar a estrutura, não cozinhá-la completamente.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>"Pizzarium" (referências ao estilo de Gabriele Bonci)</li>
              <li>Serious Eats – Pan Pizza Guides</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default ParbakingPage;