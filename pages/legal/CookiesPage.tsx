import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const CookiesPage: React.FC = () => {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="August 1, 2024">
        <p>This document will be filled with the complete Cookie Policy text, based on real legal models and applicable legislation (such as GDPR, CCPA, etc.).</p>
        <h3>1. What are Cookies?</h3>
        <p>Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
    </LegalPageLayout>
  );
};

export default CookiesPage;