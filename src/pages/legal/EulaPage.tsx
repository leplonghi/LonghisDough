import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const EulaPage: React.FC = () => {
  return (
    <LegalPageLayout title="End User License Agreement (EULA)" lastUpdated="August 1, 2024">
        <p>This document will be filled with the complete EULA text, based on real legal models and applicable legislation.</p>
        <h3>1. Grant of License</h3>
        <p>We grant you a revocable, non-exclusive, non-transferable, limited license to download, install and use the Application solely for your personal, non-commercial purposes strictly in accordance with the terms of this Agreement.</p>
    </LegalPageLayout>
  );
};

export default EulaPage;