
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

const RegionalCombosPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Combinações Regionais do Mundo"
      subtitle="Um perfil histórico e cultural de como diferentes lugares criaram suas pizzas icônicas."
      showReferencesSection
    >
        <Section title="Tradições Italianas: Simplicidade e Qualidade">
            <p>A tradição italiana, especialmente a do sul (Nápoles), preza pela simplicidade e pela alta qualidade de poucos ingredientes. Combinações como a Margherita não são apenas uma receita, mas uma celebração do tomate, da mozzarella e do manjericão. A filosofia é "menos é mais", onde o sabor da massa fermentada e dos ingredientes frescos não deve ser mascarado.</p>
        </Section>
        <Section title="Tradições Americanas: Abundância e Inovação">
            <p>A pizza nos Estados Unidos evoluiu para um prato de abundância e criatividade. Estilos como o de Nova York popularizaram coberturas generosas de queijo e pepperoni. O estilo californiano, por sua vez, introduziu ingredientes frescos e inusitados, como abacate e queijo de cabra, refletindo uma cultura gastronômica focada em produtos locais e saudáveis.</p>
        </Section>
        <Section title="Tradições Brasileiras: Criatividade e Influência Cultural">
            <p>A pizza no Brasil, fortemente influenciada pela imigração italiana em São Paulo, desenvolveu uma identidade própria. Caracteriza-se pela generosidade nas coberturas e por combinações que refletem o paladar local, como a pizza de "Calabresa com cebola" e a "Portuguesa" (com presunto, ovo, ervilha e cebola). A criatividade é um marco, com a existência de inúmeros sabores que não são encontrados em outras partes do mundo.</p>
        </Section>
        <Section title="Outras Tradições (Japão, etc.)">
            <p>Em lugares como o Japão, a pizza foi adaptada para incluir ingredientes locais e combinações únicas, como o uso de molho teriyaki, maionese e frutos do mar, demonstrando a incrível capacidade da pizza de se adaptar e se fundir com diferentes culturas gastronômicas.</p>
        </Section>
        <Section title="Harmonias Sensoriais Consolidadas">
            <p>Independentemente da origem, as combinações que se tornam clássicas o fazem porque respeitam princípios de harmonia sensorial. A pizza "havaiana" (presunto e abacaxi), por exemplo, embora controversa, funciona pelo contraste clássico de doce e salgado, um pilar da gastronomia.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>"Modernist Pizza" (seções sobre a história global da pizza)</li>
              <li>Livros de história da gastronomia</li>
              <li>Wikipedia (History of pizza)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default RegionalCombosPage;
