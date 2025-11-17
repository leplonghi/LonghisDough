
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon, FireIcon } from '../../../components/IconComponents';

const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
            {icon}
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            {children}
        </div>
    </div>
);

const MeatsPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Carnes e Embutidos"
      description="Uma análise técnica sobre como carnes, curados e embutidos se comportam na pizza, da ciência da cura à reação no forno."
      category="Ingredientes"
    >
      <Section title="Introdução: O Impacto Químico da Carne">
        <p>
            Carnes e embutidos são mais do que apenas um topping; eles são um sistema químico complexo que interage intensamente com a pizza. Do ponto de vista científico e sensorial, eles são responsáveis por modular:
        </p>
        <ul>
            <li><strong>Salinidade e Gordura:</strong> Contribuem com sal e gordura, que precisam ser equilibrados com a acidez do molho e a suavidade do queijo.</li>
            <li><strong>Sabor Umami:</strong> Processos de cura e fermentação concentram glutamatos, proporcionando uma profundidade de sabor umami.</li>
            <li><strong>Crocância:</strong> A gordura derretida (rendering) e a reação de Maillard nas proteínas criam texturas crocantes que contrastam com a maciez da massa.</li>
        </ul>
        <p>
            Embutidos como salames e pepperoni passam por processos químicos sofisticados antes de chegarem à pizza, incluindo cura (com sal e nitritos), fermentação (que desenvolve acidez e sabor), defumação e desidratação, que concentram o sabor e garantem a segurança alimentar.
        </p>
      </Section>

      <Section title="Propriedades Técnicas (Química Real)" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
            O comportamento de carnes e embutidos no forno é ditado por sua composição.
        </p>
        <ul>
            <li><strong>Derretimento da Gordura (Rendering):</strong> A gordura derrete e se espalha pela pizza. Gorduras mais saturadas, como as do bacon, derretem mais lentamente e em temperaturas mais altas. Esse processo pode levar ao "oil-out", um excesso de óleo na superfície.</li>
            <li><strong>Teor de Água:</strong> Carnes curadas (como salame e prosciutto) têm baixo teor de água, o que as torna mais estáveis no forno e propensas a ficarem crocantes. Carnes frescas (como linguiça crua ou frango) liberam uma quantidade significativa de água, o que representa um risco de deixar a pizza encharcada.</li>
            <li><strong>Salinidade:</strong> O sal usado na cura é concentrado. É crucial considerar o sal do embutido ao balancear o sal total da pizza, incluindo molho e queijo.</li>
        </ul>
      </Section>
      
      <Section title="Comportamento no Forno" icon={<FireIcon className="h-5 w-5" />}>
        <p>Cada tipo de carne reage de forma diferente ao calor intenso.</p>
        <ul>
            <li><strong>"Cupping" do Pepperoni:</strong> Como explicado por J. Kenji López-Alt em Serious Eats, fatias finas de pepperoni se curvam para cima ("cup") porque a parte de cima (exposta ao calor radiante) cozinha e contrai mais rápido que a parte de baixo (protegida e em contato com a pizza). A gordura derretida se acumula nesses "copos", fritando as bordas e tornando-as crocantes.</li>
            <li><strong>Liberação de Água de Carnes Frescas:</strong> Linguiça fresca, carne moída ou frango, se colocados crus, liberam vapor e água durante o cozimento, o que pode criar uma "gum line" (linha de goma) na massa. Por isso, muitas vezes são pré-cozidos.</li>
            <li><strong>Prosciutto e Curados Delicados:</strong> Conforme a tradição italiana e fontes como a Ooni Pizza School, o prosciutto crudo deve ser aplicado <strong>pós-forno</strong>. O calor intenso destruiria seus compostos aromáticos delicados e alteraria sua textura sedosa, tornando-o salgado e rígido.</li>
        </ul>
      </Section>
      
       <Section title="Tipos Comuns de Carnes e Embutidos">
        <h4>a) Pepperoni</h4>
        <p>Um salame curado e seco de origem ítalo-americana, com páprica e pimenta. Sua alta concentração de gordura e o invólucro de colágeno contribuem para o "cupping" e a crocância das bordas quando fatiado fino.</p>
        
        <h4>b) Salame Italiano</h4>
        <p>Existem centenas de variedades. Geralmente é fermentado, o que lhe confere notas ácidas e um sabor mais complexo. Por ser mais denso e ter menos gordura que o pepperoni, tende a não "cupear", mas fica agradavelmente crocante.</p>
        
        <h4>c) Calabresa Brasileira</h4>
        <p>Um embutido processado e cozido, não curado da mesma forma que o salame. Seu perfil aromático é forte, e por ter mais umidade e gordura emulsionada, libera bastante óleo na pizza.</p>

        <h4>d) Presunto Cru (Prosciutto di Parma, San Daniele)</h4>
        <p>Curado a seco apenas com sal, tem um sabor delicado e textura que derrete na boca. Como mencionado, seu melhor uso é fatiado finamente e adicionado à pizza assim que ela sai do forno.</p>

        <h4>e) Bacon</h4>
        <p>Sua gordura densa precisa de tempo para derreter (render). Em pizzas de cozimento rápido (como a Napolitana), ele não cozinharia adequadamente. Por isso, é quase sempre pré-cozido até ficar parcialmente crocante antes de ser usado como cobertura.</p>
      </Section>

      <Section title="Combinações Clássicas (Validadas pela Tradição)" icon={<BookOpenIcon className="h-5 w-5" />}>
        <ul>
            <li><strong>Pepperoni + Mozzarella:</strong> O clássico americano. A picância e a gordura do pepperoni são equilibradas pela suavidade da mozzarella.</li>
            <li><strong>Salame + Provolone:</strong> Uma combinação robusta. O sabor forte do salame é complementado pelo provolone, que é mais picante que a mozzarella.</li>
            <li><strong>Prosciutto + Rúcula + Lascas de Parmesão:</strong> Uma combinação moderna, mas já clássica na Itália. Adicionados pós-forno, o salgado do presunto, o amargor da rúcula e o umami do parmesão criam um contraste fresco.</li>
            <li><strong>Bacon + Cebola (Caramelizada ou Roxa):</strong> O doce da cebola corta a riqueza e o salgado do bacon, uma combinação consagrada.</li>
        </ul>
      </Section>
      
       <Section title="Cuidados e Riscos Comuns" icon={<SparklesIcon className="h-5 w-5" />}>
        <ul>
            <li><strong>Excesso de Gordura (Oil-Out):</strong> O uso de múltiplos embutidos gordurosos (ex: pepperoni + bacon) pode levar a uma pizza excessivamente oleosa. Equilibre com queijos de menor gordura ou adicione menos quantidade.</li>
            <li><strong>Carnes Frescas Cruas:</strong> O risco de liberar água e não cozinhar completamente é alto. Para carnes como linguiça ou frango, a pré-cocção é a prática mais segura e eficaz.</li>
            <li><strong>Agentes de Cura (Nitritos):</strong> Os nitritos e nitratos usados na cura de muitos embutidos são estáveis e não se alteram significativamente com o calor do forno. Sua função principal ocorre durante o processo de cura, antes do produto chegar à sua cozinha.</li>
            <li><strong>Perda de Aroma em Curados Finos:</strong> Nunca asse um prosciutto de alta qualidade. Você estará pagando por uma complexidade aromática que será destruída pelo calor.</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default MeatsPage;
