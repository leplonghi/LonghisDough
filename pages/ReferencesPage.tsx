import React from 'react';
// FIX: Add missing imports for BookOpenIcon and ArrowTopRightOnSquareIcon
import { BookOpenIcon, ArrowTopRightOnSquareIcon } from '../components/IconComponents';

interface ReferenceItemProps {
  title: string;
  type: string;
  description: string;
  link?: string;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-12 first:mt-0">
    <h2 className="mb-4 text-2xl font-bold text-slate-800">{title}</h2>
    <div className="space-y-6">{children}</div>
  </div>
);

const ReferenceItem: React.FC<ReferenceItemProps> = ({ title, type, description, link }) => (
  <div className="rounded-lg bg-slate-50 p-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium text-lime-600 hover:underline"
          aria-label={`Visitar ${title}`}
        >
          <span>Visitar</span>
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </a>
      )}
    </div>
    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{type}</p>
    <p className="mt-2 text-slate-600">{description}</p>
  </div>
);

const ReferencesPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in_out]">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10">
        <div className="text-center">
          <BookOpenIcon className="mx-auto h-12 w-12 text-lime-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Referências Técnicas
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Uma coleção curada de livros, normas e recursos para aprofundar seu conhecimento.
          </p>
        </div>

        <div className="mt-10">
          <Section title="Pizza – Regras Oficiais e Associações">
            <ReferenceItem
              title="Associazione Verace Pizza Napoletana (AVPN)"
              type="Associação / Norma"
              description="A organização que define e protege as regras da autêntica pizza napolitana. O site oficial contém o regulamento internacional."
              link="https://www.pizzanapoletana.org/"
            />
            <ReferenceItem
              title="Pizza in Teglia e Pizza Tonda al Piatto"
              type="Livro"
              description="De Renato Bosco, um mestre da panificação italiana, focado em pizza de forma (teglia) e de prato (tonda)."
            />
          </Section>

          <Section title="Panificação – Livros Técnicos">
            <ReferenceItem
              title="Le Goût du Pain (O Gosto do Pão)"
              type="Livro"
              description="Por Raymond Calvel. Considerado um dos pilares da panificação moderna, foca na importância do controle de temperatura e da autólise."
            />
            <ReferenceItem
              title="Flour Water Salt Yeast"
              type="Livro"
              description="De Ken Forkish. Um livro essencial para padeiros caseiros que desejam dominar pães de fermentação natural e artesanais."
            />
            <ReferenceItem
              title="Modernist Bread"
              type="Coleção de Livros"
              description="Uma enciclopédia científica e técnica sobre pão, cobrindo história, técnicas e ciência de forma exaustiva."
            />
          </Section>

          <Section title="Farinha – Dados Técnicos e Força (W)">
            <ReferenceItem
              title="O Alveógrafo de Chopin"
              type="Conceito Técnico"
              description="Explicação sobre o equipamento usado para medir a força (W), tenacidade (P) e extensibilidade (L) da farinha, parâmetros cruciais para a panificação."
            />
             <ReferenceItem
              title="Moinho Caputo"
              type="Site / Fabricante"
              description="O site do Moinho Caputo, um dos mais famosos da Itália, oferece fichas técnicas detalhadas para suas diversas farinhas, ajudando a entender o uso de cada uma."
              link="https://www.mulinocaputo.it/"
            />
          </Section>
          
          <Section title="Terminologia e Conceitos">
             <ReferenceItem
              title="The Fresh Loaf"
              type="Comunidade / Site"
              description="Um dos maiores e mais antigos fóruns sobre panificação na internet. Um recurso inestimável para aprender, tirar dúvidas e ver experimentos de outros padeiros."
              link="http://www.thefreshloaf.com/"
            />
             <ReferenceItem
              title="Autólise, Fermentólise e Maturação"
              type="Conceitos"
              description="Definição e aplicação de técnicas fundamentais para o desenvolvimento do glúten, sabor e estrutura da massa."
            />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default ReferencesPage;