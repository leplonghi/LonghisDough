
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon, LightBulbIcon } from '../../components/IconComponents';

// Local Section component for structuring content
const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
            {icon}
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            {children}
        </div>
    </div>
);

const TroubleshootingPage: React.FC = () => {
  return (
    <TechnicalPageLayout 
        title="Diagnósticos: Problemas Comuns da Pizza" 
        subtitle="Um guia científico para identificar e corrigir as falhas mais comuns, com base em fontes técnicas."
        showReferencesSection
    >
        <Section title="1. Introdução: A Pizza como um Sistema Complexo">
            <p>
                A pizza é um sistema complexo onde múltiplos fatores — água, farinha, fermentação, calor e ingredientes — interagem simultaneamente. Um pequeno desequilíbrio em qualquer uma dessas áreas pode levar a resultados inesperados. Entender as causas-raiz, com base em ciência, é o caminho para a consistência.
            </p>
        </Section>

        <Section title="2. Problema: Gum Line (Massa crua abaixo do molho)" icon={<BeakerIcon className="h-5 w-5" />}>
            <h4>Causas Reais:</h4>
            <ul>
                <li><strong>Excesso de Umidade:</strong> Molho muito líquido, queijo úmido ou vegetais crus liberam vapor que "cozinha" a massa em vez de assá-la.</li>
                <li><strong>Ingredientes Frios:</strong> Molho ou massa muito frios causam condensação na interface, criando a camada úmida.</li>
                <li><strong>Massa Subfermentada:</strong> Não possui uma estrutura de alvéolos desenvolvida para permitir que o vapor escape.</li>
                <li><strong>Forno/Piso Fraco:</strong> A falta de calor por condução na base não consegue secar a massa rapidamente.</li>
                <li><strong>Excesso de Ingredientes:</strong> Uma camada espessa de cobertura age como um isolante térmico, bloqueando o calor.</li>
                <li><strong>Farinha Fraca Demais:</strong> A rede de glúten pode colapsar sob o peso, compactando a massa e impedindo o cozimento.</li>
            </ul>
        </Section>
        
        <Section title="3. Problema: Snapback (Massa que encolhe ao abrir)" icon={<LightBulbIcon className="h-5 w-5" />}>
            <h4>Explicação Científica:</h4>
            <ul>
                <li><strong>Glúten Tensionado:</strong> A rede de glúten, especialmente a proteína glutenina, está contraída e se comporta como um elástico.</li>
                <li><strong>Descanso Insuficiente:</strong> A massa não teve tempo suficiente para relaxar após ser boleada (manuseada). O descanso permite que as ligações de glúten se reajustem.</li>
                <li><strong>Farinha Forte Demais (P/L Alto):</strong> Farinhas com alta tenacidade (P) são naturalmente mais elásticas e propensas ao snapback.</li>
                <li><strong>Temperatura da Massa Baixa:</strong> O frio enrijece a rede de glúten, tornando-a menos extensível e mais elástica.</li>
            </ul>
        </Section>

        <Section title="4. Problema: Base Queimada">
            <h4>Causas Reais:</h4>
            <ul>
                <li><strong>Piso Muito Quente:</strong> Excesso de calor por condução, comum ao colocar a pizza sobre uma área recém-exposta a brasas em fornos a lenha.</li>
                <li><strong>Superfície Altamente Condutora:</strong> Uma chapa de aço ("baking steel") transfere calor muito mais rápido que a pedra. Em fornos de altíssima temperatura, o aço pode queimar a base antes que o topo cozinhe.</li>
                <li><strong>Excesso de Farinha na Bancada:</strong> A farinha solta na base da pizza queima rapidamente em altas temperaturas, criando um sabor amargo e fuligem.</li>
            </ul>
        </Section>

        <Section title="5. Problema: Pizza Encharcada">
            <h4>Causas Reais:</h4>
            <ul>
                <li><strong>Vegetais Liberando Água:</strong> Ingredientes como cogumelos, abobrinha e espinafre, quando crus, liberam uma grande quantidade de umidade.</li>
                <li><strong>Molho Muito Líquido:</strong> O excesso de água do molho não evapora a tempo e é absorvido pela massa.</li>
                <li><strong>Queijo Muito Úmido:</strong> Mozzarella fresca (fior di latte, búfala) deve ser bem drenada antes do uso.</li>
                <li><strong>Excesso de Toppings:</strong> Muitos ingredientes frios e úmidos sobrecarregam a capacidade do forno de evaporar a umidade.</li>
                <li><strong>Piso do Forno Frio:</strong> Não há calor de condução suficiente para selar e secar a base da massa.</li>
            </ul>
        </Section>
        
        <Section title="6. Problema: Pizza Pálida">
            <h4>Causas:</h4>
            <ul>
                <li><strong>Falta de Radiação de Calor:</strong> O teto do forno não está quente o suficiente. Em fornos domésticos, o calor inferior costuma ser mais forte.</li>
                <li><strong>Superfície Úmida:</strong> A energia do forno é gasta evaporando a água, o que impede que a superfície atinja a temperatura necessária para as reações de Maillard/caramelização.</li>
                <li><strong>Pouco Açúcar Disponível:</strong> Pode ser causado por fermentação curta (não quebrou amido suficiente) ou super-fermentação (a levedura consumiu todos os açúcares).</li>
            </ul>
        </Section>

        <Section title="7. Problema: Massa Densa">
            <h4>Causas:</h4>
            <ul>
                <li><strong>Fermentação Insuficiente (Under-proofed):</strong> A levedura não produziu CO₂ suficiente para inflar a rede de glúten.</li>
                <li><strong>Farinha Fraca ou Mal Hidratada:</strong> A rede de glúten não se formou corretamente para reter o gás.</li>
                <li><strong>Temperatura da Massa Inadequada:</strong> Massa muito fria inibe a levedura; muito quente pode levar ao colapso da estrutura.</li>
                <li><strong>Excesso de Manipulação (Degassing):</strong> Abrir a massa com muita força ou com um rolo pode expelir todo o gás acumulado.</li>
            </ul>
        </Section>

        <Section title="8. Problema: Borda Estoura / Fica Irregular">
            <h4>Causas:</h4>
            <ul>
                <li><strong>Gás Acumulado de Forma Desigual:</strong> Grandes bolhas de gás presas na massa que se expandem rapidamente no forno.</li>
                <li><strong>Abertura Inconsistente:</strong> Deixar partes da borda mais finas que outras cria pontos fracos que estouram.</li>
                <li><strong>Fermentação Muito Avançada:</strong> A rede de glúten está no seu limite de elasticidade e se rompe facilmente com a expansão do gás no forno.</li>
            </ul>
        </Section>
        
        <Section title="9. Referências Técnicas" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Modernist Bread</li>
              <li>Serious Eats – Pizza Troubleshooting Guides</li>
              <li>Ooni Learn – Common Pizza Problems</li>
              <li>Wikipedia – Maillard Reaction, Caramelization, Baking Chemistry</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default TroubleshootingPage;
