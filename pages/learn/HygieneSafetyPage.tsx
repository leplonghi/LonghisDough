import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { ShieldCheckIcon, BookOpenIcon } from '../../components/IconComponents';

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

const HygieneSafetyPage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Higiene e Segurança Alimentar na Pizza"
      subtitle="Princípios sanitários universais para uma manipulação segura e responsável, baseados em referências científicas."
      showReferencesSection={false} // Custom references section at the end
    >
      <Section title="1. Introdução: A Base da Qualidade é a Segurança">
        <p>
          A segurança alimentar é um pilar não negociável na produção de qualquer alimento, incluindo a pizza artesanal. Ela não se resume a "limpar", mas sim a um sistema de práticas que visam:
        </p>
        <ul>
            <li>O <strong>controle microbiano</strong>, minimizando a proliferação de microrganismos patogênicos.</li>
            <li>A <strong>prevenção de contaminações</strong>, sejam elas biológicas, químicas ou físicas.</li>
            <li>A <strong>manipulação responsável</strong> de ingredientes e utensílios.</li>
            <li>A manutenção de um <strong>ambiente de trabalho limpo</strong> e organizado.</li>
        </ul>
        <p>
          Seguir estes princípios não só protege a saúde, mas também garante a integridade sensorial e a qualidade do produto final.
        </p>
      </Section>

      <Section title="2. Higiene Pessoal: O Ponto de Partida" icon={<ShieldCheckIcon className="h-5 w-5" />}>
        <p>
          O manipulador é o principal vetor de contaminação. Portanto, a higiene pessoal é o primeiro e mais crítico ponto de controle.
        </p>
        <ul>
            <li><strong>Lavar as mãos adequadamente</strong> com água e sabão antes de iniciar, após tocar em qualquer superfície não higienizada (celular, rosto, lixo) e entre a manipulação de diferentes tipos de ingredientes.</li>
            <li>Manter <strong>unhas curtas, limpas</strong> e sem esmalte, pois são áreas que acumulam sujeira e microrganismos.</li>
            <li><strong>Evitar a manipulação</strong> de massa e ingredientes com feridas ou lesões abertas nas mãos, a menos que estejam devidamente protegidas com luvas impermeáveis.</li>
            <li>Evitar o <strong>contato cruzado</strong> das mãos: nunca toque em carne crua e depois em um vegetal pronto para consumo sem lavar as mãos.</li>
        </ul>
      </Section>
      
      <Section title="3. Higiene dos Ingredientes">
        <p>
          A qualidade sanitária dos ingredientes é tão importante quanto sua qualidade sensorial.
        </p>
        <ul>
            <li>Utilize sempre <strong>ingredientes frescos</strong> e de fontes confiáveis.</li>
            <li>Descarte ingredientes que apresentem <strong>odores estranhos, cor alterada</strong> ou embalagens <strong>inchadas</strong> (sinal de produção de gás por bactérias).</li>
            <li><strong>Lave bem os vegetais</strong> em água corrente antes de usar, mesmo que pareçam limpos.</li>
            <li>Verifique a aparência e o cheiro de <strong>carnes e laticínios</strong>, respeitando sempre as datas de validade.</li>
        </ul>
      </Section>
      
      <Section title="4. Contaminação Cruzada: O Risco Invisível">
        <p>A contaminação cruzada ocorre quando microrganismos são transferidos de um alimento ou superfície contaminada para outro alimento. É uma das principais causas de doenças alimentares.</p>
        <ul>
            <li><strong>Tábuas, facas e recipientes devem ser segregados.</strong> Idealmente, use utensílios diferentes para carnes cruas, vegetais e produtos prontos para consumo.</li>
            <li><strong>Nunca misture ingredientes crus e prontos</strong> no mesmo recipiente ou superfície sem higienização completa entre eles.</li>
            <li>As <strong>superfícies de trabalho devem ser rigorosamente limpas</strong> e sanitizadas antes de a massa ser colocada sobre elas.</li>
        </ul>
      </Section>

      <Section title="5. Microrganismos Comuns">
        <p>A massa e os ingredientes são ambientes ricos em nutrientes, ideais para a proliferação de diversos microrganismos:</p>
        <ul>
            <li><strong>Bactérias:</strong> Microrganismos unicelulares que podem se multiplicar rapidamente. Algumas são patogênicas e podem causar infecções alimentares.</li>
            <li><strong>Fungos (Bolores):</strong> Formam colônias visíveis (mofo) e podem produzir micotoxinas, que são substâncias tóxicas.</li>
            <li><strong>Leveduras indesejadas:</strong> Leveduras selvagens diferentes da <em>Saccharomyces cerevisiae</em> podem competir por nutrientes e produzir sabores e odores desagradáveis.</li>
            <li><strong>Biofilmes:</strong> Comunidades de microrganismos que se aderem a superfícies mal higienizadas (como tábuas de corte com ranhuras ou equipamentos), formando uma camada protetora difícil de remover.</li>
        </ul>
      </Section>
      
       <Section title="6. Conservação Geral da Massa">
        <p>Proteger a massa durante a fermentação é crucial para garantir que apenas os microrganismos desejados prosperem.</p>
        <ul>
            <li>Utilize <strong>recipientes limpos e devidamente fechados</strong> para proteger a massa.</li>
            <li>Evite o <strong>contato com ar potencialmente contaminado</strong>, especialmente em ambientes de cozinha com muita circulação.</li>
            <li>Todos os <strong>utensílios</strong> (espátulas, balanças, etc.) que entram em contato com a massa devem estar bem lavados.</li>
            <li><strong>Evite a manipulação repetida e desnecessária</strong> da massa, pois cada contato é uma oportunidade de introduzir novos microrganismos.</li>
        </ul>
      </Section>

      <Section title="7. Riscos Reais do Descuido Sanitário">
        <ul>
            <li><strong>Deterioração sensorial:</strong> O crescimento de microrganismos indesejados pode levar a sabores e odores azedos, mofados ou simplesmente "estranhos".</li>
            <li><strong>Infecções alimentares:</strong> A contaminação com bactérias patogênicas pode causar doenças.</li>
            <li><strong>Mofo visível:</strong> Se houver qualquer sinal de mofo na massa ou em um ingrediente, o descarte é obrigatório. As micotoxinas podem ter se espalhado por todo o alimento, mesmo onde o mofo não é visível.</li>
        </ul>
      </Section>

      <Section title="8. Referências Técnicas" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
            <li>WHO – Five Keys to Safer Food</li>
            <li>FDA Food Code (conceitos gerais de higiene)</li>
            <li>Modernist Cuisine – Food Safety</li>
            <li>Wikipedia – Food safety, Microorganism, Cross-contamination</li>
          </ul>
      </Section>
    </TechnicalPageLayout>
  );
};

export default HygieneSafetyPage;
