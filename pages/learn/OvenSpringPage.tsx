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

const OvenSpringPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Oven Spring: A Ciência da Expansão Inicial"
      subtitle="Entenda o 'salto de forno', o fenômeno que define a textura e o volume da sua massa."
    >
        <Section title="Expansão Rápida dos Gases">
            <p>O "oven spring" é a expansão dramática e final que a massa sofre nos primeiros momentos dentro do forno. Este fenômeno é impulsionado por dois eventos físicos principais: a rápida expansão dos gases já aprisionados na massa (principalmente CO₂ da fermentação) e a criação de novo gás através da evaporação da água em vapor.</p>
        </Section>
        <Section title="Comportamento das Redes de Glúten">
            <p>A rede de glúten, desenvolvida durante a mistura e as dobras, atua como uma malha elástica que aprisiona esses gases. No calor do forno, essa rede se estica ao seu limite. Uma rede de glúten forte e bem desenvolvida é crucial para conter essa expansão violenta sem romper, permitindo que a massa infle e crie um miolo aerado.</p>
        </Section>
        <Section title="Elasticidade e Retenção de Gás">
            <p>A capacidade de uma massa de ter um bom "oven spring" depende do equilíbrio entre a elasticidade (a capacidade de esticar) e a tenacidade (a força para não romper) do glúten. Uma massa com boa retenção de gás manterá sua estrutura inflada, enquanto uma massa fraca pode colapsar.</p>
        </Section>
        <Section title="Influência Qualitativa da Hidratação">
            <p>Uma maior hidratação significa mais água disponível para se transformar em vapor. Esse vapor adicional cria uma pressão interna maior, contribuindo para uma expansão mais vigorosa e um miolo mais aberto. No entanto, hidratação alta requer uma rede de glúten forte o suficiente para conter essa pressão.</p>
        </Section>
        <Section title="Papel do Vapor Interno">
            <p>A transformação da água líquida em vapor é um evento de expansão massiva. O vapor gerado dentro da massa é um dos principais motores do "oven spring", inflando os alvéolos de dentro para fora. É um processo puramente físico que ocorre em paralelo com a expansão do CO₂.</p>
        </Section>
        <Section title="Colapso da Estrutura Fraca">
            <p>Se a rede de glúten estiver subdesenvolvida (falta de sova/dobras), super-fermentada (degradada por enzimas) ou feita com uma farinha muito fraca, ela não terá a força necessária para conter a expansão dos gases. Nesse caso, a estrutura pode romper, permitindo que o gás escape e resultando em uma massa densa e com pouco volume.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Modernist Bread</li>
              <li>King Arthur Baking</li>
              <li>Wikipedia (Gluten, Oven Spring)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default OvenSpringPage;