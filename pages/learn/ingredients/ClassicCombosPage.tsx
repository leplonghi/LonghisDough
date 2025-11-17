
import React from 'react';
import TechnicalPageLayout from '../TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon } from '../../../components/IconComponents';

const Section: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
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

const IngredientDetail: React.FC<{ title: string; combos: string[]; sensory: { [key: string]: string }; analysis: string }> = ({ title, combos, sensory, analysis }) => (
    <div className="mt-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-700/50">
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">{title}</h4>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <h5 className="font-semibold mb-1">Combinações Clássicas:</h5>
                <ul className="list-disc list-inside space-y-1">
                    {combos.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
                <h5 className="font-semibold mt-3 mb-1">Análise Técnica:</h5>
                <p>{analysis}</p>
            </div>
            <div>
                <h5 className="font-semibold mb-1">Perfil Sensorial:</h5>
                <dl className="text-sm space-y-1">
                    {Object.entries(sensory).map(([key, value]) => (
                        <div key={key}>
                            <dt className="font-medium text-slate-500 dark:text-slate-400">{key}:</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    </div>
);

const ClassicCombosPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Combinações Clássicas"
      subtitle="A ciência e a tradição por trás das combinações que definiram a pizza no mundo todo."
      showReferencesSection
    >
      <Section title="Introdução: A Arte de Combinar Sabores">
        <p>
          Uma combinação de sucesso na pizza não é um acidente, mas sim um exercício de equilíbrio químico e sensorial. As melhores combinações, validadas ao longo de décadas, baseiam-se em princípios fundamentais do "flavor pairing":
        </p>
        <ul>
            <li><strong>Equilíbrio:</strong> Sabores que se complementam, como a acidez do tomate cortando a gordura do queijo.</li>
            <li><strong>Contraste:</strong> A interação de opostos que cria uma experiência mais complexa.</li>
            <li><strong>Sinergia Aromática:</strong> Onde a combinação de ingredientes cria um sabor mais intenso do que a soma de suas partes, como a amplificação do umami.</li>
        </ul>
      </Section>

      <Section title="Ingredientes e Suas Combinações" icon={<BookOpenIcon className="h-5 w-5" />}>
          <IngredientDetail
            title="Tomate"
            combos={['Mozzarella', 'Manjericão', 'Alho', 'Azeite', 'Orégano']}
            sensory={{ "Notas aromáticas": "Fresco, frutado, ácido", "Intensidade": "Média", "Textura": "Suave, líquida", "Risco de umidade": "Alto" }}
            analysis="É o coração da pizza. A acidez do tomate (ácidos cítrico e málico) é fundamental para equilibrar a riqueza e a gordura dos queijos e carnes."
          />
          <IngredientDetail
            title="Mozzarella"
            combos={['Tomate', 'Pepperoni', 'Manjericão', 'Provolone', 'Cogumelo']}
            sensory={{ "Notas aromáticas": "Láctico, suave", "Intensidade": "Baixa", "Textura": "Macia, elástica", "Risco de umidade": "Médio a Alto" }}
            analysis="A base neutra e texturizada da pizza. Seu sabor suave não compete com outros ingredientes, e sua elasticidade derretida é a textura esperada."
          />
          <IngredientDetail
            title="Cogumelos"
            combos={['Mozzarella', 'Alho', 'Azeite', 'Ervas frescas']}
            sensory={{ "Notas aromáticas": "Terroso, umami", "Intensidade": "Média", "Textura": "Macia, carnuda", "Risco de umidade": "Altíssimo (se cru)" }}
            analysis="Ricos em glutamatos, os cogumelos adicionam uma profundidade de sabor umami. Devem ser pré-cozidos para eliminar o excesso de água, que pode encharcar a massa."
          />
          <IngredientDetail
            title="Cebola"
            combos={['Calabresa', 'Bacon', 'Mozzarella', 'Pimentão']}
            sensory={{ "Notas aromáticas": "Pungente (crua), doce (cozida)", "Intensidade": "Média a Alta", "Textura": "Crocante (crua), macia (cozida)", "Risco de umidade": "Médio" }}
            analysis="A doçura da cebola caramelizada no forno é o contraponto perfeito para a gordura e o sal de embutidos como calabresa e bacon."
          />
      </Section>
    </TechnicalPageLayout>
  );
};

export default ClassicCombosPage;
