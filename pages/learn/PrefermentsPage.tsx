import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BeakerIcon, BookOpenIcon, FireIcon, SparklesIcon } from '../../components/IconComponents';

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

const PrefermentsPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Pré-Fermentos: A Alma do Sabor"
      subtitle="Uma análise conceitual sobre como Biga, Poolish e Massa Madre transformam a massa antes mesmo de ela ser sovada."
      showReferencesSection
    >
      <Section title="1. Introdução: Por que usar um Pré-Fermento?">
        <p>
          Um pré-fermento é uma porção da massa preparada com antecedência. Deixá-la fermentar separadamente permite que as leveduras e enzimas atuem por mais tempo, desenvolvendo complexidade de sabor e melhorando a estrutura. Como detalhado em obras como "Modernist Pizza" e "Tartine", os principais objetivos de usar um pré-fermento são:
        </p>
        <ul>
            <li><strong>Desenvolver sabor e aroma:</strong> A fermentação prolongada gera uma gama maior de compostos aromáticos e ácidos orgânicos.</li>
            <li><strong>Modular a acidez:</strong> Diferentes tipos de pré-fermento favorecem diferentes perfis de acidez (lática vs. acética).</li>
            <li><strong>Melhorar a digestibilidade:</strong> A pré-digestão de amidos e proteínas torna o produto final mais leve.</li>
            <li><strong>Aumentar a força da massa:</strong> A acidez desenvolvida fortalece a rede de glúten.</li>
            <li><strong>Estender a vida útil (shelf-life):</strong> A acidez também atua como um conservante natural.</li>
        </ul>
      </Section>

      <Section title="2. Poolish: O Pré-Fermento Líquido" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
          O Poolish é um pré-fermento de alta hidratação, quase líquido, de origem francesa e amplamente adaptado por pizzaiolos italianos. Sua consistência fluida promove uma fermentação mais rápida e favorece a atividade enzimática.
        </p>
        <ul>
            <li><strong>Confere Extensibilidade:</strong> A alta hidratação e a atividade enzimática (amilases e proteases) relaxam a rede de glúten, resultando em uma massa final muito mais extensível e fácil de abrir.</li>
            <li><strong>Sabor Suave e Aromático:</strong> Promove uma fermentação que resulta em notas mais suaves, levemente adocicadas e com um perfil aromático rico.</li>
            <li><strong>Maior Atividade de Amilases:</strong> Cientificamente, o ambiente líquido facilita a ação das amilases, que quebram o amido em açúcares simples, resultando em uma crosta que doura melhor.</li>
        </ul>
      </Section>
      
      <Section title="3. Biga: O Pré-Fermento Sólido">
        <p>
          A Biga é um pré-fermento de baixa hidratação, de origem italiana, com uma consistência de massa firme. Sua fermentação é mais lenta e controlada.
        </p>
        <ul>
            <li><strong>Aumenta a Força e Estrutura:</strong> A fermentação mais lenta em um ambiente mais seco desenvolve uma acidez que fortalece significativamente a rede de glúten, tornando-a ideal para massas de alta hidratação que precisam de suporte estrutural.</li>
            <li><strong>Confere Sabor Mais Profundo:</strong> O ambiente anaeróbico da Biga favorece a produção de compostos aromáticos mais complexos e uma acidez sutilmente mais acética.</li>
            <li><strong>Fermentação Lenta:</strong> A baixa disponibilidade de água limita a mobilidade da levedura, resultando em um processo mais longo e controlado.</li>
        </ul>
      </Section>

      <Section title="4. Massa Madre / Lievito Naturale">
        <p>
          A Massa Madre, ou "lievito naturale", é a versão italiana do levain, geralmente mantida em uma consistência mais sólida (baixa hidratação). É um ecossistema complexo.
        </p>
        <ul>
            <li><strong>Presença de LAB:</strong> Contém uma cultura simbiótica de leveduras selvagens e bactérias ácido-láticas (LAB), que produzem ácidos lático e acético, contribuindo com o sabor característico.</li>
            <li><strong>Notas Aromáticas Complexas:</strong> A diversidade de microrganismos gera um perfil de sabor e aroma muito mais rico e complexo do que os fermentos comerciais.</li>
            <li><strong>Estrutura Diferenciada:</strong> A acidez natural e a longa fermentação alteram a estrutura do glúten, resultando em um miolo único, muitas vezes mais "mastigável" e úmido.</li>
        </ul>
      </Section>

      <Section title="5. Efeitos Sensoriais Típicos" icon={<SparklesIcon className="h-5 w-5" />}>
        <ul>
            <li><strong>Poolish:</strong> Resulta em uma massa com miolo mais aberto e aerado, com uma crosta fina e crocante e um aroma mais delicado.</li>
            <li><strong>Biga:</strong> Contribui para uma massa com maior elasticidade e força, um miolo mais robusto e um sabor mais profundo e levemente mais ácido.</li>
            <li><strong>Massa Madre:</strong> Oferece um perfil de sabor complexo com acidez moderada, além de um aroma característico inconfundível.</li>
        </ul>
      </Section>

      <Section title="6. Comportamento no Forno" icon={<FireIcon className="h-5 w-5" />}>
        <p>O uso de pré-fermentos altera a composição química da massa, o que se reflete no forno:</p>
        <ul>
            <li>Eles aumentam a quantidade de açúcares residuais disponíveis, o que pode levar a uma <strong>caramelização mais rápida e intensa</strong> da crosta.</li>
            <li>A pré-fermentação gera uma maior concentração de compostos aromáticos que são volatilizados pelo calor, resultando em um <strong>aroma mais rico</strong> durante e após o cozimento.</li>
            <li>A estrutura interna da massa tende a ser <strong>mais desenvolvida e complexa</strong>, com alvéolos mais irregulares e interessantes.</li>
        </ul>
      </Section>

      <Section title="7. Riscos">
        <ul>
            <li><strong>Acidez Excessiva:</strong> Um pré-fermento que fermenta por tempo demais ou em temperatura muito alta pode desenvolver um excesso de ácido acético, resultando em um sabor avinagrado e desagradável.</li>
            <li><strong>Perda de Força:</strong> Se um pré-fermento amadurece demais, a atividade enzimática excessiva (proteólise) pode degradar a rede de glúten, resultando em uma massa final fraca.</li>
            <li><strong>Pouco Impacto:</strong> Um pré-fermento muito jovem, que não fermentou o suficiente, não terá desenvolvido a complexidade de sabor e os benefícios estruturais esperados.</li>
        </ul>
      </Section>
      
      <Section title="8. Referências Técnicas" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Modernist Pizza</li>
            <li>Modernist Bread</li>
            <li>King Arthur Baking – Guide to Preferments</li>
            <li>Wikipedia – Microbiologia da Fermentação</li>
          </ul>
      </Section>
    </TechnicalPageLayout>
  );
};

export default PrefermentsPage;