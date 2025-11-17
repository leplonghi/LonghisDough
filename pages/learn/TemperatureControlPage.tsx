import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon } from '../../components/IconComponents';

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

const TemperatureControlPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Controle de Temperatura da Massa"
      subtitle="O conceito mais importante para a consistência na panificação, explicado de forma qualitativa."
      showReferencesSection
    >
      <Section title="1. Introdução: Temperatura é Tudo">
        <p>
          A temperatura é a variável mais influente no comportamento da massa. Ela não é apenas um detalhe, mas o principal regulador dos processos bioquímicos que transformam farinha e água em uma estrutura complexa e saborosa. A temperatura da massa determina:
        </p>
        <ul>
            <li>A <strong>velocidade da fermentação</strong>, ditando o ritmo de produção de gás pela levedura.</li>
            <li>A <strong>força e extensibilidade do glúten</strong>, influenciando como a massa se comporta durante a manipulação.</li>
            <li>A <strong>atividade enzimática</strong>, que é crucial para o desenvolvimento do sabor e para a quebra de amidos.</li>
            <li>O <strong>sabor final</strong>, ao modular quais compostos aromáticos são produzidos.</li>
        </ul>
        <p>Este conceito é universal e aplica-se a todas as formas de panificação, da pizza ao pão artesanal.</p>
      </Section>

      <Section title="2. DDT — Desired Dough Temperature (Temperatura Desejada da Massa)">
        <p>
          O DDT é o conceito central no controle térmico. Como extensivamente detalhado em "Modernist Bread", ele representa a <strong>temperatura alvo que a massa deve atingir imediatamente após o término da mistura e sova</strong>. Atingir um DDT consistente é a chave para a previsibilidade.
        </p>
        <ul>
            <li>Controlar o DDT significa que, independentemente de ser um dia quente ou frio, sua fermentação começará sempre nas mesmas condições, tornando o processo repetível.</li>
            <li>É a principal ferramenta para transformar a panificação de uma arte de "sentimento" para uma ciência controlada.</li>
        </ul>
      </Section>
      
      <Section title="3. Fatores que Influenciam a Temperatura da Massa">
        <p>
          A temperatura final da massa é o resultado da soma de várias fontes de calor. Para controlar o DDT, é preciso entender e gerenciar cada uma delas:
        </p>
        <ol>
            <li><strong>Temperatura da Farinha:</strong> A farinha geralmente está na temperatura do ambiente onde foi armazenada.</li>
            <li><strong>Temperatura da Água:</strong> Este é o fator de controle mais fácil e poderoso. Usar água mais fria ou mais quente é a principal forma de ajustar o DDT.</li>
            <li><strong>Temperatura do Ambiente:</strong> O ar da sala troca calor com a massa durante todo o processo de mistura.</li>
            <li><strong>Calor Gerado pela Fricção da Sova:</strong> A manipulação mecânica da massa gera calor.</li>
            <li><strong>Temperatura dos Equipamentos:</strong> A cuba da batedeira, a bancada e até as mãos transferem calor para a massa.</li>
        </ol>
      </Section>

      <Section title="4. Fricção: O Calor do Movimento">
        <p>
          O ato de sovar a massa (seja à mão ou em batedeira) introduz energia mecânica que se dissipa como calor, aumentando a temperatura da massa.
        </p>
        <ul>
            <li>Massas mais firmes e de baixa hidratação geram mais fricção e, portanto, aquecem mais rapidamente.</li>
            <li>Batedeiras em alta velocidade geram um calor de fricção significativo.</li>
            <li>A técnica de incorporar descansos (autólise, pausas na sova) permite que o glúten se desenvolva com menos trabalho mecânico, reduzindo o aquecimento por fricção.</li>
        </ul>
      </Section>
      
      <Section title="5. Temperatura e Fermentação">
        <p>A relação é direta: a temperatura governa a velocidade do metabolismo da levedura.</p>
        <ul>
            <li><strong>Massas mais quentes fermentam mais rápido.</strong> A levedura fica mais ativa, produzindo CO₂ em um ritmo acelerado.</li>
            <li><strong>Massas mais frias fermentam mais devagar.</strong> A atividade da levedura é reduzida, prolongando o tempo necessário para a massa crescer.</li>
            <li>Em fermentações naturais (levain), a temperatura também influencia o balanço entre as leveduras e as bactérias ácido-láticas (LAB). Temperaturas diferentes favorecem a produção de diferentes tipos de ácidos, alterando o perfil de sabor final.</li>
        </ul>
      </Section>

      <Section title="6. Impacto no Sabor">
        <p>A velocidade da fermentação, controlada pela temperatura, tem um impacto profundo no sabor.</p>
        <ul>
            <li><strong>Fermentações mais longas e frias</strong> dão mais tempo para a ação enzimática e para a produção de uma gama complexa de compostos aromáticos secundários. O resultado é um sabor mais profundo, com mais nuances.</li>
            <li><strong>Fermentações mais rápidas e quentes</strong> favorecem a produção de CO₂ e etanol, resultando em sabores mais "limpos", simples e suaves, com menos complexidade.</li>
        </ul>
      </Section>

      <Section title="7. Controle Térmico na Prática">
        <p>Os princípios gerais para controlar a temperatura da massa são:</p>
        <ul>
            <li><strong>Ajustar a temperatura dos ingredientes:</strong> Principalmente a da água, usando-a mais fria em dias quentes ou mais morna em dias frios.</li>
            <li><strong>Controlar o ambiente:</strong> Trabalhar em um ambiente com temperatura estável, quando possível.</li>
            <li><strong>Uso da geladeira (retardo):</strong> A refrigeração é a ferramenta mais eficaz para retardar drasticamente a fermentação, permitindo o desenvolvimento de sabor por longos períodos sem super-fermentação.</li>
            <li><strong>Uso de descanso em bancada:</strong> Deixar a massa descansar em temperatura ambiente acelera a atividade da levedura, sendo uma forma de "acordar" a massa após o retardo a frio.</li>
        </ul>
      </Section>

      <Section title="8. Riscos do Descontrole Térmico">
        <ul>
            <li><strong>Massa muito quente:</strong> Leva a uma fermentação descontrolada, onde o gás é produzido antes que o sabor se desenvolva e a estrutura do glúten pode se degradar, resultando em uma massa fraca e pegajosa.</li>
            <li><strong>Massa muito fria:</strong> Pode resultar em uma fermentação lenta demais ou até inativa, produzindo uma massa densa, pesada e com pouco sabor.</li>
            <li><strong>Mudanças bruscas de temperatura:</strong> Podem estressar a rede de glúten e prejudicar a estrutura da massa.</li>
        </ul>
      </Section>

      <Section title="9. Referências Técnicas" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
              <li>"Modernist Bread" (DDT – principal fonte)</li>
              <li>"Modernist Pizza"</li>
              <li>King Arthur Baking</li>
              <li>Wikipedia – calor e termodinâmica</li>
          </ul>
      </Section>
    </TechnicalPageLayout>
  );
};

export default TemperatureControlPage;