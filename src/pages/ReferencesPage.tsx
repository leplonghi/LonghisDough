
import React from 'react';
import { BookOpenIcon, ArrowTopRightOnSquareIcon } from '@/components/ui/Icons';

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
          aria-label={`Visit ${title}`}
        >
          <span>Visit</span>
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
      <button 
        onClick={() => window.history.back()} 
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
      >
        &larr; Back
      </button>

      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10">
        <div className="text-center">
          <BookOpenIcon className="mx-auto h-12 w-12 text-lime-500" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Technical References
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            A curated collection of books, standards, and resources to deepen your knowledge.
          </p>
        </div>

        <div className="mt-10">
          <Section title="Pizza – Official Rules and Associations">
            <ReferenceItem
              title="Associazione Verace Pizza Napoletana (AVPN)"
              type="Association / Standard"
              description="The organization that defines and protects the rules of authentic Neapolitan pizza. The official website contains the international regulations."
              link="https://www.pizzanapoletana.org/"
            />
            <ReferenceItem
              title="Pizza in Teglia e Pizza Tonda al Piatto"
              type="Book"
              description="By Renato Bosco, an Italian baking master, focused on pan pizza (teglia) and plate pizza (tonda)."
            />
          </Section>

          <Section title="Baking – Technical Books">
            <ReferenceItem
              title="Le Goût du Pain (The Taste of Bread)"
              type="Book"
              description="By Raymond Calvel. Considered one of the pillars of modern baking, focuses on the importance of temperature control and autolyse."
            />
            <ReferenceItem
              title="Flour Water Salt Yeast"
              type="Book"
              description="By Ken Forkish. An essential book for home bakers wishing to master sourdough and artisan breads."
            />
            <ReferenceItem
              title="Modernist Bread"
              type="Book Collection"
              description="A scientific and technical encyclopedia on bread, covering history, techniques, and science exhaustively."
            />
          </Section>

          <Section title="Flour – Technical Data and Strength (W)">
            <ReferenceItem
              title="Chopin Alveograph"
              type="Technical Concept"
              description="Explanation of the equipment used to measure flour strength (W), tenacity (P), and extensibility (L), crucial parameters for baking."
            />
             <ReferenceItem
              title="Caputo Mill"
              type="Website / Manufacturer"
              description="The website of Mulino Caputo, one of the most famous in Italy, offers detailed technical sheets for their various flours, helping to understand the use of each."
              link="https://www.mulinocaputo.it/"
            />
          </Section>
          
          <Section title="Terminology and Concepts">
             <ReferenceItem
              title="The Fresh Loaf"
              type="Community / Website"
              description="One of the largest and oldest baking forums on the internet. An invaluable resource for learning, asking questions, and seeing experiments from other bakers."
              link="http://www.thefreshloaf.com/"
            />
             <ReferenceItem
              title="Autolyse, Fermentolyse, and Maturation"
              type="Concepts"
              description="Definition and application of fundamental techniques for gluten development, flavor, and dough structure."
            />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default ReferencesPage;
