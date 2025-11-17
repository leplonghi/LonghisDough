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

const FermentationBiochemistryPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Bioquímica da Fermentação"
      subtitle="A ciência por trás da transformação de farinha e água em uma estrutura complexa e cheia de sabor."
    >
        <Section title="Leveduras e Bactérias Ácido-Láticas (LAB)">
            <p>A fermentação é um processo metabólico realizado por microrganismos. Em massas, os principais atores são as leveduras (principalmente *Saccharomyces cerevisiae*) e, em fermentações naturais (levain), as bactérias ácido-láticas (LAB). As leveduras são primariamente responsáveis pela produção de gás, enquanto as LAB são cruciais para o desenvolvimento da acidez e complexidade de sabor.</p>
        </Section>
        <Section title="Produção de CO₂">
            <p>A levedura consome os açúcares simples disponíveis na massa (quebrados do amido da farinha por enzimas) e, como subproduto, libera dióxido de carbono (CO₂). Este gás fica aprisionado na rede de glúten, formando os alvéolos e fazendo a massa crescer.</p>
        </Section>
        <Section title="Ácidos Orgânicos">
            <p>As bactérias ácido-láticas produzem ácidos orgânicos, principalmente o ácido lático e o ácido acético. O ácido lático confere um sabor suave e de iogurte, enquanto o ácido acético é mais pungente, como o do vinagre. O equilíbrio entre esses ácidos é fundamental para o perfil de sabor final, especialmente em massas de longa fermentação.</p>
        </Section>
        <Section title="Compostos Aromáticos">
            <p>Além do CO₂ e dos ácidos, a fermentação gera uma vasta gama de compostos voláteis, como ésteres (com notas frutadas), álcoois e aldeídos. Esses compostos formam o "buquê" aromático da massa, contribuindo para o cheiro e sabor complexos do produto final assado.</p>
        </Section>
        <Section title="Efeito Qualitativo do Sal">
            <p>O sal desempenha um papel crucial de controle. Ele retarda a atividade da levedura por osmose, moderando a velocidade da fermentação. Isso permite que os processos de desenvolvimento de sabor ocorram de forma mais lenta e controlada, evitando uma produção de gás excessivamente rápida que poderia ocorrer antes que o sabor se desenvolvesse.</p>
        </Section>
        <Section title="Efeito Qualitativo da Farinha">
            <p>A farinha é a fonte de alimento para os microrganismos. O tipo de farinha influencia a fermentação. Farinhas integrais, por exemplo, contêm mais minerais e enzimas, o que pode acelerar a atividade fermentativa. A força da farinha (seu potencial de glúten) determina a capacidade da massa de reter o gás produzido.</p>
        </Section>
        <Section title="Riscos de Fermentação Descontrolada">
            <p>Uma fermentação muito rápida ou muito longa pode ser prejudicial. Se a levedura consumir todos os açúcares disponíveis muito cedo, a massa pode parar de crescer e não dourar bem no forno. Fermentação excessiva também pode levar a uma superprodução de ácidos e enzimas proteolíticas, que degradam a rede de glúten, resultando em uma massa fraca, pegajosa e com sabor excessivamente ácido.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking</li>
              <li>Wikipedia (Yeast, Lactic Acid Fermentation)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default FermentationBiochemistryPage;