import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon } from '../../../components/IconComponents';

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

const OilsSpicesPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Ervas e Especiarias"
      description="A análise técnica dos finalizadores: como ervas e especiarias modulam o aroma e a complexidade da pizza."
      category="Ingredientes"
    >
      <Section title="Introdução: A Química dos Aromas">
        <p>
          Ervas e especiarias são a assinatura aromática de uma pizza, adicionando camadas de complexidade. Seu poder reside nos <strong>compostos orgânicos voláteis</strong> — moléculas leves que evaporam com o calor e são percebidas pelo nosso olfato. O perfil aromático depende da composição química (terpenos, fenóis, aldeídos) e do estado do ingrediente (fresco ou seco).
        </p>
      </Section>

      <Section title="Ervas Frescas: Vibratilidade e Delicadeza" icon={<SparklesIcon className="h-5 w-5" />}>
        <h4>a) Manjericão (Basil)</h4>
        <p>
          O aroma icônico do manjericão vem de compostos como o linalol, que são extremamente sensíveis ao calor. Como documentado pela tradição italiana e pela própria regra da AVPN (Associazione Verace Pizza Napoletana), o manjericão fresco deve ser adicionado <strong>pós-forno</strong> para preservar seu perfume.
        </p>
        
        <h4>b) Rúcula (Arugula)</h4>
        <p>
          Com suas notas amargas e frescas, a rúcula é usada como um contraponto para a riqueza de ingredientes como o presunto cru. Assim como o manjericão, ela é delicada e deve ser adicionada fresca sobre a pizza recém-saída do forno.
        </p>

        <h4>c) Salsa (Parsley)</h4>
        <p>
          A salsa oferece um aroma limpo e fresco e é moderadamente resistente ao calor, mas seu frescor é mais pronunciado quando adicionada no final.
        </p>
      </Section>
      
      <Section title="Ervas Secas: Sabor Concentrado" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
          O processo de secagem remove a água e concentra os compostos aromáticos da erva. Isso, no entanto, altera seu perfil de sabor, eliminando as notas mais frescas e "verdes". A grande vantagem das ervas secas é sua maior resistência ao calor.
        </p>
        <ul>
            <li><strong>Orégano Seco:</strong> Rico em fenóis potentes como o carvacrol, é resistente ao calor e ideal para ser misturado ao molho ou polvilhado sobre o queijo antes de assar, especialmente no estilo NY.</li>
            <li><strong>Manjericão Seco:</strong> Perde completamente o frescor e assume notas mais próximas do cravo. Não é um substituto para o manjericão fresco.</li>
            <li><strong>Tomilho Seco (Thyme):</strong> Seu principal composto, o timol, é robusto e terroso, combinando bem com cogumelos e carnes.</li>
        </ul>
      </Section>
      
      <Section title="Especiarias Clássicas">
        <ul>
            <li><strong>Pimenta Calabresa (Red Pepper Flakes):</strong> A picância vem da <strong>capsaicina</strong>, uma molécula termoestável, ou seja, não perde sua potência com o calor do forno.</li>
            <li><strong>Alho Granulado/Em Pó:</strong> O processo de desidratação confere ao alho um sabor mais adocicado. Deve ser protegido do calor direto para não queimar.</li>
            <li><strong>Alecrim (Rosemary):</strong> Rico em terpenos resistentes ao calor. Suas folhas podem ser usadas com moderação antes de assar para liberar um aroma resinoso.</li>
        </ul>
      </Section>

      <Section title="Aplicação: Pré ou Pós-Forno?" icon={<BookOpenIcon className="h-5 w-5" />}>
        <p>A regra geral é baseada na estabilidade química dos compostos aromáticos:</p>
        <ul>
            <li><strong>Pós-Forno:</strong> Ervas frescas e delicadas (manjericão, rúcula) para preservar o aroma.</li>
            <li><strong>Pré-Forno:</strong> Ervas secas (orégano) e especiarias resistentes, pois o calor ajuda a liberar seus aromas concentrados.</li>
        </ul>
      </Section>
      
      <Section title="Riscos e Cuidados">
        <ul>
            <li><strong>Queima:</strong> Ervas frescas queimam facilmente em fornos quentes, resultando em sabor amargo. Temperos secos também podem queimar se expostos diretamente ao calor intenso.</li>
            <li><strong>Exagero:</strong> Ervas e especiarias devem complementar, não dominar. O excesso de um tempero pode mascarar todos os outros sabores da pizza.</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default OilsSpicesPage;