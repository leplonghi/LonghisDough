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

const WaterPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Água: Composição e Impacto Qualitativo"
      subtitle="A ciência por trás do ingrediente que dá vida à massa."
    >
        <Section title="Introdução: Mais que H₂O">
            <p>A água é o solvente universal da panificação. Ela não apenas hidrata a farinha, mas também dissolve o sal, ativa o fermento e permite que as enzimas comecem seu trabalho. A composição mineral da água, especialmente sua "dureza", tem um impacto sutil, mas significativo, na massa.</p>
        </Section>
        <Section title="Minerais e Dureza da Água">
            <p>A dureza da água refere-se à concentração de minerais dissolvidos, principalmente cálcio e magnésio. Uma água "branda" tem poucos minerais, enquanto uma água "dura" tem uma concentração mais elevada. Esses minerais interagem diretamente com a estrutura da massa.</p>
        </Section>
        <Section title="Efeito da Dureza na Estrutura do Glúten">
            <p>Os minerais na água dura, como o cálcio, fortalecem as ligações da rede de glúten. Isso resulta em uma massa mais forte e tenaz. Em contraste, a água muito branda pode resultar em uma massa mais pegajosa e relaxada, pois o glúten não recebe esse reforço mineral.</p>
        </Section>
        <Section title="Impacto na Fermentação">
            <p>Os minerais na água também servem como nutrientes para a levedura, promovendo uma fermentação saudável. Água excessivamente branda ou desmineralizada pode retardar a atividade da levedura. Por outro lado, água extremamente dura pode inibir a fermentação.</p>
        </Section>
        <Section title="Águas Brandas vs. Águas Duras">
            <ul>
                <li><strong>Água Branda:</strong> Tende a produzir massas mais moles e pegajosas. A fermentação pode ser um pouco mais lenta.</li>
                <li><strong>Água Dura:</strong> Produz massas mais firmes e fortes, com maior tolerância à fermentação. Em excesso, pode tornar a massa rígida demais.</li>
            </ul>
            <p>Geralmente, uma água de dureza moderada é considerada ideal para a panificação.</p>
        </Section>
        <Section title="Essencial para Hidratação e Processos Enzimáticos">
            <p>Independentemente da sua dureza, a função primária da água é a hidratação. Ela permite que as proteínas da farinha (gliadina e glutenina) se unam para formar o glúten e ativa as enzimas amilase e protease, que são cruciais para quebrar amidos e proteínas, desenvolvendo o sabor e a estrutura da massa.</p>
        </Section>
        <Section title="Impacto no Sabor Final">
            <p>Embora sutil, a composição mineral da água pode influenciar o sabor final. Águas com perfis minerais distintos podem contribuir com notas de fundo que complementam o sabor do trigo fermentado.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking - Water in Baking</li>
              <li>Wikipedia (Water Hardness)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default WaterPage;
