
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon, FireIcon } from '../../components/IconComponents';

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


const StyleGuidePage: React.FC = () => {
  return (
    <TechnicalPageLayout 
        title="Guia de Estilos de Pizza"
        subtitle="Uma descrição conceitual, histórica e científica dos principais estilos de pizza, focando em suas características estruturais e de textura."
        showReferencesSection={false} // Custom references section at the end
    >
        <Section title="1. Pizza Napoletana (AVPN – Versão Conceitual)" icon={<FireIcon className="h-5 w-5" />}>
            <ul>
                <li><strong>Massa:</strong> Extremamente macia e extensível, projetada para ser aberta manualmente.</li>
                <li><strong>Borda (Cornicione):</strong> A característica mais icônica. É inflada, aerada, com alvéolos irregulares e as típicas manchas de leopardo ("leoparding") devido ao assamento rápido e intenso.</li>
                <li><strong>Assamento:</strong> Extremamente rápido, em fornos a lenha com temperaturas altíssimas. A pizza cozinha em segundos, resultando em uma textura única.</li>
                <li><strong>Sabor:</strong> Delicado e equilibrado, centrado na alta qualidade do trio tomate-mozzarella-manjericão.</li>
                <li><strong>Estrutura:</strong> O centro é muito fino e úmido, quase "sopa", tornando a fatia macia e elástica, feita para ser dobrada e comida.</li>
                <li><strong>Piso do Forno:</strong> Requer um piso de baixa condutividade térmica (como o "biscotto" de argila) para que a base asse perfeitamente sem queimar.</li>
            </ul>
        </Section>

        <Section title="2. New York Style" icon={<SparklesIcon className="h-5 w-5" />}>
            <ul>
                <li><strong>Base:</strong> Mais firme e larga, resultando em fatias grandes e estruturadas.</li>
                <li><strong>Borda:</strong> Crocante por fora, mas com um interior macio e mastigável ("chewy").</li>
                <li><strong>Molho:</strong> Geralmente um molho de tomate cozido e temperado, com um perfil de sabor mais profundo.</li>
                <li><strong>Queijo:</strong> Predominantemente mozzarella de baixa umidade (low-moisture), que derrete de forma uniforme e libera menos água.</li>
                <li><strong>Assamento:</strong> Mais longo e em temperaturas mais moderadas que a Napolitana, tipicamente em fornos de lastro a gás.</li>
                <li><strong>Característica Principal:</strong> A "fatia dobrável" ("foldable slice"), que permite comer a fatia grande com uma só mão.</li>
            </ul>
        </Section>
        
        <Section title="3. Romana (Pala e Teglia)" icon={<BookOpenIcon className="h-5 w-5" />}>
            <ul>
                <li><strong>Massa:</strong> De altíssima extensibilidade e hidratação, resultando em uma textura extremamente leve e aerada.</li>
                <li><strong>Miolo (Crumb):</strong> Caracterizado por alvéolos muito grandes e irregulares.</li>
                <li><strong>Assamento:</strong> Pode ser duplo ou prolongado, buscando o desenvolvimento máximo de crocância.</li>
                <li><strong>Crocância:</strong> É a principal característica. A base é notavelmente crocante ("scrocchiarella").</li>
                <li><strong>Farinha:</strong> Comumente utiliza farinhas muito fortes para suportar a alta hidratação e longas fermentações.</li>
                <li><strong>Tradição:</strong> É um pilar da panificação romana contemporânea, vendida em padarias ("forni") por peso.</li>
            </ul>
        </Section>
        
        <Section title="4. Detroit Style" icon={<BeakerIcon className="h-5 w-5" />}>
            <ul>
                <li><strong>Forma de Assar:</strong> Assada em formas retangulares de aço, que conduzem calor de forma intensa.</li>
                <li><strong>Crosta de Queijo ("Frico"):</strong> A marca registrada do estilo. O queijo é espalhado até as bordas da forma, criando uma parede caramelizada e crocante.</li>
                <li><strong>Massa:</strong> Mais alta e aerada, com uma textura fofa e macia, semelhante à de uma focaccia.</li>
                <li><strong>Montagem Invertida:</strong> O molho é aplicado em faixas por cima do queijo ("red stripes"), protegendo a massa do excesso de umidade.</li>
                <li><strong>Textura Final:</strong> Uma base crocante e quase frita, interior macio e bordas de queijo ultra crocantes.</li>
            </ul>
        </Section>

        <Section title="5. Focaccia / Pan Pizza">
            <ul>
                <li><strong>Massa:</strong> Alta e com uma estrutura de miolo esponjosa e aberta.</li>
                <li><strong>Textura:</strong> Macia e úmida por dentro, com uma base e superfície douradas pelo óleo.</li>
                <li><strong>Assamento:</strong> Mais lento e em temperaturas moderadas para garantir que o interior cozinhe por completo.</li>
                <li><strong>Base Oleosa:</strong> O uso generoso de azeite na forma é fundamental para a textura e o sabor, fritando levemente a base.</li>
                <li><strong>Uso:</strong> Sua estrutura robusta é ideal para suportar coberturas mais pesadas e úmidas.</li>
            </ul>
        </Section>

        <Section title="6. Chicago Deep Dish (Resumo Técnico)">
             <ul>
                <li><strong>Estrutura de Torta:</strong> Mais próxima de uma torta salgada do que de uma pizza plana.</li>
                <li><strong>Massa:</strong> A massa forma uma parede alta e contém gordura (manteiga ou óleo), o que lhe confere uma textura rica e quebradiça.</li>
                <li><strong>Camadas Invertidas:</strong> A montagem é feita em ordem inversa (queijo na base, recheios no meio, molho por cima) para proteger os ingredientes durante o longo tempo de forno.</li>
                <li><strong>Assamento:</strong> Muito longo e em temperatura baixa para cozinhar a grande quantidade de recheio sem queimar a massa.</li>
            </ul>
        </Section>

        <Section title="7. Considerações Térmicas por Estilo">
            <ul>
                <li>Estilos de <strong>alta temperatura</strong> (como a Napolitana) dependem de uma <strong>radiação de calor intensa</strong> vinda do teto do forno para cozinhar o topo e inflar a borda rapidamente.</li>
                <li>Estilos de <strong>forno doméstico</strong> (como NY Style adaptada ou Detroit) dependem mais da <strong>condução de calor</strong> de uma boa superfície (aço ou a forma) e da <strong>convecção</strong> (ar quente circulante) para cozinhar a massa por um período mais longo.</li>
            </ul>
        </Section>

        <Section title="8. Referências Técnicas" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza – Nathan Myhrvold & Francisco Migoya</li>
              <li>Associazione Verace Pizza Napoletana (AVPN) – Disciplinare oficial</li>
              <li>Registros históricos e culinários sobre a evolução da pizza em Nova York, Roma e Detroit.</li>
              <li>Pizzarias históricas como Lombardi's (NY), Forno Campo de' Fiori (Roma) e Buddy's (Detroit).</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default StyleGuidePage;
