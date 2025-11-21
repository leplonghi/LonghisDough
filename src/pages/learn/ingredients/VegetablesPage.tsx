
import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';

const VegetablesPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Vegetables"
      description="Scientific and practical overview of this ingredient category."
      category="Ingredients"
    >
       <p className="text-slate-700 dark:text-slate-300">Technical data on Vegetables will be inserted here, always based on real references from food science, professional pizzeria practices, and reliable literature. No measurements will be invented.</p>
    </IngredientPageLayout>
  );
};

export default VegetablesPage;
