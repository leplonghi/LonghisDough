
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

const SmokedAromaticsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Defumados e Aromáticos Intensos"
      subtitle="Como usar ingredientes de sabor dominante para criar complexidade sem sobrecarregar a pizza."
      showReferencesSection
    >
        <Section title="Defumação a Frio vs. a Quente (Conceitual)">
            <p>A <strong>defumação a frio</strong> expõe o alimento à fumaça em temperaturas que não o cozinham, focando puramente na absorção do aroma. É usada para ingredientes como o salmão defumado. A <strong>defumação a quente</strong> cozinha o alimento ao mesmo tempo em que o defuma, como no caso do bacon. O processo a quente pode criar uma camada externa mais seca ("película").</p>
        </Section>
        <Section title="Efeito Aromático Sobre Queijos e Molhos">
            <p>Os compostos da fumaça são potentes e podem infundir não apenas o ingrediente defumado, mas também os queijos e molhos ao redor durante o cozimento. Um bacon, por exemplo, libera sua gordura defumada, que se espalha e empresta seu aroma a toda a superfície da pizza.</p>
        </Section>
        <Section title="Riscos de Saturação de Sabores">
            <p>O principal risco ao usar ingredientes como queijos defumados, bacon ou anchovas é a saturação. O sabor intenso pode facilmente dominar o paladar, mascarando as notas mais sutis da massa fermentada e do molho de tomate. O equilíbrio é alcançado através da moderação na quantidade e da combinação com ingredientes mais neutros.</p>
        </Section>
        <Section title="Combinações Seguras e Tradicionais">
            <p>Para equilibrar um sabor defumado, a gastronomia clássica recorre a contrastes:</p>
            <ul>
                <li><strong>Doçura:</strong> Ingredientes como cebola caramelizada, mel ou figo contrastam e equilibram o salgado e o defumado.</li>
                <li><strong>Acidez:</strong> Um toque de acidez de picles ou um molho de tomate vibrante pode "cortar" a riqueza da gordura defumada.</li>
                <li><strong>Cremosidade:</strong> Uma base neutra como um creme de leite, ricota ou batata pode suavizar e diluir a intensidade do defumado.</li>
            </ul>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>"The Flavor Bible" de Karen Page e Andrew Dornenburg</li>
              <li>Modernist Cuisine</li>
              <li>Guias de charcutaria e defumação</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SmokedAromaticsPage;
