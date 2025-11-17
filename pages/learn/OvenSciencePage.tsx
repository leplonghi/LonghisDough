
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { FireIcon, BeakerIcon, BookOpenIcon, LightBulbIcon } from '../../components/IconComponents';

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

const OvenSciencePage: React.FC = () => {
  return (
    <TechnicalPageLayout title="Assamento de Pizza: A Física do Forno" showReferencesSection>
        <Section title="1. Introdução: O Choque Térmico que Cria a Pizza">
            <p>
              Cientificamente, o assamento é o estágio mais violento e transformador na vida da massa. Quando a pizza entra no forno, ela sofre um choque térmico que desencadeia uma cascata de eventos físicos e químicos em segundos, como descrito em "Modernist Pizza":
            </p>
            <ul>
                <li><strong>Choque térmico:</strong> A massa fria encontra o calor intenso do forno.</li>
                <li><strong>Evaporação rápida da água:</strong> A água na superfície da massa e dos ingredientes se transforma em vapor quase instantaneamente.</li>
                <li><strong>Expansão de gases (Oven Spring):</strong> O CO₂ aprisionado na rede de glúten e o vapor recém-formado se expandem violentamente, causando o "salto de forno" e inflando a borda (cornicione).</li>
                <li><strong>Coloração da superfície:</strong> Reações de Maillard e caramelização ocorrem na superfície seca, desenvolvendo cor e sabor.</li>
                <li><strong>Estabilização da estrutura interna:</strong> O amido gelatiniza e as proteínas do glúten coagulam, fixando a estrutura aerada da massa.</li>
            </ul>
        </Section>

        <Section title="2. Fluxo de Calor (Heat Flow): Os Três Mecanismos">
            <p>
              O calor não é uma entidade única; ele é transferido de três maneiras distintas. A excelência no assamento, como explica Kenji López-Alt, depende do equilíbrio perfeito entre elas. Diferentes fornos alteram drasticamente a predominância de cada mecanismo.
            </p>
            <ul>
                <li>O calor <strong>flui da superfície quente do forno (lastro) para a base da pizza</strong> (Condução).</li>
                <li>O calor <strong>radiante age sobre a superfície superior</strong> da pizza, vindo do teto e das chamas (Radiação).</li>
                <li>O calor <strong>convectivo aquece o ar ao redor</strong> da pizza, ajudando a cozinhar os ingredientes e remover a umidade (Convecção).</li>
            </ul>
        </Section>
        
        <Section title="3. Condução: O Calor da Base">
            <p>
              A condução é a transferência de calor por contato direto. O piso do forno (seja de aço, pedra ou tijolo) transfere sua energia térmica para a base da massa. A velocidade dessa transferência é fundamental para uma base crocante. Materiais diferentes conduzem calor em velocidades distintas. O aço, por exemplo, é um condutor muito mais rápido que a pedra, transferindo calor de forma mais agressiva.
            </p>
        </Section>
        
        <Section title="4. Radiação: O Calor do Topo">
            <p>
              A radiação é o calor emitido na forma de ondas infravermelhas. Em um forno de pizza, ela vem do teto (cúpula), das paredes e, crucialmente, da chama em um forno a lenha. Este é o principal mecanismo responsável por controlar a coloração da borda e da superfície e cozinhar as coberturas.
            </p>
        </Section>

        <Section title="5. Convecção: O Ar em Movimento">
            <p>
              A convecção é a transferência de calor pelo movimento do ar quente. Em fornos domésticos elétricos, muitas vezes há uma ventoinha para forçar essa circulação. A convecção ajuda a assar a pizza de maneira mais uniforme e é crucial para remover a camada de vapor que se forma ao redor da pizza, permitindo que a superfície seque e doure.
            </p>
        </Section>
        
        <Section title="6. Mudança de Fase: A Força do Vapor">
            <p>
              A transformação da água em vapor é um dos eventos mais importantes no forno.
            </p>
            <ul>
                <li>A <strong>evaporação rápida da água</strong> na massa se transforma em vapor. Como o vapor ocupa um volume muito maior que a água líquida, ele expande violentamente as bolhas de gás já existentes, contribuindo para o "oven spring".</li>
                <li>A água livre nos ingredientes (especialmente molho e vegetais) também evapora. O <strong>controle dessa umidade é crítico</strong> para evitar uma pizza encharcada.</li>
            </ul>
        </Section>

        <Section title="7. Estágios do Assamento">
            <p>
              O assamento pode ser dividido em estágios sequenciais e sobrepostos:
            </p>
            <ol>
                <li><strong>Expansão (Oven Spring):</strong> Nos primeiros 30-60 segundos, o calor acelera a atividade final da levedura e expande o CO₂ e o vapor de água, inflando a massa.</li>
                <li><strong>Fixação da Estrutura:</strong> À medida que a temperatura interna da massa sobe, o amido gelatiniza e as proteínas do glúten coagulam, solidificando a estrutura aerada criada na fase de expansão.</li>
                <li><strong>Secagem Superficial:</strong> A umidade na superfície da massa evapora, criando uma "pele" seca, pré-requisito para as reações de coloração.</li>
                <li><strong>Coloração (Browning):</strong> Com a superfície seca e a temperatura elevada, a Reação de Maillard e a Caramelização ocorrem, desenvolvendo cor, sabor e aroma.</li>
            </ol>
        </Section>

        <Section title="8. Interação com Ingredientes">
            <p>
              As coberturas não são passivas; elas interagem com o calor e com a massa.
            </p>
            <ul>
                <li><strong>Molhos muito úmidos</strong> liberam vapor e retardam a secagem da superfície, o que pode inibir a coloração e levar a uma base crua ("gum line").</li>
                <li><strong>Queijos muito gordos</strong> sofrem "oil-out", liberando óleo que pode fritar a superfície de outros ingredientes.</li>
                <li><strong>Carnes frescas</strong> liberam gordura e água, impactando a umidade.</li>
                <li><strong>Vegetais crus</strong> liberam uma grande quantidade de vapor, que precisa ser gerenciado para não encharcar a pizza.</li>
            </ul>
        </Section>

        <Section title="9. Riscos: O Desequilíbrio Térmico">
            <ul>
                <li><strong>Assar rápido demais (calor de topo excessivo):</strong> A pizza ganha cor por fora, mas o miolo permanece cru.</li>
                <li><strong>Assar devagar demais (forno frio):</strong> A massa desidrata lentamente antes de assar, resultando em uma textura seca e dura.</li>
                <li><strong>Piso frio (falta de condução):</strong> A base não cozinha adequadamente, ficando pálida e empapada, mesmo que o topo pareça pronto.</li>
            </ul>
        </Section>
        
        <Section title="10. Referências Técnicas" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
              <li>Modernist Pizza – Nathan Myhrvold & Francisco Migoya</li>
              <li>Serious Eats (J. Kenji López-Alt) – The Pizza Lab: Heat Transfer</li>
              <li>Ooni Learn – The Science of Baking a Pizza</li>
              <li>Wikipedia – Conduction, Convection, Radiation (Thermodynamics)</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default OvenSciencePage;
