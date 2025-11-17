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

const MixingTechniquesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Técnicas de Mistura e Sova"
      subtitle="A ciência por trás do desenvolvimento do glúten através da manipulação manual e mecânica."
    >
        <Section title="Fricção Mecânica e Desenvolvimento do Glúten">
            <p>O objetivo principal da mistura e da sova é desenvolver a rede de glúten. A ação mecânica (seja das mãos ou do gancho de uma batedeira) estica e alinha as proteínas gliadina e glutenina, incentivando-as a formar ligações que criam uma rede forte e elástica. Esse processo gera calor por fricção, que também influencia a temperatura final da massa (DDT).</p>
        </Section>
        <Section title="Sova Tradicional">
            <p>A sova contínua em uma bancada promove o desenvolvimento rápido do glúten através da aplicação constante de força. O objetivo é alcançar a "janela de glúten" (windowpane test), um sinal de que a rede está bem formada. Esta técnica busca criar uma estrutura coesa e uniforme desde o início.</p>
        </Section>
        <Section title="Stretch & Fold (Dobras)">
            <p>Esta técnica é ideal para massas de alta hidratação. Em vez de uma sova contínua, a massa descansa e é gentilmente esticada e dobrada sobre si mesma em intervalos. As dobras criam tensão e alinham o glúten de forma mais passiva, usando o tempo a seu favor. O resultado é uma estrutura forte, mas com um miolo mais aberto e irregular.</p>
        </Section>
        <Section title="Método Rubaud">
            <p>Popularizado por padeiros artesanais, o método Rubaud é uma técnica de mistura manual feita dentro da própria tigela. Consiste em usar a mão como uma "colher" para levantar e dobrar a massa ritmicamente. É uma forma eficiente de incorporar ar e desenvolver o glúten inicial em massas pegajosas sem sujar a bancada.</p>
        </Section>
        <Section title="Mistura Excessiva vs. Insuficiente">
            <p>O equilíbrio é crucial. Uma <strong>mistura insuficiente</strong> resulta em uma rede de glúten fraca, que não retém gás adequadamente, levando a uma massa densa. Uma <strong>mistura excessiva</strong> pode superaquecer a massa e criar uma rede de glúten tão apertada e oxidada que a massa se torna difícil de esticar e perde a capacidade de fermentar corretamente.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking</li>
              <li>"Flour Water Salt Yeast" de Ken Forkish</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default MixingTechniquesPage;