import React from 'react';
import TechnicalPageLayout from './learn/TechnicalPageLayout';

const ToppingsEvaluatorPage: React.FC = () => {
  return (
    <TechnicalPageLayout
        title="Toppings Evaluator"
        subtitle="Coming soon: Technical content to evaluate and balance your pizza toppings."
        showReferencesSection
    >
        <p>This tool will help you understand the balance between topping ingredients, such as the ideal ratio of sauce, cheese, and toppings for different pizza styles, as well as calculating total weight to avoid overloading the dough.</p>
    </TechnicalPageLayout>
  );
};

export default ToppingsEvaluatorPage;