
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BeakerIcon, BookOpenIcon, SparklesIcon } from '../../../components/IconComponents';

const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
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

const YeastsPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Fermentos: O Motor Biológico da Massa"
      description="Uma análise científica sobre os microrganismos que dão vida, estrutura e sabor à pizza."
      category="Ingredientes"
    >
      <Section title="1. Introdução: O que é Fermento?">
        <p>
          Cientificamente, os fermentos utilizados na panificação são microrganismos unicelulares, primariamente da espécie <em>Saccharomyces cerevisiae</em>. Sua função é metabolizar os açúcares simples presentes na farinha através de um processo anaeróbico. Esse metabolismo gera dois subprodutos principais: <strong>dióxido de carbono (CO₂)</strong>, que fica aprisionado na rede de glúten e faz a massa crescer, e <strong>etanol</strong>. Além disso, o processo produz uma gama de compostos secundários, como ésteres e aldeídos, que são fundamentais para o desenvolvimento do aroma e sabor complexo da massa assada.
        </p>
      </Section>

      <Section title="2. Fermento Biológico Seco (IDY & ADY)" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
          O fermento seco é a levedura <em>S. cerevisiae</em> em estado dormente, desidratada. Sua principal vantagem, como apontado em "Modernist Bread", é a <strong>alta estabilidade</strong> e longa vida útil, o que o torna ideal para produção consistente em pizzarias e para uso doméstico. A reativação ocorre com a hidratação, sendo um método de alta previsibilidade.
        </p>
      </Section>
      
      <Section title="3. Fermento Biológico Fresco">
        <p>
          Vendido em blocos prensados com cerca de 70% de umidade, é a mesma levedura, mas em estado ativo. Apresenta <strong>maior atividade imediata</strong>, mas tem um prazo de validade muito curto e é sensível a variações de temperatura. É o fermento tradicional da panificação europeia.
        </p>
      </Section>

      <Section title="4. Fermentação Natural (Levain)">
        <p>
          Diferente dos fermentos comerciais, o levain é uma <strong>mistura simbiótica complexa</strong> de leveduras selvagens e bactérias ácido-láticas (LAB). As LAB produzem ácidos (lático e acético) que conferem o sabor ácido característico e uma estrutura de miolo diferente. A ação é mais lenta e complexa. (Detalhes completos estão no módulo Levain Pet).
        </p>
      </Section>

      <Section title="5. Fatores que Afetam a Fermentação">
        <p>A velocidade da fermentação é regulada por um balanço de fatores:</p>
        <ul>
            <li><strong>Temperatura:</strong> Regula a velocidade metabólica da levedura. A faixa ideal é 24-27°C.</li>
            <li><strong>Hidratação:</strong> Determina a mobilidade dos nutrientes e da levedura na massa.</li>
            <li><strong>Tipo de Farinha:</strong> Influencia a quantidade de açúcares (alimento) disponíveis. Farinhas integrais aceleram a fermentação.</li>
            <li><strong>Sal:</strong> Retarda a fermentação por osmose, controlando a atividade da levedura.</li>
            <li><strong>Gordura:</strong> Em excesso, pode revestir as células de levedura, dificultando a hidratação e retardando o processo.</li>
        </ul>
      </Section>

      <Section title="6. Aromas Produzidos" icon={<SparklesIcon className="h-5 w-5" />}>
        <p>A fermentação é um processo de criação de aromas. As leveduras e bactérias produzem uma vasta gama de compostos:</p>
        <ul>
            <li><strong>Leveduras:</strong> Geram álcoois, ésteres (notas frutadas) e compostos aromáticos leves.</li>
            <li><strong>Bactérias Ácido-Láticas (LAB):</strong> Produzem ácido lático (sabor suave de iogurte) e ácido acético (sabor pungente de vinagre).</li>
        </ul>
      </Section>

      <Section title="7. Riscos Comuns">
        <ul>
            <li><strong>Fermentação Excessiva (Over-proofing):</strong> A rede de glúten colapsa, resultando em uma massa fraca e pegajosa com sabor excessivamente ácido.</li>
            <li><strong>Fermentação Insuficiente (Under-proofing):</strong> Resulta em um produto final denso, pesado e com sabor subdesenvolvido.</li>
            <li><strong>Temperatura Alta:</strong> Leva a uma fermentação descontrolada, onde a produção de gás ocorre antes que o sabor tenha tempo de se desenvolver.</li>
        </ul>
      </Section>
      
      <Section title="8. Referências Técnicas" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Modernist Bread</li>
            <li>Modernist Pizza</li>
            <li>King Arthur Baking – Yeast 101 Guide</li>
            <li>Artigos de microbiologia sobre <em>Saccharomyces cerevisiae</em></li>
            <li>Wikipedia – Fermentação, Leveduras</li>
          </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default YeastsPage;
