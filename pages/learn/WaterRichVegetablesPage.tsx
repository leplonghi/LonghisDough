
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

const WaterRichVegetablesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Vegetais Ricos em Água: Umidade e Comportamento Térmico"
      subtitle="Como lidar com o excesso de umidade de ingredientes como cogumelos, abobrinha e tomates frescos."
      showReferencesSection
    >
        <Section title="O Desafio da Água nos Vegetais">
            <p>Muitos vegetais frescos, como cogumelos, abobrinha, espinafre e até mesmo tomates frescos, são compostos por mais de 90% de água. Quando expostos ao calor do forno, suas paredes celulares se rompem, liberando essa água em forma de vapor e líquido diretamente sobre a pizza.</p>
        </Section>
        <Section title="Como a Umidade Afeta a Base da Pizza">
            <p>Essa liberação de água tem um efeito prejudicial direto na massa. O líquido impede que a superfície da massa seque e atinja a temperatura necessária para assar. Em vez disso, a massa é "cozida a vapor" por baixo da cobertura, resultando na temida "gum line" — uma linha densa, pálida e crua entre o molho e o miolo da pizza.</p>
        </Section>
        <Section title="A Solução: Pré-preparo para Controle de Umidade">
            <p>A estratégia fundamental para usar vegetais aquosos é remover parte de sua umidade antes que eles entrem em contato com a massa. Isso pode ser feito através de várias técnicas:</p>
            <ul>
                <li><strong>Salga:</strong> Polvilhar sal sobre vegetais fatiados (como abobrinha ou berinjela) e deixá-los descansar extrai a água por osmose.</li>
                <li><strong>Saltear ou Grelhar:</strong> Cozinhar rapidamente cogumelos, espinafre ou pimentões em uma frigideira ou grelha evapora a maior parte de sua água e, como bônus, concentra seu sabor.</li>
                <li><strong>Assar:</strong> Assar vegetais no forno antes de usá-los na pizza também é uma forma eficaz de desidratá-los e caramelizar seus açúcares naturais.</li>
            </ul>
        </Section>
        <Section title="Riscos do Excesso de Umidade">
            <p>Além da "gum line", o excesso de umidade pode levar a uma pizza encharcada e pesada, com uma base mole em vez de crocante. Também dilui o sabor do molho e do queijo, resultando em uma pizza sem intensidade.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Serious Eats - The Pizza Lab</li>
              <li>King Arthur Baking - Pizza Toppings Guide</li>
              <li>"On Food and Cooking" de Harold McGee</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default WaterRichVegetablesPage;
