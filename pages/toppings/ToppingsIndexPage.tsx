import React, { useState } from 'react';
import { 
    SparklesIcon, 
    BeakerIcon, 
    BookOpenIcon, 
    FireIcon, 
    CubeIcon, 
    CalculatorIcon,
    SpinnerIcon,
    TagIcon
} from '../../components/IconComponents';
import TechnicalPageLayout from '../learn/TechnicalPageLayout';
import { DoughConfig } from '../../types';
import { useUser } from '../../contexts/UserProvider';
import { GoogleGenAI } from "@google/genai";

type TabId = 'fundamentals' | 'cheeses' | 'sauces' | 'meats' | 'veggies' | 'finishers' | 'combos' | 'tool';

interface ToppingsIndexPageProps {
  onLoadInspiration: (config: Partial<DoughConfig>) => void;
}

const Section: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
    <div className={`py-6 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0 ${className}`}>
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-3">{title}</h3>
        <div className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const Table: React.FC<{ headers: string[], children: React.ReactNode }> = ({ headers, children }) => (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
        <table className="min-w-full text-sm text-left">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                <tr>
                    {headers.map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {children}
            </tbody>
        </table>
    </div>
);

// --- Classic Combinations Data ---
const classicCombinations = {
    italianos: [
        { name: 'Margherita', ingredients: 'Molho de tomate pelati, fior di latte, manjericão, azeite', moisture: 'Média', fat: 'Média', weight: 'Leve', presetId: 'pizza_napoletana_avpn' },
        { name: 'Marinara', ingredients: 'Tomate, alho, orégano, azeite (sem queijo)', moisture: 'Baixa', fat: 'Baixa', weight: 'Leve', presetId: 'pizza_napoletana_avpn' },
        { name: 'Quattro Formaggi', ingredients: 'Mozzarella, gorgonzola, provolone, parmesão', moisture: 'Baixa', fat: 'Alta', weight: 'Médio', presetId: 'pizza_romana_pala_teglia' },
        { name: 'Diavola', ingredients: 'Molho de tomate, mozzarella, salame picante', moisture: 'Baixa', fat: 'Alta', weight: 'Médio', presetId: 'pizza_napoletana_avpn' },
        { name: 'Capricciosa', ingredients: 'Tomate, mozzarella, presunto, cogumelos, alcachofras, azeitonas', moisture: 'Média-Alta', fat: 'Média', weight: 'Pesado', presetId: 'pizza_romana_pala_teglia' },
        { name: 'Prosciutto e Rucola', ingredients: 'Base margherita, presunto cru, rúcula (pós-forno)', moisture: 'Média', fat: 'Média', weight: 'Médio', presetId: 'pizza_napoletana_avpn' },
    ],
    americanos: [
        { name: 'Pepperoni Classic (NY)', ingredients: 'Molho cozido, mozzarella low-moisture, pepperoni', moisture: 'Baixa', fat: 'Alta', weight: 'Médio', presetId: 'pizza_new_york' },
        { name: 'Sausage & Onion', ingredients: 'Molho, mozzarella, linguiça fresca, cebola', moisture: 'Média', fat: 'Alta', weight: 'Pesado', presetId: 'pizza_new_york' },
        { name: 'White Pie', ingredients: 'Ricota, mozzarella, alho, parmesão', moisture: 'Baixa', fat: 'Alta', weight: 'Médio', presetId: 'pizza_new_york' },
        { name: 'Detroit Pepperoni', ingredients: 'Queijo até a borda, pepperoni, molho por cima', moisture: 'Baixa', fat: 'Muito Alta', weight: 'Pesado', presetId: 'pizza_detroit' },
    ],
    brasileiros: [
        { name: 'Calabresa com Cebola', ingredients: 'Molho, mozzarella, calabresa, cebola, azeitonas', moisture: 'Média', fat: 'Alta', weight: 'Pesado', presetId: 'pizza_classica_brasileira' },
        { name: 'Portuguesa', ingredients: 'Molho, mozzarella, presunto, ovo, ervilha, cebola, azeitonas', moisture: 'Alta', fat: 'Média', weight: 'Muito Pesado', presetId: 'pizza_classica_brasileira' },
        { name: 'Frango com Catupiry', ingredients: 'Molho, mozzarella, frango desfiado, catupiry', moisture: 'Média', fat: 'Média', weight: 'Pesado', presetId: 'pizza_classica_brasileira' },
        { name: 'Tomate Seco com Rúcula', ingredients: 'Molho, mozzarella, tomate seco, rúcula (pós-forno)', moisture: 'Baixa', fat: 'Média-Alta', weight: 'Médio', presetId: 'pizza_classica_brasileira' },
        { name: 'Carne Seca com Catupiry', ingredients: 'Base de catupiry, carne seca refogada, cebola', moisture: 'Baixa', fat: 'Alta', weight: 'Pesado', presetId: 'pizza_classica_brasileira' },
        { name: 'Romeu e Julieta', ingredients: 'Mozzarella, goiabada', moisture: 'Baixa', fat: 'Média', weight: 'Médio', presetId: 'pizza_classica_brasileira' },
        { name: 'Banana, Açúcar e Canela', ingredients: 'Mozzarella, banana, açúcar, canela', moisture: 'Média', fat: 'Baixa', weight: 'Médio', presetId: 'pizza_classica_brasileira' },
    ]
};

const mainIngredientsForTool = ['Gorgonzola', 'Calabresa', 'Cogumelo', 'Bacon', 'Cebola Roxa', 'Tomate Seco', 'Manjericão'];

interface AIPairing {
    combination: string;
    justification: string;
    type: "Clássica" | "Inovadora";
}

const ToppingsIndexPage: React.FC<ToppingsIndexPageProps> = ({ onLoadInspiration }) => {
    const { batches } = useUser();
    const [activeTab, setActiveTab] = useState<TabId>('fundamentals');
    
    // State for AI Tool
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [pairings, setPairings] = useState<AIPairing[]>([]);
    const [isLoadingAI, setIsLoadingAI] = useState(false);

    const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
        { id: 'fundamentals', label: 'Fundamentos', icon: <BookOpenIcon className="h-5 w-5" /> },
        { id: 'cheeses', label: 'Queijos', icon: <CubeIcon className="h-5 w-5" /> },
        { id: 'sauces', label: 'Molhos & Tomates', icon: <FireIcon className="h-5 w-5" /> },
        { id: 'meats', label: 'Carnes & Embutidos', icon: <CubeIcon className="h-5 w-5" /> },
        { id: 'veggies', label: 'Vegetais & Conservas', icon: <SparklesIcon className="h-5 w-5" /> },
        { id: 'finishers', label: 'Óleos, Ervas & Finalizações', icon: <BeakerIcon className="h-5 w-5" /> },
        { id: 'combos', label: 'Combinações Clássicas', icon: <BookOpenIcon className="h-5 w-5" /> },
        { id: 'tool', label: 'O que combina com...', icon: <SparklesIcon className="h-5 w-5" /> },
    ];

    const handleGetPairings = async () => {
        if (!selectedIngredient) return;
        setIsLoadingAI(true);
        setPairings([]);

        const prompt = `System: Você é um especialista culinário especializado em ciência de sabores e combinações para pizza. Sua tarefa é sugerir combinações de ingredientes para pizza com base em um ingrediente principal. Responda em português do Brasil. Sua resposta deve ser um array JSON válido de objetos. Cada objeto deve ter três propriedades: "combination" (uma string com a lista de ingredientes, ex: "Pera, Nozes e Mel"), "justification" (uma breve explicação técnica do motivo pelo qual a combinação funciona, com base na ciência dos sabores, como contraste, equilíbrio, etc.), e "type" (seja "Clássica" ou "Inovadora").

User: Eu tenho ${selectedIngredient}. Sugira 3 combinações.`;

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            const text = response.text.replace(/```json|```/g, '').trim();
            const parsed = JSON.parse(text);
            setPairings(parsed);
        } catch (error) {
            console.error("Error fetching AI pairings:", error);
            setPairings([]); // Clear pairings on error
        } finally {
            setIsLoadingAI(false);
        }
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'fundamentals': return (
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">Fundamentos do Recheio</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Princípios de equilíbrio, umidade e peso para a pizza perfeita.</p>
                    <Section title="Equilíbrio de Sabor">
                        <p>Uma pizza de excelência é um exercício de equilíbrio entre os cinco gostos básicos. O objetivo é evitar a saturação e criar uma experiência complexa. Os eixos são:</p>
                        <ul>
                            <li><strong>Salgado/Umami:</strong> Vindo de queijos curados, carnes e azeitonas. É o pilar do sabor.</li>
                            <li><strong>Doce:</strong> Presente no tomate, cebola caramelizada ou em finalizações como mel. Equilibra o sal e a acidez.</li>
                            <li><strong>Ácido:</strong> A acidez do tomate é crucial para "cortar" a gordura do queijo e limpar o paladar.</li>
                            <li><strong>Gordura:</strong> Fornecida pelo queijo, azeite e carnes, é um veículo de sabor e contribui para a textura.</li>
                        </ul>
                    </Section>
                    <Section title="Controle de Umidade">
                        <p>A umidade é a principal inimiga de uma base crocante. Muitos ingredientes liberam água no forno, cozinhando a massa por baixo em vez de assá-la, o que causa a temida "gum line" (linha de massa crua). Técnicas para controlar a umidade incluem pré-assar ou saltear vegetais, usar molhos mais reduzidos e não sobrecarregar a pizza.</p>
                        <Table headers={['Ingrediente', 'Risco de Umidade', 'Ação Recomendada']}>
                            <tr><td className="px-4 py-3">Cogumelos, abobrinha</td><td className="px-4 py-3">Alto</td><td className="px-4 py-3">Saltear ou grelhar antes</td></tr>
                            <tr><td className="px-4 py-3">Queijos frescos (búfala, fior di latte)</td><td className="px-4 py-3">Médio-Alto</td><td className="px-4 py-3">Drenar bem e secar</td></tr>
                            <tr><td className="px-4 py-3">Molho de tomate muito líquido</td><td className="px-4 py-3">Alto</td><td className="px-4 py-3">Reduzir em fogo baixo</td></tr>
                        </Table>
                    </Section>
                    <Section title="Peso Total do Topping">
                        <p>O peso excessivo dos recheios pode comprimir a massa, impedindo o "oven spring" (salto de forno) e resultando em uma borda (cornicione) achatada e densa. Massas de alta hidratação são mais delicadas e sensíveis ao peso. A regra é: quanto mais leve e aerada a massa, mais cuidado com a quantidade de cobertura.</p>
                    </Section>
                </div>
            );
            case 'cheeses': return (
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">Queijos</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Análise técnica dos principais queijos, seu comportamento térmico e uso ideal.</p>
                     <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                        O comportamento de um queijo na pizza é determinado pela sua composição de gordura, umidade e estrutura proteica. Um estudo chave de Ma et al. (2014) quantificou como umidade e óleo livre afetam o derretimento e a formação de bolhas.
                    </p>
                    <Table headers={['Queijo', 'Umidade (%)', 'Gordura (%)', 'Derretimento', 'Uso Ideal']}>
                        <tr><td className="px-4 py-3 font-medium">Mussarela Low-Moisture</td><td className="px-4 py-3">45-52</td><td className="px-4 py-3">20-25</td><td className="px-4 py-3">Excelente e uniforme</td><td className="px-4 py-3">NY Style</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Fior di Latte</td><td className="px-4 py-3">52-60</td><td className="px-4 py-3">18-22</td><td className="px-4 py-3">Bom, libera mais água</td><td className="px-4 py-3">Napoletana</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Mozzarella di Bufala</td><td className="px-4 py-3">55-62</td><td className="px-4 py-3">22-26</td><td className="px-4 py-3">Cremoso, libera muita água</td><td className="px-4 py-3">Napoletana (forno >450°C)</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Provolone</td><td className="px-4 py-3">~45</td><td className="px-4 py-3">~26</td><td className="px-4 py-3">Bom, menos elástico</td><td className="px-4 py-3">Misturas de queijo</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Parmesão</td><td className="px-4 py-3">~30</td><td className="px-4 py-3">~28</td><td className="px-4 py-3">Não derrete, doura</td><td className="px-4 py-3">Finalização (pós-forno)</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Gorgonzola</td><td className="px-4 py-3">~42</td><td className="px-4 py-3">~30</td><td className="px-4 py-3">Muito cremoso</td><td className="px-4 py-3">Pizzas especiais</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Catupiry</td><td className="px-4 py-3">~55</td><td className="px-4 py-3">~25</td><td className="px-4 py-3">Cremoso, estável</td><td className="px-4 py-3">Pizza Brasileira</td></tr>
                    </Table>
                </div>
            );
            case 'sauces': return (
                 <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">Molhos & Tomates</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">A ciência do tomate cru vs. cozido, acidez e viscosidade.</p>
                     <Section title="Molho Cru (Pelati) vs. Molho Cozido">
                        <p><strong>Cru:</strong> Usado na Napolitana, preserva a acidez e o frescor do tomate. O sabor é brilhante. Requer tomates de altíssima qualidade. <strong>Cozido:</strong> Típico da NY Style e pizza brasileira. A cocção evapora a água, concentra os açúcares (reduzindo a acidez percebida) e aprofunda o sabor. Oferece mais controle sobre a umidade.</p>
                    </Section>
                     <Section title="Quando usar menos molho">
                        <ul>
                            <li>Em fornos domésticos com tempo de cozimento mais longo.</li>
                            <li>Quando usar toppings que já liberam muita umidade.</li>
                            <li>Em massas de hidratação muito alta para não sobrecarregar.</li>
                        </ul>
                    </Section>
                </div>
            );
            case 'meats': return (
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">Carnes & Embutidos</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Comportamento da gordura, "cupping" do pepperoni e pré-cozimento.</p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">O "cupping" do pepperoni ocorre porque a parte superior, exposta ao calor, cozinha e encolhe mais rápido que a inferior, formando um "copo" que acumula a gordura derretida.</p>
                     <Table headers={['Carne', 'Gordura Liberada', 'Pré-cozer?', 'Risco para Massa']}>
                        <tr><td className="px-4 py-3 font-medium">Pepperoni</td><td className="px-4 py-3">Alta</td><td className="px-4 py-3">Não</td><td className="px-4 py-3">Baixo (óleo pode se espalhar)</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Linguiça Fresca</td><td className="px-4 py-3">Média-Alta</td><td className="px-4 py-3">Sim</td><td className="px-4 py-3">Alto (libera água e gordura)</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Bacon</td><td className="px-4 py-3">Muito Alta</td><td className="px-4 py-3">Sim</td><td className="px-4 py-3">Alto (se não pré-cozido)</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Presunto Cru</td><td className="px-4 py-3">Baixa</td><td className="px-4 py-3">Nunca (pós-forno)</td><td className="px-4 py-3">Nenhum</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Carne Seca</td><td className="px-4 py-3">Baixa</td><td className="px-4 py-3">Sim (dessalgar/cozinhar)</td><td className="px-4 py-3">Baixo</td></tr>
                    </Table>
                </div>
            );
            case 'veggies': return (
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">Vegetais & Conservas</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Foco no controle de umidade e textura.</p>
                     <Table headers={['Vegetal', 'Umidade Estimada', 'Pré-cozer?', 'Observação']}>
                        <tr><td className="px-4 py-3 font-medium">Cogumelos</td><td className="px-4 py-3">92%</td><td className="px-4 py-3">Sim</td><td className="px-4 py-3">Liberam muita água se crus.</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Cebola</td><td className="px-4 py-3">89%</td><td className="px-4 py-3">Depende</td><td className="px-4 py-3">Fatias finas cozinham bem.</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Pimentão</td><td className="px-4 py-3">92%</td><td className="px-4 py-3">Opcional</td><td className="px-4 py-3">Pode ir cru se fatiado fino.</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Tomate Seco</td><td className="px-4 py-3">15-20%</td><td className="px-4 py-3">Não</td><td className="px-4 py-3">Já é desidratado, mas vem em óleo.</td></tr>
                    </Table>
                </div>
            );
            case 'finishers': return (
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">Óleos, Ervas & Finalizações</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">O que colocar antes e depois do forno para maximizar o sabor.</p>
                     <Section title="Pré-Forno vs. Pós-Forno">
                        <p>A regra é simples: ingredientes delicados e com aromas voláteis devem ser adicionados depois que a pizza sai do forno. Ingredientes robustos podem ir antes.</p>
                        <ul>
                            <li><strong>Pré-forno:</strong> Orégano seco, pimenta calabresa, alho em pó.</li>
                            <li><strong>Pós-forno:</strong> Manjericão fresco, rúcula, azeite extra virgem de alta qualidade, presunto cru, lascas de parmesão.</li>
                        </ul>
                    </Section>
                </div>
            );
            case 'combos': return (
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">Combinações Clássicas</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Uma galeria de sabores clássicos e modernos, com análise técnica.</p>
                    {Object.entries(classicCombinations).map(([category, pizzas]) => (
                        <div key={category} className="mb-8">
                            <h3 className="text-xl font-medium capitalize mb-4">{category}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pizzas.map(pizza => {
                                    const usedInBatches = batches.some(b => b.name.toLowerCase().includes(pizza.name.toLowerCase()));
                                    return (
                                        <div key={pizza.name} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm space-y-3 dark:bg-neutral-800 dark:border-neutral-700">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-lg font-medium text-neutral-900 dark:text-white">{pizza.name}</h4>
                                                {usedInBatches && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 flex items-center gap-1"><TagIcon className="h-3 w-3"/> Já usada</span>}
                                            </div>
                                            <p className="text-sm text-neutral-700 dark:text-neutral-300">{pizza.ingredients}</p>
                                            <div className="text-xs text-neutral-500 dark:text-neutral-400 flex gap-4">
                                                <span>Umidade: {pizza.moisture}</span>
                                                <span>Gordura: {pizza.fat}</span>
                                                <span>Peso: {pizza.weight}</span>
                                            </div>
                                            <button onClick={() => onLoadInspiration({ stylePresetId: pizza.presetId })} className="w-full mt-2 flex items-center justify-center gap-2 rounded-md bg-neutral-100 dark:bg-neutral-700 py-2 px-3 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                                                <CalculatorIcon className="h-4 w-4" /> Enviar para calculadora
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            );
            case 'tool': return (
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">Ferramenta: O que combina com...</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Selecione um ingrediente principal e descubra combinações com base na ciência de sabores.</p>
                     <div className="rounded-xl border border-neutral-200 bg-white p-4 md:p-6 shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <select value={selectedIngredient} onChange={e => setSelectedIngredient(e.target.value)} className="block w-full rounded-md border-neutral-300 bg-white dark:bg-neutral-700 py-2.5 px-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm">
                                <option value="">Selecione um ingrediente...</option>
                                {mainIngredientsForTool.map(ing => <option key={ing} value={ing}>{ing}</option>)}
                            </select>
                            <button onClick={handleGetPairings} disabled={isLoadingAI || !selectedIngredient} className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-lime-500 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-lime-600 disabled:bg-slate-400">
                                {isLoadingAI ? <SpinnerIcon className="h-5 w-5 animate-spin"/> : <SparklesIcon className="h-5 w-5" />}
                                {isLoadingAI ? 'Buscando...' : 'Buscar'}
                            </button>
                        </div>
                    </div>
                    
                    {isLoadingAI && <p className="text-center mt-6">Analisando combinações...</p>}

                    {pairings.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            {pairings.map((p, i) => (
                                <div key={i} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm space-y-3 dark:bg-neutral-800 dark:border-neutral-700">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.type === 'Clássica' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{p.type}</span>
                                    <h4 className="font-medium text-neutral-900 dark:text-white">{p.combination}</h4>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-300">{p.justification}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
            default: return null;
        }
    }

    return (
        <TechnicalPageLayout
            title="Coberturas & Recheios"
            subtitle="Escolha cobertura ou pizza já validada e calcule com precisão."
            showReferencesSection
        >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 not-prose">
                <aside className="lg:w-1/4">
                    <nav className="sticky top-24 space-y-2">
                        {tabs.map(tab => (
                             <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex w-full items-center gap-3 rounded-lg p-3 text-sm font-semibold transition-colors ${
                                    activeTab === tab.id
                                    ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                                }`}
                            >
                                <span className={activeTab === tab.id ? 'text-lime-500' : ''}>{tab.icon}</span>
                                <span className="truncate">{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>
                <main className="w-full lg:flex-1">
                    {renderContent()}
                </main>
            </div>
             <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-700">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100">
                    <BookOpenIcon className="h-6 w-6 text-lime-500" />
                    <span>Referências Técnicas</span>
                </h2>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 italic">
                    Modernist Pizza / King Arthur Baking / Serious Eats / PizzaBlab / Ma et al. (2014) "Quantification of Pizza Baking Properties of Different Cheeses" / Wikipedia (Queijo para pizza).
                </p>
            </div>
        </TechnicalPageLayout>
    );
};

export default ToppingsIndexPage;
