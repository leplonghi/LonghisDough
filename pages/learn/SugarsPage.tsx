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

const SugarsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Açúcares, Maltes e Enzimas"
      subtitle="O papel na fermentação, cor e sabor da crosta."
    >
        <Section title="Introdução: A Energia da Massa">
            <p>Os açúcares, em suas diversas formas, são a principal fonte de energia para a fermentação. A farinha de trigo já contém amidos, que são cadeias longas de açúcar, mas são as enzimas que os quebram em açúcares simples que a levedura pode consumir.</p>
        </Section>
        <Section title="Açúcares como Alimento para Leveduras">
            <p>A levedura metaboliza açúcares simples (como glicose e frutose) para produzir CO₂ e etanol. A adição de pequenas quantidades de açúcar pode dar um "empurrão" inicial na fermentação. No entanto, em excesso, o açúcar pode retardar a fermentação por efeito osmótico, de forma similar ao sal.</p>
        </Section>
        <Section title="Caramelização e Reação de Maillard">
            <p>Os açúcares residuais na massa (aqueles que não foram consumidos pela levedura) são cruciais para a cor da crosta. Durante o assamento, eles participam de duas reações químicas fundamentais: a <strong>Caramelização</strong> (degradação do açúcar pelo calor) e a <strong>Reação de Maillard</strong> (reação entre açúcares e aminoácidos), que juntas criam a cor dourada e os sabores complexos da crosta.</p>
        </Section>
        <Section title="Maltos e a Ação Enzimática">
            <p>A farinha naturalmente contém enzimas chamadas <strong>amilases</strong>. A farinha maltada (ou extrato de malte) é frequentemente adicionada para suplementar essa atividade enzimática. As amilases quebram os amidos complexos da farinha em açúcares mais simples, incluindo o malte (maltose), garantindo um suprimento constante de alimento para a levedura ao longo de fermentações mais longas e açúcares residuais para o browning.</p>
        </Section>
        <Section title="Impacto no Aroma e na Cor da Crosta">
            <p>Uma massa com uma quantidade adequada de açúcares residuais desenvolverá uma crosta com cor rica e aroma de pão tostado. A falta de açúcar disponível (seja por fermentação curta que não quebrou amido, ou por fermentação longa que consumiu tudo) resultará em uma crosta pálida e com sabor menos desenvolvido.</p>
        </Section>
        <Section title="Comportamento de Massas com Mais ou Menos Açúcares">
            <ul>
                <li><strong>Massas com mais açúcares livres:</strong> Tendem a dourar mais rápido e de forma mais intensa, o que pode ser benéfico em fornos domésticos de temperatura mais baixa. Também podem resultar em um miolo mais macio.</li>
                <li><strong>Massas com menos açúcares livres:</strong> Exigem temperaturas mais altas ou tempos de cozimento mais longos para alcançar uma boa coloração. É o caso de estilos tradicionais como a Pizza Napolitana, que não leva açúcar adicionado.</li>
            </ul>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>Modernist Pizza</li>
              <li>Wikipedia (Maillard Reaction, Caramelization)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SugarsPage;
