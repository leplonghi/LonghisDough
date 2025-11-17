
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

const SmokedCheesesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Queijos Defumados: Aromas e Física da Fumaça"
      subtitle="Como a ciência da defumação cria sabores intensos e como usá-los com equilíbrio."
      showReferencesSection
    >
        <Section title="Defumação como Processo Físico-Químico">
            <p>A defumação é o processo de expor um alimento à fumaça da queima de madeira. A fumaça não é apenas calor; é um aerossol complexo contendo centenas de compostos químicos, como fenóis e aldeídos. Esses compostos se depositam na superfície do queijo, penetrando-o e conferindo o aroma e sabor característicos.</p>
        </Section>
        <Section title="Compostos de Fumaça e a Adesão à Gordura">
            <p>Muitos dos compostos aromáticos da fumaça são lipossolúveis, o que significa que eles se dissolvem em gordura. Como o queijo é rico em gordura, ele é um meio excelente para capturar e reter esses aromas. A gordura atua como um veículo, distribuindo o sabor defumado por todo o queijo.</p>
        </Section>
        <Section title="Impacto Aromático Intenso">
            <p>O sabor defumado é dominante e pode facilmente sobrepujar os outros ingredientes da pizza. Queijos como provolone defumado ou scamorza affumicata adicionam uma camada de complexidade profunda, mas seu uso requer atenção para não mascarar o sabor do molho ou da massa.</p>
        </Section>
        <Section title="Moderação é a Chave">
            <p>Devido à sua intensidade, os queijos defumados são frequentemente usados em combinação com queijos mais neutros, como a mozzarella. Uma mistura equilibrada permite obter o aroma da defumação sem sacrificar a textura e a suavidade da base de queijo.</p>
        </Section>
        <Section title="Pares Sensoriais Clássicos">
            <p>O sabor defumado harmoniza bem com ingredientes que oferecem contraste. Combinações clássicas incluem o uso de queijo defumado com carnes curadas (como bacon ou speck), vegetais adocicados (como cebola caramelizada) ou um toque de doçura (como um fio de mel).</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>"On Food and Cooking" de Harold McGee</li>
              <li>Modernist Cuisine</li>
              <li>Wikipedia (Smoking (cooking), Food Chemistry)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SmokedCheesesPage;
