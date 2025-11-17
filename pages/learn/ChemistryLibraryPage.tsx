
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon, FireIcon } from '../../components/IconComponents';

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

const ChemistryLibraryPage: React.FC = () => {
  return (
    <TechnicalPageLayout title="Biblioteca Química da Pizza" showReferencesSection>
        <Section title="Introdução: A Pizza como Laboratório">
            <p>
                A criação de uma pizza é um exercício prático de química e física. A partir do momento em que a água toca a farinha, uma cascata de transformações começa, envolvendo os principais blocos de construção dos alimentos: carboidratos, proteínas, lipídios, açúcares, água e gases. Entender esses processos permite um controle muito maior sobre o resultado final.
            </p>
        </Section>

        <Section title="1. Hidratação & Solubilização" icon={<BeakerIcon className="h-5 w-5" />}>
            <p>A água é o catalisador universal na massa. Sua primeira função é a de solvente, dissolvendo sal, açúcares e permitindo que as enzimas se movam e comecem a trabalhar. Em seguida, ela hidrata os grânulos de amido e, mais importante, as proteínas da farinha, iniciando a formação do glúten. A quantidade de água (hidratação) influencia diretamente a mobilidade das moléculas e, consequentemente, a extensibilidade da massa.</p>
        </Section>

        <Section title="2. Formação do Glúten">
            <p>O glúten é uma rede proteica complexa formada quando duas proteínas da farinha, a <strong>gliadina</strong> e a <strong>glutenina</strong>, são hidratadas e manipuladas. Ligações intermoleculares (pontes de dissulfeto) são formadas, criando uma estrutura viscoelástica.</p>
            <ul>
                <li><strong>Gliadina:</strong> Responsável pela <strong>extensibilidade</strong> (capacidade de esticar).</li>
                <li><strong>Glutenina:</strong> Responsável pela <strong>elasticidade</strong> e força (tendência a voltar à forma original).</li>
            </ul>
            <p>A manipulação (sova, dobras) organiza e fortalece essa rede. O descanso (autólise) permite que a hidratação ocorra passivamente, desenvolvendo o glúten com menos trabalho mecânico.</p>
        </Section>

        <Section title="3. Fermentação" icon={<BeakerIcon className="h-5 w-5" />}>
            <p>A fermentação é o processo metabólico realizado pela levedura <em>Saccharomyces cerevisiae</em>. Em um ambiente de pouco oxigênio (anaeróbico), a levedura consome açúcares simples e produz <strong>dióxido de carbono (CO₂)</strong> e <strong>etanol</strong>.</p>
            <ul>
                <li>O CO₂ fica aprisionado na rede de glúten, inflando a massa e criando o volume.</li>
                <li>O etanol e outros subprodutos (ésteres, ácidos orgânicos) são os principais responsáveis pelo desenvolvimento do sabor e aroma característicos de pão.</li>
                <li>Durante este processo, as enzimas <strong>amilases</strong> (quebrando amido em açúcares) e <strong>proteases</strong> (quebrando proteínas) continuam a modificar a massa, tornando-a mais saborosa e extensível.</li>
            </ul>
        </Section>

        <Section title="4. Reação de Maillard" icon={<FireIcon className="h-5 w-5" />}>
            <p>Esta não é uma única reação, mas uma complexa rede de reações que ocorrem entre <strong>aminoácidos</strong> (de proteínas) e <strong>açúcares redutores</strong> sob a ação do calor. É a principal responsável pela cor dourada-escura da borda e por uma vasta gama de sabores complexos e "tostados". A reação de Maillard requer calor seco e uma temperatura de superfície elevada para ocorrer de forma eficaz.</p>
        </Section>

        <Section title="5. Caramelização">
            <p>Distinta da Maillard, a caramelização é a degradação térmica (pirólise) dos <strong>açúcares</strong>. Ocorre em temperaturas geralmente mais altas e não envolve proteínas. É responsável por notas de sabor de nozes, amargas e doces, e pela coloração mais escura (quase âmbar) em pontos da crosta e em ingredientes como cebola.</p>
        </Section>

        <Section title="6. Gelatinização do Amido">
            <p>Durante o cozimento, os grânulos de amido na massa absorvem a água livre ao redor e incham drasticamente quando aquecidos. Este processo, chamado gelatinização, "trava" a água na estrutura do miolo e é fundamental para formar a textura interna macia e úmida da pizza. Em estilos de massa mais grossa, como a Detroit, a gelatinização completa é crucial para evitar um miolo cru.</p>
        </Section>

        <Section title="7. Evaporação e Mudança de Fase">
            <p>Quando a pizza entra no forno quente, a água livre na superfície da massa e nos ingredientes evapora rapidamente. A água dentro da massa se transforma em vapor. Este vapor se expande violentamente, inflando os alvéolos de gás (criados pela fermentação) e causando o "salto de forno" (oven spring) — o rápido crescimento final da borda. É um princípio básico de termodinâmica em ação.</p>
        </Section>

        <Section title="8. Lipídios e Oil-Out">
            <p>Os lipídios (gorduras), presentes no queijo e no azeite, têm um ponto de fusão mais baixo que a temperatura do forno. Eles derretem rapidamente, lubrificando a estrutura da pizza. Em queijos com alto teor de gordura, pode ocorrer o "oil-out", onde a gordura se separa da matriz de proteína e forma pequenas poças. Embora possa parecer excessivo, essa gordura livre é um excelente condutor de sabor.</p>
        </Section>
        
        <Section title="9. Degradação Térmica de Ervas e Aromas">
            <p>Os aromas de ervas frescas como o manjericão vêm de compostos orgânicos voláteis. Quando expostos ao calor intenso do forno, esses compostos evaporam ou se degradam rapidamente, perdendo seu aroma característico. É por isso que a tradição culinária italiana, baseada na prática, dita que ervas frescas e delicadas devem ser adicionadas após a pizza sair do forno.</p>
        </Section>
    </TechnicalPageLayout>
  );
};

export default ChemistryLibraryPage;
