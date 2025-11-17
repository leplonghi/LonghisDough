import React from 'react';
import IngredientPageLayout from './IngredientPageLayout';

const VegetablesPage: React.FC = () => {
  return (
    <IngredientPageLayout
      title="Vegetais"
      description="Visão geral científica e prática desta categoria de ingredientes."
      category="Ingredientes"
    >
       <p>Aqui serão inseridos dados técnicos sobre Vegetais, sempre baseados em referências reais de ciência dos alimentos, pizzaria profissional e literatura confiável. Nenhuma medida será inventada.</p>
    </IngredientPageLayout>
  );
};

export default VegetablesPage;
