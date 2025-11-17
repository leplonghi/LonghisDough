
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

const CaramelizableVegetablesPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Vegetais Caramelizáveis: Açúcares e Aromas"
      subtitle="Como o calor transforma a doçura natural de vegetais em sabores complexos."
      showReferencesSection
    >
        <Section title="A Ciência da Caramelização">
            <p>A caramelização é um processo de oxidação de açúcares que ocorre sob calor. Diferente da Reação de Maillard, ela não envolve proteínas. Quando vegetais ricos em açúcares são aquecidos, suas longas cadeias de carboidratos se quebram em açúcares simples, que então se decompõem e reformam, criando centenas de novos compostos aromáticos.</p>
        </Section>
        <Section title="Principais Vegetais Caramelizáveis">
            <p>Alguns vegetais são particularmente adequados para este processo devido ao seu alto teor de açúcares naturais:</p>
            <ul>
                <li><strong>Cebola:</strong> O exemplo clássico. O calor transforma seus compostos de enxofre pungentes em notas doces e profundas.</li>
                <li><strong>Pimentão:</strong> Especialmente os vermelhos e amarelos, que perdem seu amargor e desenvolvem uma doçura intensa quando assados.</li>
                <li><strong>Cenoura e Abóbora:</strong> Quando fatiados finamente, seus açúcares caramelizam, adicionando uma doçura terrosa.</li>
            </ul>
        </Section>
        <Section title="Desenvolvimento de Notas Doces e Complexas">
            <p>O processo de caramelização transforma o sabor unidimensional dos vegetais crus em um perfil complexo, com notas de nozes, tostado e umami, além da doçura evidente. Essa complexidade adiciona uma camada de sabor sofisticada à pizza, que vai além do simples "gosto de vegetal".</p>
        </Section>
        <Section title="Impacto no Perfil Geral da Pizza">
            <p>A doçura dos vegetais caramelizados serve como um contraponto perfeito para ingredientes salgados e gordurosos, como queijos curados, bacon ou anchovas. Esse equilíbrio entre doce e salgado é um dos pilares fundamentais da harmonia de sabores na gastronomia.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>"On Food and Cooking" de Harold McGee</li>
              <li>Wikipedia (Caramelization)</li>
              <li>Food Chemistry (livros didáticos sobre o tema)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default CaramelizableVegetablesPage;
