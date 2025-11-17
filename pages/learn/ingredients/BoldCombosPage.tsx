
import React from 'react';
import TechnicalPageLayout from '../TechnicalPageLayout';
import { BeakerIcon, SparklesIcon } from '../../../components/IconComponents';

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
                <h5 className="font-semibold mb-1">Combinações Ousadas:</h5>
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

const BoldCombosPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Combinações Ousadas (Mas Validadas)"
      subtitle="Explorando as fronteiras do sabor na pizza moderna, com base em ciência e em pizzarias de vanguarda."
      showReferencesSection
    >
      <Section title="Introdução: Inovando Sobre a Tradição">
        <p>
          As combinações ousadas que marcam a pizza contemporânea não são aleatórias. Elas seguem os mesmos princípios de equilíbrio que as clássicas, mas aplicam ingredientes inesperados para criar novos contrastes e sinergias. Pizzarias de renome como Pizzarium em Roma ou Roberta's em Nova York são laboratórios de sabor, popularizando pares que desafiam a tradição.
        </p>
      </Section>

      <Section title="Ingredientes e Suas Combinações" icon={<SparklesIcon className="h-5 w-5" />}>
          <IngredientDetail
            title="Pepperoni"
            combos={['Mel', 'Picles de Jalapeño']}
            sensory={{ "Notas aromáticas": "Picante, defumado", "Intensidade": "Alta", "Textura": "Firme, crocante", "Risco de umidade": "Baixo (libera óleo)" }}
            analysis="O par com mel, popularizado em pizzarias americanas como Roberta's, cria um contraste 'sweet & heat' (doce e picante) que é altamente viciante."
          />
          <IngredientDetail
            title="Gorgonzola"
            combos={['Mel', 'Nozes', 'Pera']}
            sensory={{ "Notas aromáticas": "Pungente, complexo", "Intensidade": "Alta", "Textura": "Cremosa", "Risco de umidade": "Baixo" }}
            analysis="O contraste doce-salgado é a chave. O sabor intenso do queijo azul é equilibrado pela doçura do mel ou da pera, uma combinação clássica da gastronomia italiana."
          />
          <IngredientDetail
            title="Abobrinha"
            combos={['Ricota', 'Raspas de Limão', 'Hortelã']}
            sensory={{ "Notas aromáticas": "Suave, vegetal", "Intensidade": "Baixa", "Textura": "Macia", "Risco de umidade": "Altíssimo" }}
            analysis="Uma combinação leve e fresca. A ricota oferece uma base cremosa, e as raspas de limão (adicionadas no final) liberam óleos essenciais que iluminam o sabor suave da abobrinha."
          />
          <IngredientDetail
            title="Presunto Cru (Parma/Prosciutto)"
            combos={['Figo', 'Queijo de Cabra', 'Rúcula (pós-forno)']}
            sensory={{ "Notas aromáticas": "Salgado, curado", "Intensidade": "Alta", "Textura": "Fina, sedosa", "Risco de umidade": "Baixo" }}
            analysis="A combinação com figo é um clássico californiano/italiano moderno. O doce concentrado do figo corta o sal do presunto, criando um contraste agridoce sofisticado."
          />
      </Section>
    </TechnicalPageLayout>
  );
};

export default BoldCombosPage;
