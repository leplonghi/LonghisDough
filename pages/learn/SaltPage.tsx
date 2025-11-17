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

const SaltPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Sal: Funções Químicas e Estruturais"
      subtitle="Muito mais que sabor: o papel do sal no fortalecimento e controle da massa."
    >
        <Section title="Introdução: O Regulador da Massa">
            <p>O sal é um ingrediente fundamental que desempenha papéis cruciais e multifacetados na panificação, indo muito além de simplesmente adicionar sabor. Ele atua como um regulador químico e físico, influenciando diretamente a estrutura do glúten, a velocidade da fermentação e a qualidade final do produto.</p>
        </Section>
        <Section title="Fortalecimento da Rede de Glúten">
            <p>O sal tem um efeito de "aperto" na rede de glúten. As cargas iônicas dos íons de sódio e cloreto interagem com as proteínas do glúten, fazendo com que elas se unam mais firmemente. Isso resulta em uma massa mais forte, mais elástica e menos pegajosa, com maior capacidade de reter o gás da fermentação.</p>
        </Section>
        <Section title="Moderação da Velocidade de Fermentação">
            <p>O sal é higroscópico, o que significa que atrai a umidade. Por osmose, ele retira água das células de levedura, o que retarda seu metabolismo. Essa moderação é vital: ela impede que a levedura fermente de forma descontrolada, permitindo que os processos de desenvolvimento de sabor ocorram em um ritmo mais lento e equilibrado.</p>
        </Section>
        <Section title="Influência no Sabor e Preservação">
            <p>Além de seu próprio sabor salgado, o sal realça os outros sabores complexos desenvolvidos na massa durante a fermentação. Ele também possui propriedades antimicrobianas que ajudam a inibir o crescimento de microrganismos indesejados, atuando como um conservante natural.</p>
        </Section>
        <Section title="Efeito Sensorial no Equilíbrio">
            <p>Uma massa sem sal tem um sabor insípido e plano. O sal equilibra a doçura natural do trigo e a acidez da fermentação, criando um perfil de sabor completo e agradável. Também contribui para uma crosta mais fina e crocante.</p>
        </Section>
        <Section title="Riscos Qualitativos (Falta e Excesso)">
            <ul>
                <li><strong>Sal Insuficiente:</strong> Resulta em uma massa pegajosa, fraca e difícil de manusear. A fermentação pode ser muito rápida e descontrolada, e o sabor final será insípido.</li>
                <li><strong>Sal Excessivo:</strong> Pode inibir severamente ou até matar a levedura, resultando em uma fermentação muito lenta ou inexistente. A massa pode ficar excessivamente rígida e o sabor final, desagradavelmente salgado.</li>
            </ul>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Bread</li>
              <li>King Arthur Baking - The Role of Salt</li>
              <li>Serious Eats - The Pizza Lab</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default SaltPage;
