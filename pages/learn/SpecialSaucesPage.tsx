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

const SpecialSaucesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Molhos Especiais: Pesto, Ricota e Outros"
      subtitle="Comportamento e riscos de bases alternativas na pizza."
    >
        <Section title="Introdução: Expandindo o Paladar">
            <p>Além dos molhos de tomate e brancos, bases alternativas como pesto e cremes de ricota oferecem perfis de sabor únicos. No entanto, seu comportamento no forno é diferente e requer considerações técnicas para evitar problemas de textura e sabor.</p>
        </Section>
        <Section title="Pesto: Oxidação e Notas Verdes">
            <p>O pesto é uma emulsão de azeite com manjericão, pinhões, alho e queijo. As notas aromáticas "verdes" do manjericão vêm de compostos extremamente voláteis e sensíveis ao calor. Quando o pesto é exposto ao calor intenso do forno, esses compostos se degradam e a clorofila oxida, resultando em uma cor escura e um sabor amargo e de "erva cozida". Por isso, a melhor maneira de usar pesto na pizza é adicioná-lo <strong>pós-forno</strong> ou em pequenas gotas protegidas sob o queijo.</p>
        </Section>
        <Section title="Ricota Cremosa: Veículo de Umidade">
            <p>A ricota é um queijo fresco com alto teor de umidade. Quando usada como base, ela não derrete como a mozzarella, mas sua umidade evapora, criando um ambiente de vapor que pode cozinhar a massa por baixo, em vez de assá-la. A melhor forma de usar ricota é em pequenas porções ("dollops") sobre a pizza, não como uma camada uniforme. Isso permite que a massa ao redor asse corretamente. Misturar a ricota com um pouco de sal e azeite pode melhorar sua estabilidade e sabor.</p>
        </Section>
        <Section title="Bechamel e Outras Bases Lácteas">
            <p>O bechamel, uma emulsão de farinha, manteiga e leite, serve como uma base neutra e cremosa. Sua estrutura, estabilizada pelo amido da farinha, é mais resistente ao calor do que um simples creme de leite. Ele doura bem (reação de Maillard das proteínas do leite) e cria uma textura rica, sendo uma excelente base para pizzas com vegetais ou carnes defumadas.</p>
        </Section>
        <Section title="Riscos Qualitativos de Molhos Úmidos">
            <p>O principal risco de usar qualquer molho alternativo é o excesso de umidade. Molhos muito líquidos ou que liberam água durante o cozimento são a principal causa da "gum line" (a camada de massa crua e densa logo abaixo da cobertura). A chave é sempre buscar uma consistência mais espessa e usar os molhos de forma estratégica, não como uma camada uniforme e pesada que isola a massa do calor.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>"The Flavor Bible" de Karen Page e Andrew Dornenburg</li>
              <li>Serious Eats</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SpecialSaucesPage;
