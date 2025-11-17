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

const AmbientVsColdFermentationPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Fermentação Ambiente vs. Fria: Comparação Científica"
      subtitle="As diferenças fundamentais no resultado da massa com base na temperatura de fermentação."
    >
        <Section title="Diferenças de Velocidade">
            <p>A temperatura é o principal regulador da atividade da levedura. Em temperatura ambiente, a levedura está altamente ativa, produzindo CO₂ rapidamente. Em temperaturas frias (refrigeração), seu metabolismo desacelera drasticamente. Isso significa que a fermentação em temperatura ambiente é focada em volume rápido, enquanto a fermentação a frio é um processo lento e prolongado.</p>
        </Section>
        <Section title="Diferenças Sensoriais e de Sabor">
            <p>A fermentação a frio permite que as enzimas (amilases e proteases) e as bactérias ácido-láticas atuem por um período muito mais longo antes que a levedura consuma todos os açúcares. Isso resulta em uma maior quebra de amidos e proteínas, gerando uma gama muito mais complexa de compostos aromáticos e um sabor mais profundo e com mais nuances. A fermentação em ambiente, por ser rápida, produz um sabor mais simples e direto.</p>
        </Section>
        <Section title="Controle e Previsibilidade">
            <p>A fermentação a frio oferece um controle muito maior sobre o processo. A janela de tempo em que a massa está no seu ponto ideal é muito mais ampla, tornando o processo mais flexível e menos suscetível a erros de tempo. A fermentação em ambiente é muito sensível a pequenas variações de temperatura, tornando-a menos previsível.</p>
        </Section>
        <Section title="Impacto no Comportamento do Glúten">
            <p>Durante a longa fermentação a frio, a rede de glúten tem tempo para relaxar completamente sob a ação das proteases. Isso resulta em uma massa final significativamente mais extensível, macia e fácil de manusear, com menos "snap-back" (encolhimento).</p>
        </Section>
        <Section title="Riscos de Sub e Superfermentação">
            <p>Na fermentação em ambiente, o risco de superfermentação é alto se a massa for deixada por tempo demais. Na fermentação a frio, o risco principal é a subfermentação se a massa não tiver tido tempo suficiente para a atividade microbiana ou se a temperatura da geladeira for muito baixa. Uma massa super-fermentada a frio torna-se fraca e ácida; uma subfermentada torna-se densa.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Serious Eats - The Pizza Lab</li>
              <li>Ooni Learn</li>
              <li>King Arthur Baking</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default AmbientVsColdFermentationPage;