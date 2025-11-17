
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

const CuredMeatsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Carnes Curadas: Ciência da Cura e Sabores"
      subtitle="Como a desidratação e a fermentação transformam a carne em um ingrediente de sabor intenso."
      showReferencesSection
    >
        <Section title="O Processo de Cura">
            <p>A cura é um método de preservação ancestral que envolve o uso de sal, e por vezes nitritos/nitratos, para remover a umidade da carne. Esse processo de desidratação inibe o crescimento de microrganismos e, crucialmente, concentra os sabores naturais da carne.</p>
        </Section>
        <Section title="Transformação de Proteínas e Sabor Umami">
            <p>Durante a cura e a maturação, as enzimas naturais da carne quebram as longas cadeias de proteínas em componentes menores, como aminoácidos. Um desses aminoácidos é o glutamato, responsável pelo quinto gosto, o umami. É por isso que carnes curadas como o prosciutto e o salame têm um sabor tão profundo e satisfatório.</p>
        </Section>
        <Section title="Sabores Concentrados">
            <p>A remoção da água concentra não apenas as proteínas, mas também a gordura e os sais minerais. O resultado é um ingrediente com sabor muito mais intenso do que sua contraparte fresca. Isso significa que uma pequena quantidade de carne curada pode ter um grande impacto sensorial na pizza.</p>
        </Section>
        <Section title="Comportamento ao Assar">
            <p>No calor do forno, a gordura presente nas carnes curadas derrete ("rendering"), liberando óleo que frita levemente a carne e adiciona sabor à pizza. As proteínas se contraem, fazendo com que fatias finas (como as de pepperoni) fiquem crocantes e se curvem ("cupping").</p>
        </Section>
        <Section title="Riscos de Ressecamento">
            <p>Carnes curadas já têm pouca umidade. Em fornos muito quentes e com tempos de cozimento longos, elas podem ressecar excessivamente, tornando-se duras e excessivamente salgadas. Carnes curadas muito delicadas, como o prosciutto, são quase sempre adicionadas pós-forno para preservar sua textura e sabor.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Cuisine</li>
              <li>"On Food and Cooking" de Harold McGee</li>
              <li>Serious Eats – Cured Meats Guides</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default CuredMeatsPage;
