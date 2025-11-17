import React from 'react';
import TechnicalPageLayout from './learn/TechnicalPageLayout';

const ToppingsEvaluatorPage: React.FC = () => {
  return (
    <TechnicalPageLayout
        title="Avaliador de Recheios"
        subtitle="Em breve: conteúdo técnico para avaliar e balancear suas coberturas."
        showReferencesSection
    >
        <p>Esta ferramenta ajudará você a entender o equilíbrio entre os ingredientes da cobertura, como a proporção ideal de molho, queijo e toppings para diferentes estilos de pizza, além de calcular o peso total para evitar sobrecarregar a massa.</p>
    </TechnicalPageLayout>
  );
};

export default ToppingsEvaluatorPage;
