import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { ShieldCheckIcon, BookOpenIcon, BeakerIcon } from '../../components/IconComponents';

// Local Section component for structuring content
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

const EquipmentPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Equipamentos Essenciais para Pizza"
      subtitle="Uma análise técnica sobre como cada ferramenta impacta o resultado final, da pá à superfície de assamento."
      showReferencesSection={false} // Custom references section at the end
    >
      <Section title="1. Introdução: As Ferramentas que Moldam a Pizza">
        <p>
          O equipamento utilizado na confecção da pizza não é um mero acessório; ele é parte integrante do processo e influencia diretamente o resultado. Cada ferramenta interage com a massa de uma maneira específica, modulando:
        </p>
        <ul>
            <li>A <strong>condução e capacidade térmica</strong>, que ditam como o calor é transferido para a massa.</li>
            <li>A <strong>manipulação da pizza</strong>, afetando a facilidade de colocar e retirar do forno.</li>
            <li>A <strong>velocidade de assamento</strong>, que impacta a hidratação final.</li>
            <li>A <strong>textura final</strong> da base e da borda.</li>
        </ul>
      </Section>

      <Section title="2. Pás (Peels)">
        <h4>a) Pá de Madeira</h4>
        <ul>
            <li><strong>Menos aderente:</strong> A madeira é porosa e absorve umidade, o que ajuda a evitar que a massa crua grude.</li>
            <li><strong>Ideal para preparar:</strong> É a escolha preferida para montar a pizza antes de levá-la ao forno.</li>
            <li><strong>Menor transferência térmica:</strong> Por ser um mau condutor de calor, não aquece significativamente ao entrar em contato com o forno.</li>
        </ul>
        <h4>b) Pá de Metal</h4>
        <ul>
            <li><strong>Mais fina:</strong> Sua espessura reduzida permite deslizar sob a pizza já assada com mais facilidade.</li>
            <li><strong>Melhor para retirar:</strong> É a ferramenta ideal para girar e retirar a pizza do forno.</li>
            <li><strong>Mais aderente:</strong> O metal é liso e não poroso. A massa crua tende a grudar nele, especialmente se houver umidade. Por isso, não é ideal para a montagem.</li>
        </ul>
      </Section>
      
      <Section title="3. Pedras Refratárias">
        <ul>
            <li><strong>Capacidade térmica média:</strong> Armazenam uma boa quantidade de calor, mas transferem-no para a massa de forma mais gradual que o aço.</li>
            <li><strong>Boa estabilidade:</strong> Mantêm a temperatura de forma relativamente estável entre uma pizza e outra.</li>
            <li><strong>Assamento equilibrado:</strong> Promovem um cozimento uniforme da base, sendo uma opção versátil e segura para fornos domésticos.</li>
        </ul>
      </Section>
      
      <Section title="4. Aço de Pizza (Baking Steel)">
        <ul>
            <li><strong>Condutividade térmica muito alta:</strong> O aço transfere calor para a massa de forma muito mais rápida e agressiva que a pedra.</li>
            <li><strong>Base doura mais rápido:</strong> Resulta em uma base mais crocante e com melhor "salto de forno" (oven spring) em fornos domésticos.</li>
            <li><strong>Risco de queimar:</strong> Se o calor do topo do forno não for igualmente forte, há o risco de a base queimar antes que a cobertura cozinhe.</li>
        </ul>
      </Section>

      <Section title="5. Biscotto (Argila Refratária)">
        <ul>
            <li><strong>Condutividade baixa:</strong> A argila porosa do biscotto transfere calor de forma muito suave.</li>
            <li><strong>Ideal para pizzas napolitanas:</strong> É a superfície perfeita para fornos de altíssima temperatura, pois permite que a base cozinhe perfeitamente sem queimar durante o curto tempo de assamento.</li>
            <li><strong>Assamento suave da base:</strong> Evita a queima da base, mesmo com o piso do forno em temperaturas extremas.</li>
        </ul>
      </Section>
      
      <Section title="6. Formas de Aço — Detroit Pan">
        <ul>
            <li><strong>Transmitem calor para as bordas:</strong> As paredes altas e condutoras da forma de aço assam as laterais da pizza.</li>
            <li><strong>Permitem caramelização de queijos (frico):</strong> O contato do queijo com as paredes quentes da forma cria a borda de queijo caramelizado característica do estilo Detroit.</li>
            <li><strong>Paredes altas favorecem expansão uniforme:</strong> A massa cresce para cima de maneira contida, resultando em um miolo alto e aerado.</li>
        </ul>
      </Section>

      <Section title="7. Rodos, Cortadores e Espátulas">
        <ul>
            <li><strong>Aço inoxidável:</strong> É o material de escolha para a maioria dos utensílios de qualidade devido à sua durabilidade, precisão e facilidade de higienização.</li>
            <li><strong>Lâminas afiadas:</strong> Cortadores de pizza (rodos) devem ter lâminas bem afiadas para um corte limpo, que não arraste a cobertura.</li>
            <li><strong>Utensílios de silicone:</strong> Espátulas de silicone são ideais para manipular massas em formas antiaderentes, pois não riscam a superfície.</li>
        </ul>
      </Section>

      <Section title="8. Ciência dos Materiais (Qualitativa)" icon={<BeakerIcon className="h-5 w-5" />}>
        <ul>
            <li><strong>Metais (Aço, Alumínio):</strong> Possuem alta condutividade térmica. Aquecem rápido e transferem calor rapidamente para a massa.</li>
            <li><strong>Cerâmicas (Pedra, Argila):</strong> Possuem baixa condutividade, mas alta capacidade térmica (retenção). Demoram mais para aquecer, mas mantêm o calor por mais tempo, liberando-o de forma mais gradual.</li>
            <li><strong>Alumínio:</strong> Aquece e perde calor muito rapidamente. É comum em formas de pizza de baixo custo.</li>
            <li><strong>Aço:</strong> Aquece rápido, mas retém menos calor que a cerâmica, necessitando de um forno que recupere a temperatura rapidamente.</li>
        </ul>
      </Section>

      <Section title="9. Riscos">
        <ul>
            <li>Um <strong>aço muito quente</strong> em um forno com topo fraco pode queimar a base antes de o queijo derreter.</li>
            <li>Uma <strong>pedra refratária fria</strong> ou mal pré-aquecida resultará em uma base crua e pálida ("gum line").</li>
            <li><strong>Utensílios sujos</strong> podem introduzir microrganismos indesejados na massa, causando contaminação.</li>
        </ul>
      </Section>

      <Section title="10. Referências Técnicas" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Modernist Pizza</li>
            <li>Serious Eats – Pizza Steel vs. Stone</li>
            <li>Ooni Learn – Baking Surfaces Explained</li>
            <li>Wikipedia – Thermal properties of materials</li>
          </ul>
      </Section>
    </TechnicalPageLayout>
  );
};

export default EquipmentPage;