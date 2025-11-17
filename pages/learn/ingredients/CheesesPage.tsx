
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

const CheesesPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Queijos na Pizza"
      description="Uma análise técnica do ingrediente que define a pizza. Entenda a ciência por trás do derretimento, elasticidade e sabor para fazer escolhas mais precisas."
      category="Ingredientes"
    >
      <Section title="Introdução: A Química Sensível do Queijo">
        <p>
            O queijo é um ingrediente termossensível e um sistema complexo composto por água, gordura, proteínas (principalmente caseínas), sais minerais e compostos voláteis aromáticos. A proporção exata desses componentes, como detalhado em fontes como "Modernist Pizza", determina o comportamento do queijo no forno, incluindo:
        </p>
        <ul>
            <li><strong>Derretimento (Melting):</strong> A fluidez que o queijo adquire com o calor.</li>
            <li><strong>Estiramento (Stretch):</strong> A capacidade de formar os fios elásticos característicos.</li>
            <li><strong>Browning:</strong> A capacidade de dourar e desenvolver cor e sabor.</li>
            <li><strong>Oil-Out:</strong> A separação da gordura da matriz de proteína.</li>
            <li><strong>Sabor e Aroma:</strong> A intensidade e o perfil aromático liberados durante o cozimento.</li>
        </ul>
      </Section>

      <Section title="Fundamentos Químicos do Comportamento do Queijo" icon={<BeakerIcon className="h-5 w-5" />}>
        <ul>
            <li>O <strong>derretimento</strong> ocorre quando a gordura, que está emulsificada na matriz de proteína, se liquefaz com o calor, e as redes de caseína começam a se desfazer, permitindo que o queijo flua.</li>
            <li>O <strong>teor de água</strong> atua como um lubrificante para as proteínas, sendo crucial para a elasticidade. Queijos com umidade ideal (como a mozzarella) esticam bem, enquanto queijos secos quebram.</li>
            <li>A <strong>gordura</strong> não só carrega a maior parte do sabor, mas também influencia o "oil-out". Queijos mais gordurosos tendem a liberar mais óleo na superfície.</li>
            <li>Queijos <strong>curados</strong> (envelhecidos) passam por um processo onde enzimas quebram proteínas e gorduras em compostos menores e mais aromáticos, resultando em um sabor muito mais intenso e complexo.</li>
        </ul>
      </Section>
      
      <Section title="Propriedades Técnicas dos Queijos Comuns">
        <h4>a) Mozzarella Fior di Latte (de Vaca)</h4>
        <p>Possui alta umidade e uma estrutura de caseína que lhe confere excelente elasticidade e derretimento uniforme. Seu sabor é suave e láctico, servindo como uma base perfeita que não sobrepõe outros ingredientes. Tem baixa tendência a "oil-out".</p>
        
        <h4>b) Mozzarella de Búfala</h4>
        <p>Com um teor de umidade ainda maior, derrete de forma mais irregular, criando "poças" cremosas. Libera bastante água, sendo ideal para fornos muito quentes e rápidos (conforme norma da AVPN), onde a evaporação é instantânea. Seu sabor é mais rico e complexo que o da fior di latte.</p>

        <h4>c) Provolone</h4>
        <p>Um queijo mais curado, resultando em menor umidade e maior salinidade. Seu derretimento é menos fluido e a elasticidade é menor que a da mozzarella. Adiciona um sabor mais forte, picante ou defumado.</p>

        <h4>d) Parmesão / Grana Padano</h4>
        <p>São queijos duros, de longa maturação e baixa umidade. Eles não "derretem" no sentido tradicional; em vez disso, "suam" sua gordura e douram. Sua função principal é adicionar um sabor umami profundo e salinidade, sendo ideais para finalização pós-forno.</p>

        <h4>e) Gorgonzola</h4>
        <p>Como outros queijos azuis, tem um sabor intenso e pungente devido à ação de mofos (Penicillium). Sua alta gordura garante um derretimento cremoso. É famoso pelo contraste com ingredientes doces (como mel ou figo), uma combinação documentada na gastronomia moderna.</p>

        <h4>f) Queijos Brasileiros (Análise Qualitativa)</h4>
        <ul>
            <li><strong>Meia-Cura:</strong> Possui notas suaves, derretimento médio e boa capacidade de dourar, mas com menor elasticidade que a mozzarella.</li>
            <li><strong>Minas Padrão:</strong> Moderadamente úmido, derrete de forma cremosa, mas com pouca elasticidade. Libera mais soro.</li>
            <li><strong>Coalho:</strong> Devido à sua estrutura proteica e pH, possui um comportamento térmico particular: ele amolece e doura, mas não derrete nem estica, mantendo sua forma.</li>
        </ul>
      </Section>

      <Section title="O Fenômeno do Oil-Out" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>O "oil-out" ocorre quando a emulsão de gordura na matriz de proteína do queijo se quebra sob calor, fazendo com que a gordura se separe e suba para a superfície. Queijos com alto teor de gordura (como cheddar e provolone) têm maior tendência a apresentar esse fenômeno. O risco aumenta com tempos de cozimento longos ou temperaturas muito altas, que dão mais tempo e energia para a gordura se separar.</p>
      </Section>

      <Section title="Browning (Dourado): A Reação de Maillard no Queijo" icon={<FireIcon className="h-5 w-5" />}>
        <p>O dourado do queijo depende da Reação de Maillard, que necessita de aminoácidos e açúcares redutores (lactose). Queijos com menor umidade douram mais rápido porque sua superfície seca e atinge a temperatura necessária para a reação mais rapidamente. Queijos muito úmidos, como a ricota, liberam vapor, o que mantém a superfície "fria" (próxima de 100°C) e impede um browning eficaz.</p>
      </Section>
      
      <Section title="Misturas Clássicas e Documentadas" icon={<BookOpenIcon className="h-5 w-5" />}>
        <ul>
            <li><strong>Mozzarella + Provolone:</strong> A base de sabor de muitas pizzas NY-style, combinando a textura da mozzarella com o sabor mais acentuado do provolone.</li>
            <li><strong>Mozzarella + Parmesão:</strong> Um clássico italiano e ítalo-americano. A mozzarella oferece a base cremosa, enquanto o parmesão adiciona um toque final de salinidade e umami.</li>
            <li><strong>Quatro Queijos Tradicionais:</strong> A combinação clássica geralmente inclui Mozzarella (base), Gorgonzola (sabor picante), Provolone (sabor defumado) e Parmesão (salinidade e umami).</li>
        </ul>
      </Section>

      <Section title="Riscos e Cuidados Práticos">
        <ul>
            <li><strong>Excesso de Queijo:</strong> Uma camada muito grossa de queijo pode agir como um isolante térmico, impedindo que o calor chegue à massa e ao molho, resultando em uma "gum line".</li>
            <li><strong>Umidade Demais:</strong> Queijos frescos como fior di latte ou búfala devem ser bem escorridos e secos antes do uso para evitar uma pizza encharcada.</li>
            <li><strong>Queijos Duros no Forno:</strong> Queijos como parmesão e pecorino não foram feitos para derreter. Se assados por muito tempo, eles queimam e ficam amargos. Use-os para finalizar a pizza pós-forno.</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default CheesesPage;
