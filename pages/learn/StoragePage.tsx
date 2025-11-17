
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon, ShieldCheckIcon } from '../../components/IconComponents';

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

const StoragePage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Armazenamento Técnico da Massa"
      subtitle="A ciência por trás de como guardar a massa para controlar a fermentação, preservar a textura e garantir a segurança."
      showReferencesSection={false} // Custom references section at the end
    >
      <Section title="1. Introdução: O Armazenamento como Ferramenta de Controle">
        <p>
          O armazenamento adequado da massa não é um passo passivo, mas uma ferramenta ativa para modular o resultado final. A forma como a massa é guardada influencia diretamente:
        </p>
        <ul>
            <li>A <strong>velocidade e o perfil da fermentação</strong>, ao controlar a temperatura e a exposição ao oxigênio.</li>
            <li>A <strong>textura e a hidratação da superfície</strong>, prevenindo o ressecamento que prejudica a extensibilidade.</li>
            <li>O <strong>desenvolvimento do sabor</strong>, ao permitir que processos enzimáticos e microbianos ocorram em um ambiente estável.</li>
            <li>A <strong>segurança e higiene</strong>, protegendo a massa de contaminações externas.</li>
            <li>A <strong>estabilidade da estrutura do glúten</strong>, garantindo que a massa mantenha sua capacidade de reter gás.</li>
        </ul>
      </Section>

      <Section title="2. Recipientes Adequados" icon={<ShieldCheckIcon className="h-5 w-5" />}>
        <p>
          A escolha do recipiente é a primeira linha de defesa para a integridade da massa.
        </p>
        <ul>
            <li>Recipientes <strong>limpos e hermeticamente fechados</strong> são essenciais para prevenir a contaminação por microrganismos indesejados (fungos, bactérias) presentes no ambiente.</li>
            <li>O uso de caixas individuais ou com divisórias para as bolas de massa <strong>evita o ressecamento</strong> e impede que elas grudem umas nas outras.</li>
            <li>O recipiente deve ter <strong>espaço suficiente para a expansão</strong> da massa. Um espaço inadequado pode fazer com que a massa pressione a tampa, colapsando sua estrutura de gás e perdendo volume.</li>
        </ul>
      </Section>
      
      <Section title="3. Contato com o Ar: O Inimigo da Superfície">
        <p>
          A exposição direta ao ar é prejudicial para a superfície da massa.
        </p>
        <ul>
            <li>O ar <strong>desidrata a superfície</strong>, criando uma "pele" ou crosta seca. Essa camada perde elasticidade e pode causar rasgos durante a abertura da massa, além de criar pontos duros na borda após o cozimento.</li>
            <li>O contato com o oxigênio também pode levar a uma <strong>oxidação superficial</strong>, que pode afetar sutilmente o sabor e a cor da massa.</li>
        </ul>
      </Section>
      
      <Section title="4. Controle da Umidade Interna">
        <p>Manter o balanço de umidade dentro do recipiente é crucial.</p>
        <ul>
            <li><strong>Caixas fechadas retêm a umidade</strong> que a massa libera naturalmente, criando um microclima estável que mantém a superfície maleável.</li>
            <li>O método tradicional de cobrir com um <strong>tecido levemente úmido</strong> funciona pelo mesmo princípio de manter a umidade na superfície, mas oferece menos proteção contra contaminação.</li>
            <li><strong>Excesso de umidade pode gerar condensação</strong>, especialmente se uma massa morna for colocada em um ambiente frio. Gotículas de água na superfície podem deixar a massa excessivamente pegajosa.</li>
        </ul>
      </Section>

      <Section title="5. Contaminação: Riscos Reais">
        <p>A massa é um meio de cultura ideal para microrganismos. A proteção contra contaminação é fundamental.</p>
        <ul>
            <li><strong>Fungos e bolores ambientais</strong> podem se depositar na superfície de uma massa desprotegida, especialmente durante fermentações longas.</li>
            <li><strong>Bactérias indesejáveis</strong>, provenientes de superfícies ou utensílios sujos, podem competir com a levedura e produzir sabores e odores desagradáveis.</li>
            <li>A massa é porosa a odores. Armazená-la perto de alimentos com cheiros fortes (como cebola ou peixe) na geladeira pode resultar em <strong>migração de odores</strong>, contaminando o sabor delicado da massa.</li>
        </ul>
      </Section>
      
       <Section title="6. Armazenamento Durante a Fermentação Fria">
        <p>O armazenamento refrigerado (fermentação fria) é uma técnica poderosa, mas exige cuidados específicos.</p>
        <ul>
            <li><strong>Temperaturas mais baixas desaceleram drasticamente a atividade da levedura</strong>, mas não a interrompem completamente. Isso permite que processos enzimáticos mais lentos continuem, desenvolvendo uma complexidade de sabor que não seria possível em temperatura ambiente.</li>
            <li>O ambiente frio e úmido de uma geladeira torna os <strong>recipientes limpos e bem selados</strong> ainda mais importantes para evitar contaminação cruzada com outros alimentos.</li>
        </ul>
      </Section>

      <Section title="7. Armazenamento Pós-Boleamento">
        <p>Depois que a massa é dividida e boleada, o objetivo do armazenamento é preservar a estrutura de cada bola individual.</p>
        <ul>
            <li>As bolas de massa devem ser armazenadas de forma a <strong>manter sua forma e tensão superficial</strong>.</li>
            <li><strong>Evitar empilhar ou esmagar</strong> as bolas, pois isso destruiria a estrutura de gás interna que foi cuidadosamente desenvolvida.</li>
            <li>Cada bola deve ter seu próprio espaço para fermentar e expandir sem tocar nas outras.</li>
        </ul>
      </Section>
      
      <Section title="8. Riscos Comuns do Armazenamento Inadequado">
        <ul>
            <li><strong>Massa ressecada:</strong> Resulta em uma superfície que rasga e uma crosta dura. Causa: recipiente mal vedado ou exposição ao ar.</li>
            <li><strong>Massa excessivamente pegajosa:</strong> Dificulta o manuseio. Causa: condensação dentro de um recipiente selado quando uma massa morna é refrigerada.</li>
            <li><strong>Cheiro forte de álcool:</strong> Indica uma fermentação anaeróbica descontrolada, muitas vezes em um recipiente hermético demais e em temperatura elevada.</li>
        </ul>
      </Section>

      <Section title="9. Referências Técnicas" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Modernist Pizza</li>
            <li>Modernist Bread</li>
            <li>King Arthur Baking – Dough Storage Guides</li>
            <li>Ooni Learn – Storing Pizza Dough</li>
            <li>Wikipedia – Microbiologia básica e segurança alimentar</li>
          </ul>
      </Section>
    </TechnicalPageLayout>
  );
};

export default StoragePage;
