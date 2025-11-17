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

const WhiteSaucesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Molhos Brancos e Emulsões"
      subtitle="A ciência da consistência em bases cremosas para pizza."
    >
        <Section title="Introdução: A Química das Emulsões">
            <p>Molhos brancos, como o bechamel ou cremes à base de queijo, são emulsões — suspensões estáveis de gordura em um líquido (geralmente água ou leite). A estabilidade dessa emulsão é a chave para um molho cremoso que se comporta bem no forno, em vez de um molho que "quebra" e libera óleo.</p>
        </Section>
        <Section title="Emulsões Estáveis vs. Instáveis">
            <p>Uma <strong>emulsão estável</strong> é mantida por um agente emulsificante (como as proteínas do leite no bechamel ou a lecitina na gema de ovo). Esses agentes impedem que as gotículas de gordura se juntem. Uma <strong>emulsão instável</strong>, como um simples vinagrete, se separará rapidamente. Molhos para pizza precisam de estabilidade para resistir ao calor intenso.</p>
        </Section>
        <Section title="O Papel da Gordura Láctea">
            <p>A gordura do leite (nata, manteiga, queijo) é o que confere riqueza e sabor aos molhos brancos. Ela também carrega os compostos aromáticos solúveis em gordura. O desafio é manter essa gordura emulsificada. Amidos (como a farinha no bechamel) e proteínas ajudam a criar uma rede que aprisiona a gordura.</p>
        </Section>
        <Section title="Comportamento Térmico no Forno">
            <p>Sob o calor do forno, a água na emulsão começa a evaporar, concentrando o molho. Ao mesmo tempo, o calor pode desestabilizar a emulsão. Um molho bem-feito engrossará e dourará levemente (reação de Maillard das proteínas do leite), enquanto um molho malfeito se separará.</p>
        </Section>
        <Section title="Riscos de Separação ('Quebra')">
            <p>Um molho branco "quebra" quando a emulsão falha e a gordura se separa do líquido. Isso pode acontecer por várias razões:</p>
            <ul>
                <li><strong>Calor excessivo:</strong> O calor intenso pode desnaturar as proteínas que mantêm a emulsão.</li>
                <li><strong>Excesso de ácido:</strong> Ingredientes ácidos podem coagular as proteínas do leite, causando a separação.</li>
                <li><strong>Falta de agente emulsificante:</strong> O molho não tem estrutura suficiente para manter a gordura em suspensão.</li>
            </ul>
        </Section>
        <Section title="Usos em Pizzas Específicas">
            <p>Molhos brancos são a base para "pizzas brancas". Eles oferecem uma tela neutra e cremosa que combina bem com ingredientes como cogumelos, espinafre, batatas ou carnes curadas. Em focaccias, uma base de emulsão de azeite e água é frequentemente usada para manter a umidade e o sabor.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>"On Food and Cooking" de Harold McGee</li>
              <li>Modernist Cuisine</li>
              <li>Wikipedia (Emulsion, Bechamel Sauce)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default WhiteSaucesPage;
