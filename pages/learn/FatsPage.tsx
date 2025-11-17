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

const FatsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Gorduras na Massa: Estrutura, Sabor e Textura"
      subtitle="Uma visão comparativa sobre o papel de óleos, manteiga e outras gorduras."
    >
        <Section title="Introdução: O Agente de Maciez e Sabor">
            <p>As gorduras, sejam líquidas (óleos) ou sólidas (manteiga, banha), são adicionadas à massa para modificar sua textura, sabor e comportamento no forno. Elas atuam como um "amaciante", interferindo na formação do glúten e lubrificando a estrutura da massa.</p>
        </Section>
        <Section title="Interação das Gorduras com o Glúten">
            <p>As moléculas de gordura revestem as proteínas da farinha, o que interfere parcialmente na sua capacidade de se conectar e formar uma rede de glúten longa e rígida. Isso resulta em uma rede de glúten mais "curta" e fragmentada, o que se traduz em um miolo mais macio e menos "borrachudo".</p>
        </Section>
        <Section title="Impacto na Maciez e Extensibilidade">
            <p>Ao lubrificar a rede de glúten, a gordura aumenta a extensibilidade da massa, tornando-a mais fácil de esticar. O resultado final é um produto com um miolo mais macio, uma crosta mais tenra e uma vida útil mais longa, pois a gordura também retarda a retrogradação do amido (o processo que torna o pão velho).</p>
        </Section>
        <Section title="Impacto no Sabor e Textura Final">
            <p>Cada tipo de gordura contribui com um perfil de sabor distinto: o azeite de oliva traz notas frutadas, a manteiga confere um sabor rico e lácteo, e a banha, um sabor mais rústico. Além disso, as gorduras ajudam a conduzir o calor, contribuindo para uma crosta mais dourada e crocante, especialmente em estilos assados em formas (pan pizza).</p>
        </Section>
        <Section title="Quando São Tradicionais (e Quando Não São)">
            <ul>
                <li><strong>Tradicionais:</strong> A adição de óleo ou azeite é tradicional em estilos como a Pizza NY Style (para maciez), Romana e Focaccia (para sabor e crocância). A manteiga é essencial em massas ricas como o brioche, e a banha é usada em algumas receitas tradicionais de pizza.</li>
                <li><strong>Não Tradicionais:</strong> Estilos puristas como a Pizza Napolitana autêntica (seguindo as regras da AVPN) proíbem a adição de qualquer tipo de gordura na massa.</li>
            </ul>
        </Section>
        <Section title="Riscos do Excesso de Gordura na Massa">
            <p>Enquanto uma pequena quantidade de gordura é benéfica, o excesso pode ser prejudicial. Muita gordura pode revestir excessivamente as proteínas e o fermento, inibindo o desenvolvimento do glúten e retardando a fermentação. O resultado pode ser uma massa pesada, oleosa e com pouco volume.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>Modernist Pizza</li>
              <li>King Arthur Baking</li>
              <li>Serious Eats - The Pizza Lab</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default FatsPage;
