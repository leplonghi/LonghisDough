import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';
import { BookOpenIcon, SparklesIcon, BeakerIcon } from '../../../components/IconComponents';

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

const ReadyToppingsPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Guia de Recheios Prontos"
      description="Uma análise técnica sobre o uso de ingredientes pré-preparados para otimizar o tempo e garantir a qualidade da sua pizza."
      category="Ingredientes"
    >
      <Section title="Introdução: Acelerando a Qualidade">
        <p>
          "Recheios prontos" são ingredientes que já passaram por algum tipo de processamento industrial ou artesanal antes de chegarem à sua cozinha. Eles oferecem conveniência, mas exigem uma avaliação técnica para garantir que não comprometam o resultado final da pizza. Esta categoria inclui:
        </p>
        <ul>
            <li><strong>Molhos prontos:</strong> Desde passatas a molhos de pizza já temperados.</li>
            <li><strong>Carnes pré-cozidas:</strong> Como frango desfiado, bacon em cubos ou linguiça já cozida.</li>
            <li><strong>Vegetais pré-preparados:</strong> Pimentões assados, cebola caramelizada, cogumelos salteados.</li>
            <li><strong>Conservas e Ingredientes Premium:</strong> Alcachofras em conserva, tomates secos, anchovas, azeitonas especiais.</li>
        </ul>
        <p>
          Ao escolher um ingrediente processado, avalie-o criticamente com base em: <strong>textura, umidade, acidez, salinidade e concentração de sabor</strong>.
        </p>
      </Section>

      <Section title="Molhos Prontos" icon={<BeakerIcon className="h-5 w-5" />}>
        <p>
            Molhos de pizza industrializados podem ser uma base conveniente, mas é crucial inspecionar suas propriedades.
        </p>
        <ul>
            <li><strong>Umidade:</strong> Muitos molhos prontos têm um teor de água mais elevado para reduzir custos. Um molho excessivamente líquido é a principal causa da "gum line" (camada de massa crua sob a cobertura). <strong>Dica técnica:</strong> Se o molho escorrer facilmente de uma colher, considere reduzi-lo em fogo baixo por 10-15 minutos para evaporar o excesso de água.</li>
            <li><strong>Estabilizantes:</strong> Ingredientes como amido modificado ou gomas podem ser usados para dar viscosidade artificial. Embora não sejam prejudiciais, podem resultar em uma textura gelatinosa após o cozimento.</li>
            <li><strong>Acidez e Sabor:</strong> A acidez pode variar muito. Muitos molhos contêm açúcar adicionado para equilibrar a acidez de tomates de menor qualidade. Prove sempre antes de usar e, se necessário, ajuste o sal ou a acidez com uma gota de vinagre ou suco de limão.</li>
        </ul>
      </Section>
      
      <Section title="Carnes Pré-cozidas">
        <p>
            Carnes que já foram cozidas (seja assadas, fritas ou defumadas) se comportam de maneira previsível no forno.
        </p>
        <ul>
            <li><strong>Menos Liberação de Água:</strong> A principal vantagem. Ingredientes como frango desfiado ou linguiça pré-cozida não soltarão umidade na massa, protegendo sua estrutura.</li>
            <li><strong>Sabor Concentrado:</strong> O processo de cozimento inicial já concentrou os sabores da carne através da reação de Maillard.</li>
            <li><strong>Gordura Parcialmente Renderizada:</strong> Em carnes como bacon, a maior parte da gordura já derreteu. O que resta no forno é apenas o suficiente para adicionar sabor e crocância, com menos risco de "oil-out" excessivo.</li>
            <li><strong>Ideal para Fornos Domésticos:</strong> Como documentado em práticas de pizzarias de NY Style, o pré-cozimento é essencial para garantir que a carne esteja totalmente cozida no tempo mais curto de um forno de pizza.</li>
        </ul>
      </Section>
      
      <Section title="Vegetais Preparados">
        <p>
            Vegetais crus são compostos majoritariamente por água. O pré-preparo é a melhor forma de controlar essa umidade.
        </p>
        <ul>
            <li><strong>Vegetais Assados ou Grelhados:</strong> Processos como assar pimentões ou grelhar abobrinha removem a água, quebram a celulose e caramelizam os açúcares naturais, resultando em um sabor muito mais profundo e uma textura macia. São ideais para pizzas de estilo romano e NY, que têm tempo de forno suficiente para reaquecê-los.</li>
            <li><strong>Vegetais em Conserva:</strong> Ingredientes como picles ou pimentas em conserva trazem uma acidez acentuada que pode ser usada para cortar a gordura de queijos e carnes. Use com moderação para não dominar a pizza.</li>
        </ul>
      </Section>

      <Section title="Conservas de Alta Qualidade" icon={<SparklesIcon className="h-5 w-5" />}>
        <p>
            Ingredientes de alta qualidade em conserva são um atalho profissional para sabores intensos e complexos.
        </p>
        <ul>
            <li><strong>Alcachofra:</strong> Geralmente conservada em óleo ou salmoura, já está cozida e com sabor concentrado. Escorra bem antes de usar.</li>
            <li><strong>Tomate Seco:</strong> O processo de desidratação remove a água e concentra açúcares e umami. Re-hidratá-lo brevemente em água morna pode torná-lo mais macio.</li>
            <li><strong>Pimentão Assado:</strong> Disponível em potes, já sem pele e com um sabor adocicado e defumado. Uma grande economia de tempo com resultado profissional.</li>
            <li><strong>Anchovas:</strong> Curadas em sal, são uma "bomba" de umami e salinidade. Devem ser usadas com parcimônia, pois seu sabor é extremamente potente.</li>
        </ul>
      </Section>
      
      <Section title="Riscos Técnicos e Como Mitigá-los" icon={<BookOpenIcon className="h-5 w-5" />}>
        <ul>
            <li><strong>Excesso de Cobertura:</strong> Como enfatizado em "Modernist Pizza", a quantidade total de cobertura não deve ser excessiva. Muitos ingredientes frios podem reduzir drasticamente a temperatura da superfície da pizza, prejudicando o "salto de forno" (oven spring) e resultando em uma base pálida.</li>
            <li><strong>Ingredientes Oleosos:</strong> Conservas em óleo (como tomate seco ou alcachofra) devem ser bem escorridas para evitar um "oil-out" excessivo que deixa a pizza gordurosa.</li>
            <li><strong>Ingredientes Aquosos:</strong> Mesmo em conserva, alguns ingredientes retêm água. Azeitonas, por exemplo, devem ser secas com papel toalha antes de ir para a pizza. A umidade é a inimiga de uma base crocante.</li>
        </ul>
      </Section>
    </IngredientPageLayout>
  );
};

export default ReadyToppingsPage;
