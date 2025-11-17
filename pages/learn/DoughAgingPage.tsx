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

const DoughAgingPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Envelhecimento da Massa: Maturação e Degradação"
      subtitle="O que acontece com a massa ao longo do tempo, da maturação sensorial à retrogradação do amido."
    >
        <Section title="Envelhecimento do Glúten">
            <p>Com o tempo, a rede de glúten passa por um processo de relaxamento. As enzimas proteases, naturalmente presentes na farinha, começam a quebrar as longas cadeias de proteínas. Um envelhecimento controlado (como na fermentação a frio) resulta em uma massa mais extensível e macia. No entanto, um envelhecimento excessivo pode degradar tanto o glúten que a massa perde sua força, tornando-se fraca e pegajosa.</p>
        </Section>
        <Section title="Mudanças Aromáticas e Maturação Sensorial">
            <p>O "envelhecimento" da massa é sinônimo de maturação de sabor. Durante períodos prolongados, especialmente sob refrigeração, a atividade lenta de leveduras e bactérias produz uma gama muito mais ampla e complexa de compostos aromáticos (ésteres, álcoois, ácidos). Isso transforma o sabor da massa de algo simples e de "farinha" para algo com notas frutadas, lácticas e profundas.</p>
        </Section>
        <Section title="Retrogradação do Amido (Qualitativa)">
            <p>Após o cozimento, o amido que foi gelatinizado (absorveu água e inchou) começa a recristalizar e a liberar a água que havia absorvido. Este processo, conhecido como retrogradação do amido, é a principal causa do envelhecimento do pão e da pizza, tornando-os duros e secos. O processo é mais rápido em temperaturas de refrigeração do que em temperatura ambiente.</p>
        </Section>
        <Section title="Perda de Elasticidade">
            <p>Uma massa "envelhecida" (que passou do ponto de fermentação ideal) muitas vezes perde sua elasticidade. A degradação do glúten significa que a massa não tem mais a capacidade de "voltar" quando esticada e pode rasgar facilmente, pois sua estrutura de suporte foi comprometida.</p>
        </Section>
        <Section title="Risco da Massa 'Cansada'">
            <p>Uma massa "cansada" é aquela que foi fermentada por tempo demais. Ela pode apresentar um cheiro excessivamente alcoólico ou avinagrado, ter uma textura fraca e pegajosa, e não apresentar um bom "oven spring" no forno, resultando em um produto final plano e denso. É o resultado do esgotamento dos açúcares e da degradação da estrutura proteica.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>Wikipedia (Starch Retrogradation, Gluten)</li>
              <li>King Arthur Baking</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default DoughAgingPage;