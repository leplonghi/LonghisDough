
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';

const GlossaryTerm: React.FC<{ term: string; children: React.ReactNode }> = ({ term, children }) => (
  <div className="py-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
    <dt className="font-bold text-md text-slate-900 dark:text-slate-100">{term}</dt>
    <dd className="mt-1 text-slate-600 dark:text-slate-300">{children}</dd>
  </div>
);

const GlossaryPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Glossário Técnico da Panificação"
      subtitle="Um dicionário com os termos técnicos mais importantes do mundo da pizza e dos pães, explicados de forma clara e direta."
      showReferencesSection
    >
      <dl>
        <GlossaryTerm term="Alveógrafo (de Chopin)">
          Equipamento de laboratório que mede as propriedades reológicas da massa, inflando uma bolha de massa até romper. Ele gera valores como a Força (W) e a relação P/L.
        </GlossaryTerm>
        <GlossaryTerm term="Autólise">
          Processo que consiste no descanso da farinha e da água (geralmente por 20 a 60 minutos) antes da adição do sal e do fermento. A autólise hidrata completamente a farinha, ativa enzimas que relaxam o glúten e facilita a formação da rede de glúten com menos trabalho mecânico, resultando em uma massa mais extensível.
        </GlossaryTerm>
        <GlossaryTerm term="Biga">
          Tipo de pré-fermento de origem italiana, caracterizado por sua baixa hidratação (tipicamente 45-60%). Fermenta por um longo período (12-24 horas) e desenvolve uma acidez lática sutil, contribuindo para uma estrutura de miolo mais forte e um aroma complexo.
        </GlossaryTerm>
        <GlossaryTerm term="Biscotto">
          Superfície de cozimento feita de argila refratária porosa, tradicionalmente usada nos fornos de pizza napolitanos. Sua baixa condutividade térmica permite assar a base da pizza em altíssimas temperaturas (acima de 450°C) de forma suave, sem queimar.
        </GlossaryTerm>
        <GlossaryTerm term="Browning">
          Termo culinário que descreve o processo de escurecimento da superfície dos alimentos durante o cozimento. Na panificação, é o resultado combinado da Reação de Maillard e da Caramelização.
        </GlossaryTerm>
        <GlossaryTerm term="Caramelização">
          Processo de oxidação e degradação térmica de açúcares em altas temperaturas. É distinto da Reação de Maillard, pois não envolve proteínas. Contribui para a cor marrom-escura e para sabores que variam do doce ao amargo.
        </GlossaryTerm>
        <GlossaryTerm term="Cornicione">
          Termo italiano para a borda inflada, aerada e macia da pizza, especialmente pronunciada no estilo napolitano. É formada pela correta manipulação da massa, que empurra o gás do centro para as extremidades.
        </GlossaryTerm>
        <GlossaryTerm term="Crumb (Miolo)">
          Refere-se à estrutura interna (miolo) da massa após assada. A análise do "crumb" avalia o tamanho, a forma e a distribuição dos alvéolos (bolhas), bem como a textura (macia, mastigável, etc.).
        </GlossaryTerm>
        <GlossaryTerm term="DDT (Desired Dough Temperature)">
          "Temperatura Desejada da Massa". É a temperatura alvo que a massa deve atingir ao final da mistura/sova. Controlar a DDT é crucial para garantir uma fermentação previsível e consistente, independentemente das condições ambientais.
        </GlossaryTerm>
        <GlossaryTerm term="Deck">
          A base ou piso de um forno (geralmente feito de pedra, aço ou tijolo refratário) onde a pizza ou o pão é assado por contato direto (condução).
        </GlossaryTerm>
        <GlossaryTerm term="Fermentação">
          Processo metabólico realizado por microrganismos (principalmente leveduras e bactérias) que convertem açúcares em outros compostos. Na panificação, resulta na produção de CO₂ (que faz a massa crescer), etanol, ácidos orgânicos e compostos aromáticos que desenvolvem o sabor.
        </GlossaryTerm>
        <GlossaryTerm term="Fermentação Acética">
          Tipo de fermentação secundária realizada por bactérias acéticas, que produzem ácido acético. Em excesso, pode conferir um sabor avinagrado e agressivo à massa.
        </GlossaryTerm>
        <GlossaryTerm term="Fermentação Lática">
          Fermentação realizada por bactérias láticas (LAB - Lactic Acid Bacteria), como as do gênero Lactobacillus. Produz ácido lático, que confere um sabor suave e levemente ácido, característico de massas de fermentação natural (levain).
        </GlossaryTerm>
        <GlossaryTerm term="Gelatinização do Amido">
          Processo que ocorre durante o cozimento, onde os grânulos de amido na massa absorvem água e incham sob a ação do calor. Isso "trava" a umidade na estrutura do miolo, sendo fundamental para a textura macia e cozida do produto final.
        </GlossaryTerm>
        <GlossaryTerm term="Gliadina e Glutenina">
          Duas proteínas insolúveis encontradas no trigo. Quando hidratadas e submetidas a trabalho mecânico, elas se conectam para formar a rede de glúten. A <strong>gliadina</strong> confere extensibilidade e a <strong>glutenina</strong>, elasticidade e força.
        </GlossaryTerm>
        <GlossaryTerm term="Maillard (Reação de)">
          Uma complexa série de reações químicas que ocorrem entre aminoácidos (de proteínas) e açúcares redutores sob calor. É responsável pela maior parte da cor dourada e pelos sabores e aromas complexos e "tostados" da crosta da pizza e do pão.
        </GlossaryTerm>
        <GlossaryTerm term="Oil-Out">
          Fenômeno em que a gordura (óleo) de queijos ou carnes se separa da matriz de proteína durante o cozimento, formando pequenas poças na superfície da pizza.
        </GlossaryTerm>
        <GlossaryTerm term="Overproof / Underproof">
          Termos que descrevem o estado da fermentação. <strong>Overproof</strong> (super-fermentado) ocorre quando a massa fermenta por tempo demais; a rede de glúten enfraquece, a massa pode colapsar e o sabor fica excessivamente ácido. <strong>Underproof</strong> (sub-fermentado) ocorre quando a fermentação é insuficiente, resultando em uma massa densa, com pouco volume e sabor subdesenvolvido.
        </GlossaryTerm>
        <GlossaryTerm term="P/L">
          Índice medido pelo Alveógrafo que representa a relação entre a Tenacidade (P - resistência à deformação) e a Extensibilidade (L - capacidade de se esticar). Uma farinha com P/L equilibrado (próximo de 0.5-0.6) é ideal para pizza, sendo forte mas fácil de abrir.
        </GlossaryTerm>
        <GlossaryTerm term="Poolish">
          Tipo de pré-fermento de alta hidratação (100%), feito com partes iguais de farinha e água, mais uma pequena quantidade de fermento. Fermenta por um período mais curto que a Biga e resulta em uma massa final mais extensível e com um sabor suave.
        </GlossaryTerm>
        <GlossaryTerm term="Prefermento">
          Uma mistura de farinha, água e fermento (comercial ou natural) preparada horas ou dias antes da massa final. O objetivo é desenvolver sabor, aroma e melhorar a estrutura da massa. Biga e Poolish são os tipos mais comuns.
        </GlossaryTerm>
        <GlossaryTerm term="Rimacinata">
          Termo italiano para "re-moída". Refere-se à farinha de sêmola de trigo duro que passa por um segundo processo de moagem para ficar mais fina. É frequentemente usada na superfície de trabalho para abrir pizzas, especialmente no estilo romano, pois não queima facilmente e adiciona uma textura crocante.
        </GlossaryTerm>
        <GlossaryTerm term="Stretch & Fold (Dobras)">
          Técnica de manipulação de massa, especialmente útil para massas de alta hidratação, que consiste em esticar e dobrar a massa sobre si mesma em intervalos durante a primeira fermentação (bulk). Este método desenvolve e fortalece a rede de glúten de forma gentil, sem a necessidade de sova intensa.
        </GlossaryTerm>
        <GlossaryTerm term="Teste da Janela de Glúten (Windowpane Test)">
          Um teste prático para verificar se a rede de glúten está bem desenvolvida. Consiste em esticar um pequeno pedaço de massa com os dedos. Se for possível formar uma membrana fina e translúcida (como uma janela) sem rasgar, o glúten está no ponto ideal.
        </GlossaryTerm>
        <GlossaryTerm term="W (Força da Farinha)">
          Índice medido pelo Alveógrafo que quantifica a força e a capacidade de fermentação de uma farinha. Representa a energia total necessária para expandir a massa. Farinhas com W alto são "fortes" e adequadas para longas fermentações e alta hidratação. Farinhas com W baixo são "fracas", para fermentações curtas.
        </GlossaryTerm>
      </dl>
    </TechnicalPageLayout>
  );
};

export default GlossaryPage;
