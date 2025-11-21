import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';

const TechniquesPage: React.FC = () => {
  return (
    <TechnicalPageLayout title="Baking Techniques" showReferencesSection>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>Detailed technical content will be inserted here, always validated and referenced from reliable sources (AVPN, King Arthur Baking, Serious Eats, scientific literature etc.).</p>
            <p>We will cover topics such as autolyse, stretch & fold, no-knead, kneading, shaping and much more.</p>
        </div>
    </TechnicalPageLayout>
  );
};

export default TechniquesPage;