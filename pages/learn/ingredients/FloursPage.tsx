
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BeakerIcon, BookOpenIcon, FireIcon } from '../../../components/IconComponents';

const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
            {icon}
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
            {children}
        </div>
    </div>
);

const FloursPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Farinhas para Pizza"
      description="Uma análise técnica do ingrediente mais importante da massa. Entenda como a escolha da farinha define a estrutura, o sabor e o comportamento da sua pizza."
      category="Ingredientes"
    >
      <Section title="Introdução: A Alma da Massa">
        <p>
          A farinha é a espinha dorsal da massa. É muito mais do que um simples pó; é um sistema complexo de amidos, proteínas, minerais e enzimas. Como documentado em fontes como "Modernist Pizza", a escolha da farinha influencia diretamente:
        </p>
        <ul>
            <li>A <strong>estrutura do glúten</strong>, que dá à massa sua força e elasticidade.</li>
            <li>A <strong>absorção de água</strong>, determinando a hidratação máxima que a massa pode suportar.</li>
            <li>A <strong>força (W)</strong> da massa, ou seja, sua capacidade de resistir a longas fermentações.</li>
            <li>A <strong>extensibilidade (P/L)</strong>, que define a facilidade com que a massa pode ser aberta sem rasgar ou encolher.</li>
            <li>O <strong>sabor final</strong>, influenciado pelo tipo de trigo e pelo teor de minerais.</li>
            <li>O <strong>comportamento no forno</strong>, incluindo a coloração da crosta e o "salto de forno" (oven spring).</li>
        </ul>
      </Section>

      <Section title="Tipos de Trigo: Duro vs. Mole" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>A maioria das farinhas para panificação vem do trigo, mas nem todo trigo é igual. A principal distinção, conforme a bioquímica do trigo, está entre o trigo duro e o mole.</p>
        <ul>
            <li><strong>Trigo Duro (Hard Wheat / Grano Duro):</strong> Rico em proteínas de alta qualidade, é a base para as farinhas "fortes". Ele forma uma rede de glúten robusta e elástica, ideal para pães artesanais e pizzas que exigem estrutura e longa fermentação.</li>
            <li><strong>Trigo Mole (Soft Wheat / Grano Tenero):</strong> Possui um teor de proteína mais baixo e um glúten mais fraco. É usado para produtos de confeitaria, bolos e, em misturas, para farinhas de pizza que buscam maciez e extensibilidade, como a "Tipo 00".</li>
        </ul>
        <p>A indústria de moagem frequentemente cria <strong>blends</strong> (misturas) de diferentes tipos de trigo para atingir um perfil de proteína e força específico para cada aplicação.</p>
      </Section>

      <Section title="Classificação de Farinhas Italianas">
        <p>A classificação italiana não se refere à força, mas sim ao grau de refino e ao teor de cinzas (minerais).</p>
        <ul>
            <li><strong>Tipo 00 (Doppio Zero):</strong> É a farinha mais refinada, moída a partir do centro do grão de trigo. Resulta em um pó muito fino e branco, com baixo teor de cinzas. É conhecida por criar uma massa macia e com ótima extensibilidade, sendo a escolha clássica para a Pizza Napolitana.</li>
            <li><strong>Tipo 0:</strong> Um pouco menos refinada que a 00, contém uma pequena porção a mais do farelo do grão. É ligeiramente mais forte e absorve um pouco mais de água, sendo também uma excelente opção para pizzas.</li>
            <li><strong>Rimacinata (Sêmola Re-moída):</strong> Feita a partir do trigo duro (grano duro), a sêmola é moída duas vezes para obter uma textura fina. É famosa no estilo de pizza romana (Pala/Teglia) por adicionar uma textura crocante e uma cor amarelada à massa. Também é excelente para polvilhar na bancada ao abrir a massa.</li>
        </ul>
      </Section>
      
      <Section title="Força da Farinha (W)">
        <p>O Fator W é a medida mais precisa da força de uma farinha, obtida em laboratório com o Alveógrafo de Chopin. Ele mede a energia necessária para expandir a massa, indicando sua capacidade de fermentação.</p>
        <ul>
            <li>Uma <strong>farinha forte (W alto)</strong> forma uma rede de glúten robusta, capaz de reter grandes quantidades de gás (CO₂) por longos períodos. É ideal para fermentações longas, especialmente a frio (24-72h), e para massas de alta hidratação.</li>
            <li>Uma <strong>farinha fraca (W baixo)</strong> desenvolve um glúten mais delicado, que não suporta fermentações prolongadas e pode rasgar com facilidade. É adequada para processos rápidos e produtos de confeitaria.</li>
            <li>Cada estilo de pizza tem uma faixa de W ideal. A Napolitana clássica, por exemplo, busca um equilíbrio, enquanto estilos como a Romana in Teglia exigem farinhas muito mais fortes.</li>
        </ul>
      </Section>

      <Section title="Índice P/L: Elasticidade vs. Extensibilidade">
        <p>O P/L é outra medida crucial do Alveógrafo. Ele descreve o equilíbrio entre a tenacidade (P - de "Pression") e a extensibilidade (L - de "Longeur") da massa.</p>
        <ul>
            <li>Um <strong>P/L alto</strong> indica uma massa mais tenaz e elástica. Ela terá mais "snap-back" (tendência a encolher) e será mais difícil de esticar.</li>
            <li>Um <strong>P/L baixo</strong> indica uma massa mais extensível e relaxada, que é fácil de abrir, mas pode ser frágil se o W for baixo.</li>
            <li>Para pizza, busca-se um <strong>P/L equilibrado</strong>, que permita abrir o disco com facilidade, mas que ainda tenha força suficiente para manter a forma e reter o gás.</li>
        </ul>
      </Section>
      
       <Section title="Teor de Cinzas (Cenere)">
        <p>As "cinzas" são o resíduo mineral que sobra após a queima de uma amostra de farinha. Seu teor indica o grau de refino da farinha. Farinhas mais refinadas (como a 00) têm baixo teor de cinzas, enquanto farinhas integrais têm um teor alto. Um maior teor de cinzas está associado a um sabor mais rústico e complexo, e também a uma maior atividade enzimática.</p>
      </Section>
      
      <Section title="Absorção de Água">
        <p>A capacidade de uma farinha absorver água é fundamental para determinar a hidratação da massa.</p>
        <ul>
            <li><strong>Farinhas fortes</strong>, com mais proteína, geralmente absorvem mais água.</li>
            <li>Farinhas de <strong>moagem mais grossa</strong> (como a integral) absorvem mais água do que as de moagem fina, pois as partículas de farelo são "sedentas".</li>
            <li>É importante notar que a absorção é um processo que leva tempo. A técnica de <strong>autólise</strong> é usada para garantir que a farinha seja completamente hidratada antes da sova.</li>
        </ul>
      </Section>

      <Section title="Impacto no Forno" icon={<FireIcon className="h-5 w-5" />}>
        <ul>
            <li><strong>Farinhas fortes</strong> mantêm melhor a estrutura da massa sob o calor intenso, resultando em um bom "salto de forno" (oven spring) e uma borda bem desenvolvida.</li>
            <li><strong>Farinhas mais fracas</strong> ou com maior atividade enzimática tendem a dourar mais rapidamente devido à maior quantidade de açúcares simples disponíveis para a Reação de Maillard.</li>
            <li><strong>Farinhas integrais</strong> alteram a textura, tornando-a mais densa, e sua umidade retida pode exigir um tempo de cozimento ligeiramente maior.</li>
        </ul>
      </Section>
      
       <Section title="Referências Técnicas" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul>
            <li>"Modernist Pizza" e "Modernist Bread" – Nathan Myhrvold & Francisco Migoya</li>
            <li>King Arthur Baking – Flour Guides and Technical Papers</li>
            <li>Fontes de associações de moagem italianas (ex: Italmopa)</li>
            <li>Wikipedia – Bioquímica do trigo e processos de moagem</li>
          </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default FloursPage;
