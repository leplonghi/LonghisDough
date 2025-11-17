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

const BallingTechniquePage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Boleamento: A Ciência da Tensão Superficial"
      subtitle="Como a técnica correta de bolear organiza o glúten e prepara a massa para uma fermentação final perfeita."
    >
        <Section title="Como a Tensão Superficial Organiza o Glúten">
            <p>O boleamento é o processo de dar à porção de massa um formato de bola. A técnica correta envolve dobrar a massa sobre si mesma e arrastá-la levemente contra a bancada. Isso cria uma "pele" tensionada na superfície da bola. Essa tensão superficial alinha as fibras de glúten da camada externa, criando uma estrutura organizada e coesa.</p>
        </Section>
        <Section title="Retenção de Gases">
            <p>A "pele" tensionada criada pelo boleamento atua como uma membrana mais forte, melhorando a capacidade da massa de reter o gás CO₂ que será produzido durante a fermentação final. Uma boa tensão superficial é fundamental para que a bola de massa infle uniformemente, em vez de simplesmente se espalhar.</p>
        </Section>
        <Section title="Comportamento na Abertura">
            <p>Uma bola bem boleada, com tensão uniforme, é mais fácil de abrir em um disco redondo e homogêneo. A estrutura organizada permite que a massa se estique de forma previsível. Uma bola sem tensão ou com tensão irregular pode se espalhar de forma desigual ou rasgar em pontos fracos.</p>
        </Section>
        <Section title="Papel da Uniformidade">
            <p>Bolear todas as porções de massa da mesma maneira e com a mesma tensão garante que todas fermentem em um ritmo similar e se comportem de forma consistente na hora de abrir e assar. A uniformidade é um pilar da produção profissional.</p>
        </Section>
        <Section title="Riscos do Boleamento Inadequado">
            <ul>
                <li><strong>Boleamento Fraco (pouca tensão):</strong> A massa tende a se espalhar horizontalmente ("pancaking") em vez de crescer para cima, resultando em uma borda (cornicione) menos pronunciada.</li>
                <li><strong>Boleamento Excessivo (muita tensão):</strong> Pode-se criar uma "pele" tão apertada que restringe a expansão da massa. Além disso, o excesso de manipulação pode desgaseificar a massa e exigir um tempo de descanso mais longo para relaxar o glúten.</li>
            </ul>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Ooni Learn</li>
              <li>Guias de panificação profissional (ex: San Francisco Baking Institute)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default BallingTechniquePage;