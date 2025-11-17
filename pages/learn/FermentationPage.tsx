
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BookOpenIcon, BeakerIcon } from '../../components/IconComponents';

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

const FermentationPage: React.FC = () => {
  return (
    <TechnicalPageLayout 
        title="Fermentação Fria (Cold Fermentation)" 
        showReferencesSection
    >
        <Section title="1. Introdução: A Arte da Paciência">
            <p>
                A fermentação fria, ou maturação a frio, é a técnica de manter a massa sob baixa temperatura (tipicamente em refrigeração) por um período prolongado. O objetivo não é apenas fazer a massa crescer, mas sim orquestrar uma série de transformações bioquímicas lentas para:
            </p>
            <ul>
                <li><strong>Desacelerar a atividade microbiana:</strong> Reduzir o ritmo da levedura para evitar a superprodução de gás.</li>
                <li><strong>Permitir a digestão lenta de amidos:</strong> Dar tempo para que as enzimas da farinha quebrem carboidratos complexos.</li>
                <li><strong>Desenvolver sabor profundo:</strong> Gerar uma gama complexa de compostos aromáticos que não surgem em fermentações rápidas.</li>
                <li><strong>Aumentar a extensibilidade:</strong> Relaxar a rede de glúten, tornando a massa mais fácil de manusear e abrir.</li>
            </ul>
        </Section>

        <Section title="2. O que acontece cientificamente" icon={<BeakerIcon className="h-5 w-5" />}>
            <p>Em temperaturas baixas, a massa se transforma em um laboratório de reações lentas:</p>
            <ul>
                <li><strong>Leveduras adormecem:</strong> A produção de CO₂ pela levedura (<em>Saccharomyces cerevisiae</em>) diminui drasticamente, mas não cessa completamente.</li>
                <li><strong>Bactérias modulam acidez:</strong> Bactérias ácido-láticas (LAB), se presentes (especialmente em levain), continuam a produzir ácidos lático e acético em um ritmo lento, contribuindo para a complexidade do sabor.</li>
                <li><strong>Enzimas continuam trabalhando:</strong> As enzimas naturais da farinha, <strong>amilases</strong> e <strong>proteases</strong>, são menos sensíveis ao frio que a levedura. Elas continuam a quebrar amidos em açúcares simples e proteínas em aminoácidos, respectivamente.</li>
                <li><strong>Estrutura proteica relaxa:</strong> A ação das proteases e o tempo prolongado relaxam as ligações da rede de glúten, tornando-a mais extensível.</li>
                <li><strong>Sabor se aprofunda:</strong> A atividade enzimática e microbiana lenta gera uma maior variedade de álcoois, ésteres e outros compostos aromáticos, resultando em um perfil de sabor muito mais rico.</li>
            </ul>
        </Section>
        
        <Section title="3. Efeitos sobre a Textura">
            <p>O resultado da fermentação fria na textura é notável, como apontado por fontes como King Arthur Baking e Ooni:</p>
            <ul>
                <li><strong>Maior extensibilidade sem rasgar:</strong> A massa fica significativamente mais fácil de esticar até atingir uma espessura fina, com menos "snap-back" (encolhimento).</li>
                <li><strong>Estrutura interna mais leve e aerada:</strong> A rede de glúten relaxada e forte consegue se expandir melhor no forno, criando uma estrutura de miolo com alvéolos mais finos e bem distribuídos.</li>
                <li><strong>Mastigabilidade mais equilibrada:</strong> A crosta tende a ser mais crocante e o miolo mais macio e úmido, em vez de denso ou borrachudo.</li>
            </ul>
        </Section>

        <Section title="4. Efeitos sobre o Sabor">
            <p>A diferença de sabor entre uma massa rápida e uma de fermentação fria é profunda:</p>
            <ul>
                <li><strong>Desenvolve notas complexas:</strong> A longa maturação permite o desenvolvimento de notas aromáticas que podem ser descritas como <strong>frutadas</strong> (devido aos ésteres), <strong>lácticas</strong> (um sabor suave, quase de iogurte) e <strong>complexas</strong>.</li>
                <li><strong>Massas rápidas tendem a ter um perfil mais neutro:</strong> O sabor é dominado pelo trigo e pelo fermento, sem as camadas de complexidade desenvolvidas ao longo do tempo.</li>
            </ul>
        </Section>

        <Section title="5. Considerações sobre Estilos">
            <p>
                A fermentação fria é um pilar para muitos estilos de pizza artesanal, mas é especialmente benéfica para:
            </p>
            <ul>
                <li><strong>Estilos clássicos como NY e Romana (Teglia):</strong> Ambos se beneficiam imensamente da extensibilidade e do desenvolvimento de sabor proporcionados pela fermentação longa.</li>
                <li><strong>Pizzas que precisam de alta extensibilidade:</strong> Qualquer estilo que exija uma base muito fina e uniforme se beneficia de uma massa bem relaxada.</li>
            </ul>
        </Section>

        <Section title="6. Riscos Reais e Como Mitigá-los">
            <ul>
                <li><strong>Fermentação excessiva:</strong> Mesmo no frio, a massa pode passar do ponto, especialmente se a temperatura da geladeira for instável ou muito alta (acima de 4°C). O resultado é uma massa ácida, fraca e pegajosa.</li>
                <li><strong>Armazenamento ruim:</strong> A massa deve ser armazenada em um recipiente hermeticamente fechado para evitar o ressecamento da superfície, que cria uma "casca" e prejudica o crescimento.</li>
                <li><strong>Contaminações:</strong> O recipiente deve estar perfeitamente limpo para evitar o crescimento de microrganismos indesejados durante o longo período de armazenamento.</li>
            </ul>
        </Section>
        
        <Section title="7. Relação com DDT (Desired Dough Temperature)">
            <p>
              Atingir a temperatura inicial correta da massa (DDT) é ainda mais crucial na fermentação fria. Uma massa que entra na geladeira muito quente continuará a fermentar ativamente por horas antes de resfriar, consumindo os açúcares e potencialmente levando à super-fermentação. Uma massa inicial consistente garante um processo de resfriamento e maturação previsível.
            </p>
        </Section>

        <Section title="8. Referências Técnicas" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza – cold fermentation</li>
              <li>Modernist Bread – efeitos térmicos</li>
              <li>King Arthur Baking – dough flavor</li>
              <li>Ooni Learn</li>
              <li>Wikipedia – biologia das leveduras</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default FermentationPage;
