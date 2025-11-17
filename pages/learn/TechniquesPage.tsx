import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';

const TechniquesPage: React.FC = () => {
  return (
    <TechnicalPageLayout title="Técnicas de Panificação" showReferencesSection>
        <p>Aqui será inserido conteúdo técnico detalhado, sempre validado e referenciado a partir de fontes confiáveis (AVPN, King Arthur Baking, Serious Eats, literatura científica etc.).</p>
        <p>Abordaremos temas como autólise, stretch & fold, no-knead, sova, modelagem e muito mais.</p>
    </TechnicalPageLayout>
  );
};

export default TechniquesPage;
