import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon, FireIcon } from '../../../components/IconComponents';

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

const OilsPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Óleos na Pizza"
      description="Uma análise técnica sobre como azeites e óleos funcionam como vetores de aroma e agentes de textura."
      category="Ingredientes"
    >
      <Section title="Introdução: Óleos como Vetores de Sabor">
        <p>
          Os óleos na pizza desempenham múltiplas funções que vão além de simplesmente adicionar gordura. Eles atuam como vetores de aroma, intensificadores de sabor, agentes de textura e moduladores de crocância. Quimicamente, os lipídios são excelentes em absorver e transportar compostos voláteis aromáticos (lipossolúveis) de outros ingredientes, como alho e ervas. Além disso, a gordura conduz calor de maneira diferente da água, influenciando a textura final da massa.
        </p>
      </Section>

      <Section title="Azeite de Oliva Extra Virgem (EVOO)" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
          O EVOO de alta qualidade é rico em polifenóis, que são compostos aromáticos voláteis responsáveis por suas notas frutadas, picantes e amargas. Esses compostos são delicados e se degradam sob o calor intenso do forno. Por essa razão, como apontado em fontes como "Modernist Pizza", o melhor uso para um EVOO de finalização é <strong>pós-forno</strong>, regado sobre a pizza quente para liberar seu aroma fresco sem alterá-lo.
        </p>
      </Section>

      <Section title="Óleo de Pimenta e Óleos Aromatizados">
        <p>
          A picância da pimenta (capsaicina) e os aromas de ervas são compostos lipossolúveis. Infundi-los em óleo cria um "extrato" concentrado que distribui o sabor de forma homogênea. O aquecimento pode alterar ligeiramente o perfil de alguns aromáticos, mas o resultado são notas fortes e persistentes que se integram bem à pizza.
        </p>
      </Section>

      <Section title="Óleo de Alho">
        <p>
          O alho contém compostos de enxofre (como a alicina) que são altamente aromáticos e solúveis em gordura. O óleo de alho é, portanto, muito potente e deve ser usado com moderação para não sobrepujar os outros sabores. Pode ser usado tanto antes de assar (para um sabor mais cozido e suave) quanto depois (para um sabor mais pungente).
        </p>
      </Section>
      
      <Section title="Óleos Neutros (Girassol, Canola)">
        <p>
          Enquanto a tradição italiana foca no azeite, estilos americanos como a pizza Detroit Style utilizam óleos neutros nas formas. O objetivo aqui não é sabor, mas função: o óleo praticamente "frita" as laterais e a base da massa, criando a crocância característica e o "frico" (crosta de queijo caramelizado) nas bordas.
        </p>
      </Section>

      <Section title="Comportamento Térmico" icon={<FireIcon className="h-5 w-5" />}>
        <p>
            O óleo não conduz calor com a mesma eficiência que uma superfície sólida como aço ou pedra. Um excesso de óleo na base da pizza pode, na verdade, isolar a massa, resultando em uma base menos dourada. O "oil-out" de queijos e carnes gordurosas já contribui com uma quantidade significativa de óleo na superfície.
        </p>
      </Section>

      <Section title="Aplicação Estratégica" icon={<SparklesIcon className="h-5 w-5" />}>
        <ul>
            <li><strong>Fios Pós-Forno:</strong> A melhor maneira de usar um azeite de oliva extra virgem de qualidade para destacar seu aroma.</li>
            <li><strong>Base Untada (Formas):</strong> Essencial para estilos como Detroit e Siciliana para criar uma base crocante e impedir que a massa grude.</li>
            <li><strong>Na Massa:</strong> Uma pequena porcentagem de óleo (1-3%) na própria massa, comum no estilo NY, ajuda a amaciar o miolo e a melhorar a coloração em fornos mais frios.</li>
        </ul>
      </Section>

      <Section title="Riscos e Cuidados">
        <ul>
            <li><strong>Sabor Enjoativo:</strong> Excesso de óleo, especialmente de baixa qualidade, pode deixar a pizza pesada e gordurosa.</li>
            <li><strong>Mascarar Sabores:</strong> Um óleo aromatizado muito potente pode dominar completamente o sabor do molho, do queijo e da massa.</li>
            <li><strong>Forno Doméstico:</strong> Em fornos mais frios, a gordura demora mais para aquecer, e o excesso pode resultar em uma pizza oleosa em vez de crocante.</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default OilsPage;