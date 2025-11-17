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

const SensoryMaturationPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Maturação Sensorial Avançada"
      subtitle="A ciência por trás do desenvolvimento de aromas e sabores complexos em massas de longa fermentação."
    >
        <Section title="Formação de Aromas Complexos">
            <p>A maturação sensorial é o processo pelo qual a massa desenvolve um perfil de sabor e aroma que vai muito além do simples gosto de farinha. Em fermentações longas e controladas, a atividade lenta de leveduras, bactérias e enzimas gera uma vasta gama de compostos voláteis, como ésteres (notas frutadas), álcoois e ácidos orgânicos, que compõem o "buquê" final da massa.</p>
        </Section>
        <Section title="Interações Enzimáticas">
            <p>O tempo é o ingrediente secreto. Durante a maturação, as enzimas amilases continuam a quebrar o amido em açúcares simples, não apenas para alimentar a levedura, mas também para deixar açúcares residuais que contribuem para a Reação de Maillard e um sabor mais adocicado. Ao mesmo tempo, as proteases quebram as proteínas do glúten, contribuindo para a maciez e o desenvolvimento de precursores de sabor.</p>
        </Section>
        <Section title="Maciez, Extensibilidade e Plasticidade">
            <p>Uma massa sensorialmente madura não é apenas mais saborosa, mas também se comporta melhor. O relaxamento controlado do glúten ao longo do tempo resulta em uma massa com maior plasticidade (a capacidade de manter a forma após ser esticada) e extensibilidade, tornando-a mais fácil de abrir e resultando em uma textura final mais macia e menos borrachuda.</p>
        </Section>
        <Section title="Diferenças entre Fermentações Longas e Curtas">
            <p>Uma fermentação curta e quente é dominada pela produção de CO₂ e etanol, resultando em um sabor simples e direto. Uma fermentação longa e fria minimiza a produção de gás e maximiza a atividade enzimática e bacteriana, criando uma profundidade de sabor que é impossível de alcançar em poucas horas. É a diferença entre um pão comum e um pão artesanal de alta qualidade.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>Modernist Pizza</li>
              <li>"The Taste of Bread" de Raymond Calvel</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SensoryMaturationPage;