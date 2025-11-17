
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

const LowMoistureCheesesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Queijos Low-Moisture: Comportamento e Ciência"
      subtitle="A ciência por trás do derretimento estável e do sabor concentrado."
      showReferencesSection
    >
        <Section title="Baixa Umidade: Sabor e Estabilidade">
            <p>Queijos "low-moisture" (baixa umidade), como a mozzarella usada na pizza NY Style, passam por um processo que remove parte do soro. Essa redução de água concentra as proteínas e a gordura, resultando em um sabor mais intenso e em um produto final mais estável.</p>
        </Section>
        <Section title="Derretimento Estável e Controlado">
            <p>Com menos água para evaporar, o derretimento desses queijos é mais uniforme e menos propenso a criar "poças" de líquido. A gordura se distribui de forma mais homogênea, criando uma cobertura coesa e consistente, ideal para fatias que precisam de estrutura.</p>
        </Section>
        <Section title="Resistência ao Calor Prolongado">
            <p>A baixa umidade torna o queijo mais resistente a tempos de cozimento mais longos, típicos de fornos domésticos. Enquanto queijos muito úmidos podem "quebrar" e liberar gordura excessivamente, os de baixa umidade mantêm sua emulsão por mais tempo, dourando de forma gradual.</p>
        </Section>
        <Section title="Comportamento Elástico e Sabor Concentrado">
            <p>A concentração de caseína (a principal proteína do queijo) resulta em um excelente "stretch" (elasticidade). O sabor, por sua vez, é mais salgado e pronunciado, pois todos os componentes de sabor estão menos diluídos em água.</p>
        </Section>
        <Section title="Papel Fundamental em Estilos Específicos">
            <p>No estilo New York, o queijo low-moisture é essencial para criar uma cobertura que se mantém firme na fatia dobrável, sem escorrer. Sua capacidade de dourar de forma controlada também contribui para a aparência clássica deste estilo de pizza.</p>
        </Section>
        <Section title="Riscos de Escurecimento Excessivo ('Browning')">
            <p>Por ter menos água, a superfície do queijo atinge mais rapidamente a temperatura necessária para a Reação de Maillard. Em fornos muito quentes ou com tempos de assamento muito longos, isso pode levar a um escurecimento excessivo ou até à queima do queijo, resultando em um sabor amargo.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Serious Eats – The Pizza Lab (Cheese Guides)</li>
              <li>Wikipedia (Mozzarella, Food Chemistry)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default LowMoistureCheesesPage;
