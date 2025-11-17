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

const TomatoPreservationPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Ciência do Tomate: Acidez, Doçura e Conservação"
      subtitle="Como o preparo e a escolha do tomate definem o perfil do molho."
    >
        <Section title="Introdução: A Alma Ácida da Pizza">
            <p>O molho de tomate é o coração de muitas pizzas, fornecendo acidez, umidade e uma base de sabor fundamental. A ciência por trás de um bom molho reside no equilíbrio entre os compostos do tomate e em como eles são transformados pelo processamento e pelo calor.</p>
        </Section>
        <Section title="Diferenças Qualitativas entre Tomates Crus e Cozidos">
            <p>Um molho de <strong>tomates crus</strong> (como o da Napolitana) preserva os compostos voláteis e frescos, resultando em um sabor brilhante, frutado e com acidez pronunciada. Um molho <strong>cozido</strong> (típico da NY Style) passa por reações químicas: a água evapora, concentrando os açúcares e o umami, e o calor quebra as paredes celulares, liberando mais compostos de sabor e criando notas mais profundas e adocicadas.</p>
        </Section>
        <Section title="Como Acidez e Doçura Influenciam a Percepção">
            <p>O sabor de um tomate é um balanço delicado entre seus açúcares naturais (frutose e glicose) e seus ácidos orgânicos (cítrico e málico). A <strong>acidez</strong> é crucial para cortar a gordura do queijo e realçar os outros sabores. A <strong>doçura</strong> equilibra essa acidez. O cozimento tende a diminuir a percepção da acidez e aumentar a da doçura, à medida que a água evapora.</p>
        </Section>
        <Section title="Impacto da Oxidação e Armazenamento">
            <p>O contato com o oxigênio e com metais (como em latas não revestidas) pode oxidar os compostos do tomate, levando a um sabor metálico e à perda de frescor. É por isso que tomates enlatados de alta qualidade vêm em latas com revestimento protetor e é recomendado transferir o molho para um recipiente de vidro ou plástico após aberto.</p>
        </Section>
        <Section title="Notas Frescas vs. Notas Cozidas">
            <p>As "notas frescas" vêm de compostos voláteis que se perdem facilmente com o calor. As "notas cozidas" são desenvolvidas através da caramelização dos açúcares e de reações de Maillard (em menor grau), criando um perfil de sabor mais robusto e complexo. A escolha entre um e outro depende inteiramente do estilo da pizza e do resultado desejado.</p>
        </Section>
        <Section title="Comportamento do Tomate no Assamento">
            <p>No forno, a água do molho evapora rapidamente. Se o molho for muito líquido, essa evaporação pode "cozinhar" a massa por baixo, criando a "gum line". Se o molho for muito concentrado e tiver açúcares adicionados, ele pode queimar em fornos de alta temperatura. O objetivo é ter a consistência certa para que o molho concentre seu sabor sem encharcar a massa ou queimar.</p>
        </Section>
        <Section title="Referências Técnicas">
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza</li>
              <li>Serious Eats - The Pizza Lab: Tomato Sauce</li>
              <li>"On Food and Cooking" de Harold McGee</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default TomatoPreservationPage;
