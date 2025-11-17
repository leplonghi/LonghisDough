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

const CrumbStructurePage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Estrutura Interna da Massa (Crumb)"
      subtitle="A ciência por trás da formação dos alvéolos e da textura do miolo da sua pizza ou pão."
    >
        <Section title="Formação dos Alvéolos">
            <p>Os alvéolos, ou as "bolhas" no miolo da massa, são bolsões de gás (CO₂) produzidos pela levedura durante a fermentação. Eles se formam em locais de nucleação na massa e crescem à medida que mais gás é produzido. O tamanho, a forma e a distribuição desses alvéolos definem a textura final, de um miolo fechado e uniforme a um miolo aberto e irregular.</p>
        </Section>
        <Section title="Tensões Internas e a Rede de Glúten">
            <p>A rede de glúten age como uma estrutura de suporte que aprisiona esses bolsões de gás. A estrutura do miolo é um equilíbrio entre a pressão do gás tentando expandir os alvéolos e a tensão da rede de glúten tentando contê-los. Uma rede de glúten forte e extensível permite que os alvéolos se expandam significativamente sem romper, resultando em um miolo leve e aerado.</p>
        </Section>
        <Section title="Impacto da Mistura e das Dobras">
            <p>As técnicas de manipulação da massa, como a sova e as dobras ("stretch and fold"), são fundamentais para organizar e fortalecer a rede de glúten. Elas alinham as proteínas, criam tensão e distribuem os gases de forma mais uniforme. Uma boa técnica de manipulação resulta em uma estrutura interna mais forte e com melhor capacidade de retenção de gás.</p>
        </Section>
        <Section title="O Colapso de Estruturas Extremas">
            <p>O equilíbrio é chave. Uma massa muito rígida (baixa hidratação e glúten superdesenvolvido) pode restringir a expansão dos gases, resultando em um miolo denso. Por outro lado, uma massa muito mole (alta hidratação com uma rede de glúten fraca) pode não ter força suficiente para sustentar os alvéolos, fazendo com que eles se rompam e a estrutura colapse, também resultando em um miolo denso e, muitas vezes, úmido.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking</li>
              <li>Serious Eats – The Pizza Lab</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default CrumbStructurePage;