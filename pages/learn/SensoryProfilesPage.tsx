
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

const SensoryProfilesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Perfis Sensoriais na Pizza"
      subtitle="Como umami, gordura, acidez, doçura e crocância se equilibram para criar a experiência perfeita."
      showReferencesSection
    >
        <Section title="O Equilíbrio dos Gostos Fundamentais">
            <p>Uma pizza de sucesso é uma sinfonia de sabores e texturas. O segredo não está em um único ingrediente, mas no equilíbrio harmonioso entre os gostos fundamentais. Uma combinação bem-sucedida estimula diferentes partes do paladar simultaneamente, criando uma experiência complexa e satisfatória.</p>
        </Section>
        <Section title="Umami: O Sabor da Satisfação">
            <p>O umami, ou o "quinto gosto", é o sabor da "deliciosidade" e da profundidade, associado a glutamatos. Na pizza, o umami está naturalmente presente em ingredientes-chave:</p>
            <ul>
                <li><strong>Tomates maduros:</strong> Especialmente quando cozidos, concentram glutamatos.</li>
                <li><strong>Queijos curados:</strong> O parmesão é uma das fontes mais ricas de umami natural.</li>
                <li><strong>Cogumelos:</strong> Particularmente quando cozidos, liberam um sabor terroso e rico em umami.</li>
                <li><strong>Carnes curadas:</strong> O processo de cura quebra proteínas, liberando glutamatos.</li>
            </ul>
        </Section>
        <Section title="Gordura como Veículo de Sabor">
            <p>A gordura, proveniente do queijo, do azeite e das carnes, é essencial. Ela não apenas adiciona riqueza e uma sensação agradável na boca, mas também atua como um solvente para muitos compostos aromáticos, carregando e distribuindo o sabor por toda a pizza.</p>
        </Section>
        <Section title="Acidez para Contraste e Limpeza">
            <p>A acidez é o contraponto necessário para a gordura. O ácido do molho de tomate "corta" a riqueza do queijo, limpando o paladar e evitando que a pizza se torne enjoativa. Ingredientes como picles ou azeitonas também podem adicionar essa nota ácida brilhante.</p>
        </Section>
        <Section title="Doçura Natural para Equilíbrio">
            <p>A doçura, mesmo que sutil, é crucial para equilibrar o sal e a acidez. Ela pode vir da caramelização natural da cebola e do pimentão, da concentração dos açúcares do tomate em um molho cozido, ou de adições intencionais, como um fio de mel para contrastar com um queijo salgado.</p>
        </Section>
        <Section title="Crocância como Elemento de Textura">
            <p>A experiência de comer pizza não é apenas sobre sabor, mas também sobre textura. O contraste entre a base crocante, a maciez do queijo derretido e a firmeza de uma carne curada é fundamental. A crocância adiciona uma dimensão auditiva e tátil que torna a experiência muito mais interessante.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>"The Flavor Bible" de Karen Page e Andrew Dornenburg</li>
              <li>"On Food and Cooking" de Harold McGee</li>
              <li>Modernist Cuisine</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SensoryProfilesPage;
