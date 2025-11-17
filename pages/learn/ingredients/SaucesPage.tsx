
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


const SaucesPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Molhos de Pizza"
      description="Uma análise técnica do coração da pizza: o molho. Entenda como a escolha e o preparo do tomate impactam acidez, umidade e o equilíbrio final do sabor."
      category="Ingredientes"
    >
      <Section title="Introdução: O Papel Central do Molho">
        <p>
            O molho é muito mais do que um simples ingrediente úmido; ele é o componente que define a alma da pizza. Um bom molho é responsável por trazer:
        </p>
        <ul>
            <li><strong>Acidez:</strong> Para cortar a gordura do queijo e dos embutidos.</li>
            <li><strong>Aroma:</strong> O perfume característico do tomate, que é liberado com o calor do forno.</li>
            <li><strong>Umidade:</strong> Essencial para a textura, mas um fator de risco se não for controlada.</li>
            <li><strong>Cor:</strong> O vermelho vibrante do licopeno, um pigmento e antioxidante natural do tomate.</li>
            <li><strong>Equilíbrio:</strong> A base sobre a qual todos os outros sabores da cobertura são construídos.</li>
        </ul>
        <p>
            Cientificamente, o tomate é uma maravilha da natureza, contendo água (mais de 90%), açúcares naturais (frutose e glicose), ácidos orgânicos (principalmente cítrico e málico), e polissacarídeos como a pectina, que dão estrutura e viscosidade ao molho.
        </p>
      </Section>

      <Section title="Tomates e a Química da Umidade" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
            A gestão da água é o desafio número um ao trabalhar com tomates.
        </p>
        <ul>
            <li><strong>Estrutura Celular:</strong> Tomates inteiros, especialmente em lata, retêm a maior parte de sua água dentro das paredes celulares. Ao serem triturados ou amassados, essas paredes se rompem, liberando água e criando um molho mais fluido.</li>
            <li><strong>Variedades:</strong> Variedades como San Marzano ou Roma são preferidas para molhos por terem uma polpa mais densa e menos sementes, resultando em um equilíbrio ideal de açúcar e acidez.</li>
            <li><strong>Pectina:</strong> Esta molécula atua como um espessante natural. O processamento (trituração) e o cozimento podem alterar a estrutura da pectina, influenciando diretamente a viscosidade final do molho.</li>
            <li><strong>Redução:</strong> Cozinhar o molho lentamente (redução) evapora a água, concentrando os açúcares, ácidos e compostos de sabor. É uma forma de controlar a umidade e intensificar o sabor.</li>
        </ul>
      </Section>
      
      <Section title="Molho Cru vs. Molho Cozido: Uma Escolha de Estilo">
        <p>A decisão de cozinhar ou não o molho antes de ir para a pizza é uma das principais distinções entre os estilos de pizza, como bem documentado por fontes como a AVPN e guias de NY Style.</p>
        <h4>Molho Cru (Estilo Napolitano)</h4>
        <ul>
            <li><strong>Sabor:</strong> Brilhante, fresco e com a acidez natural do tomate em destaque. A pizza é assada tão rapidamente que o molho "cozinha" na própria pizza.</li>
            <li><strong>Preparo:</strong> Simplesmente tomates de alta qualidade (como San Marzano) amassados à mão ou levemente triturados, temperados apenas com sal.</li>
            <li><strong>Desafio:</strong> Exige um controle rigoroso da umidade do tomate, pois não há evaporação prévia.</li>
            <li><strong>Referência:</strong> É o padrão obrigatório do <em>disciplinare</em> da AVPN para a autêntica Pizza Napolitana.</li>
        </ul>
        <h4>Molho Cozido (Estilos NY, Pan Pizzas)</h4>
        <ul>
            <li><strong>Sabor:</strong> Mais profundo, adocicado e concentrado. O cozimento lento permite uma leve caramelização dos açúcares e a infusão de outros aromas (alho, orégano, etc.).</li>
            <li><strong>Preparo:</strong> O molho é cozido em fogo baixo para reduzir o volume em 25-50%, concentrando o sabor e eliminando o excesso de água.</li>
            <li><strong>Vantagem:</strong> Oferece maior controle sobre a umidade final, reduzindo o risco de uma pizza encharcada, especialmente em fornos domésticos com tempos de cozimento mais longos.</li>
        </ul>
      </Section>
      
       <Section title="Densidade e Viscosidade: O Ponto Certo">
        <p>A consistência do molho é crucial e deve ser adaptada ao estilo da pizza.</p>
        <ul>
            <li><strong>Molhos Muito Líquidos:</strong> São a principal causa da "gum line" (aquela camada de massa crua sob a cobertura). A água em excesso impede que o calor da base asse a massa, cozinhando-a a vapor.</li>
            <li><strong>Molhos Muito Densos:</strong> Podem agir como um isolante térmico, impedindo que o calor penetre eficientemente nos ingredientes abaixo dele. Além disso, um molho pastoso pode resultar em uma textura seca após o assamento.</li>
            <li><strong>O Ideal:</strong> O molho deve ser espesso o suficiente para cobrir as costas de uma colher sem escorrer imediatamente, mas fluido o bastante para ser espalhado com facilidade.</li>
        </ul>
      </Section>

      <Section title="Comportamento Térmico no Forno" icon={<FireIcon className="h-5 w-5" />}>
        <p>Dentro do forno, o molho passa por uma rápida transformação:</p>
        <ul>
            <li><strong>Evaporação:</strong> A água é a primeira a evaporar, o que concentra todos os outros componentes.</li>
            <li><strong>Concentração de Sabor:</strong> Açúcares e ácidos se tornam mais pronunciados. Um molho que parecia perfeitamente equilibrado a frio pode se tornar excessivamente doce ou ácido após o cozimento.</li>
            <li><strong>Oxidação de Pigmentos:</strong> O licopeno (pigmento vermelho) é relativamente estável, mas pode sofrer uma leve oxidação, escurecendo a cor do molho.</li>
        </ul>
      </Section>

      <Section title="Combinações Clássicas com o Molho">
        <ul>
            <li><strong>Napolitana:</strong> A pureza do molho de tomate cru é complementada apenas pela cremosidade da mozzarella e o frescor do manjericão adicionado no final.</li>
            <li><strong>NY Style:</strong> O molho cozido e temperado com orégano cria uma base de sabor robusta que suporta bem a gordura do pepperoni e a maior quantidade de queijo.</li>
            <li><strong>Pizzas com alta carga de toppings:</strong> Para pizzas com muitos ingredientes, especialmente vegetais, um molho mais denso e cozido é essencial para não adicionar ainda mais umidade ao conjunto.</li>
        </ul>
      </Section>

      <Section title="Cuidados e Riscos Comuns" icon={<SparklesIcon className="h-5 w-5" />}>
        <ul>
            <li><strong>Excesso de Água:</strong> A principal causa de uma pizza encharcada. Sempre busque reduzir a umidade, seja cozinhando o molho ou usando tomates de polpa mais densa.</li>
            <li><strong>Molho Muito Doce:</strong> Açúcares caramelizam rapidamente e podem queimar em fornos de alta temperatura, resultando em um sabor amargo.</li>
            <li><strong>Molho Muito Ácido:</strong> Um molho excessivamente ácido pode dominar todos os outros sabores. Equilibre com uma pitada de açúcar, se necessário (em estilos que permitem), ou cozinhando-o por mais tempo.</li>
            <li><strong>Cozimento Prolongado:</strong> Cozinhar o tomate por horas pode desenvolver um sabor profundo, mas ao custo do frescor. Para pizza, um cozimento de 20-40 minutos é geralmente suficiente.</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default SaucesPage;
