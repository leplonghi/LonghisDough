
import React from 'react';
import IngredientPageLayout from './ingredients/IngredientPageLayout';

const SensoryGuidePage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Sensory Guide"
      description="Learn to balance sweet, salty, sour, bitter, and umami in your creations."
      category="Ingredient Technique"
    >
      <p className="text-slate-700 dark:text-slate-300">This page has been moved. Content is now at /learn/sensory-profiles.</p>
    </IngredientPageLayout>
  );
};

export default SensoryGuidePage;
