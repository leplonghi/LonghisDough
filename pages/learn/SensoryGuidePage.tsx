import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon } from '../../components/IconComponents';

const Section: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
            {icon}
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            {children}
        </div>
    </div>
);

const SensoryGuidePage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Guia Sensorial para Ingredientes de Pizza"
      subtitle="Aprenda a analisar ingredientes pela sua química, aroma, textura e comportamento para criar combinações perfeitas."
      showReferencesSection
    >
      <Section title="Introdução ao Perfil Sensorial">
        <p>
          Cada ingrediente que colocamos em uma pizza possui um perfil sensorial único, que vai muito além do sabor. Entender esse perfil é a chave para criar combinações harmoniosas e evitar desequilíbrios. A análise sensorial profissional, baseada em fontes como "Modernist Pizza" e a ciência do "flavor pairing", avalia quatro eixos principais:
        </p>
        <ul>
            <li><strong>Aroma:</strong> Definido por compostos químicos voláteis que percebemos pelo olfato.</li>
            <li><strong>Sabor:</strong> A percepção na língua dos cinco gostos básicos: doce, salgado, ácido, amargo e umami.</li>
            <li><strong>Textura:</strong> A sensação física do ingrediente na boca, influenciada por sua estrutura (fibra), teor de gordura e água.</li>
            <li><strong>Comportamento Térmico:</strong> Como o ingrediente se transforma sob o calor do forno (evaporação, caramelização, reação de Maillard).</li>
        </ul>
      </Section>

      <Section title="Categoria: Queijos" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>Os aromas dos queijos vêm de compostos voláteis lipossolúveis, o que significa que são transportados pela gordura. A textura é um balanço entre a umidade e a gordura. Queijos jovens, com mais água, são mais elásticos e suaves. Queijos curados, com menos água e mais concentração de gorduras e proteínas quebradas, desenvolvem sabores muito mais intensos e complexos (umami). O risco principal é o "oil-out", quando a gordura se separa em queijos muito gordurosos.</p>
      </Section>

      <Section title="Categoria: Carnes e Embutidos">
        <p>O perfil sensorial é dominado por notas salgadas, defumadas e curadas. Os compostos aromáticos vêm tanto do processo de cura (reação de nitritos/nitratos com as proteínas da carne) quanto da defumação. A gordura derretida no forno age como um poderoso transporte de aroma, infundindo toda a pizza com seu sabor.</p>
      </Section>

      <Section title="Categoria: Vegetais">
        <p>Extremamente diversos. Cebolas e alho são ricos em compostos sulfurados, que se tornam doces e complexos com o calor. Cogumelos trazem notas terrosas (umami). Folhosos como rúcula trazem frescor e amargor. Seu principal desafio técnico é o alto teor de água, que impacta o cozimento da massa e precisa ser controlado (geralmente através de pré-cozimento) para que seu verdadeiro sabor se concentre e apareça.</p>
      </Section>

      <Section title="Categoria: Molhos e Tomates">
        <p>A percepção de frescor vem dos ácidos orgânicos, principalmente o cítrico e o málico. Quando crus, os tomates exibem notas frutadas e vibrantes. Após a redução (cozimento), a água evapora e os açúcares se concentram, resultando em notas mais doces e profundas. A pectina, um polissacarídeo natural, é o que controla a viscosidade do molho.</p>
      </Section>

      <Section title="Categoria: Ervas e Temperos">
        <p>Seu poder está nos compostos aromáticos extremamente voláteis. Ervas frescas como manjericão perdem esses compostos rapidamente com o calor, por isso sua aplicação ideal é pós-forno. Ervas secas, como o orégano, têm seus compostos mais estáveis e concentrados, mas perdem as notas frescas e delicadas.</p>
      </Section>
      
      <Section title="Como Interpretar um Ingrediente: Um Guia Prático" icon={<BookOpenIcon className="h-5 w-5" />}>
        <p>Antes de usar um novo ingrediente, faça a si mesmo estas perguntas científicas:</p>
        <ol>
            <li><strong>Qual é o seu aroma principal?</strong> (herbal, frutado, defumado, picante?) Isso ajuda a pensar em complementaridade.</li>
            <li><strong>Qual é a sua textura primária?</strong> (crocante, macio, fibroso, gorduroso?) Pense em criar contrastes de textura.</li>
            <li><strong>Qual a sua intensidade de sabor?</strong> (dominante ou sutil?) Ingredientes dominantes (como gorgonzola) pedem menos quantidade e parceiros mais neutros.</li>
            <li><strong>Quanta umidade disponível ele tem?</strong> (ele vai soltar água no forno?) Esta é a pergunta mais crítica para a saúde da sua massa.</li>
            <li><strong>Como ele reagirá ao calor?</strong> (vai queimar, derreter, caramelizar ou murchar?) Isso define se o ingrediente deve ser colocado por cima, por baixo do queijo ou adicionado pós-forno.</li>
        </ol>
      </Section>
    </TechnicalPageLayout>
  );
};

export default SensoryGuidePage;