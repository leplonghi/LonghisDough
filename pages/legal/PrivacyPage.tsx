import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const PrivacyPage: React.FC = () => {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="August 1, 2024">
       <p>This Policy explains how we collect, process, store, and protect Users' personal data.</p>
       
       <h3>1. Data We Collect</h3>
       <p>We may collect:</p>
       <ul>
        <li><strong>a) User-provided data:</strong> Name; Email; Voluntarily registered data; Content entered in My Lab (recipes, notes, photos).</li>
        <li><strong>b) Automatically collected data:</strong> Device technical data; IP address, browser type, and identifiers; Usage logs; Cookies and similar technologies; App performance information.</li>
        <li><strong>c) Payment data:</strong> Processed exclusively by third parties (Google, Apple, payment processors). We do not store complete credit card information.</li>
       </ul>
       
       <h3>2. Purposes of Processing</h3>
       <p>We use data to: allow access and use of the App; personalize and improve the experience; register personal settings and User history; perform statistical analysis and product improvements; send communications related to the App; comply with legal obligations.</p>
       
       <h3>3. Data Sharing</h3>
       <p>We may share data with: hosting and infrastructure providers; analytics services (such as Google Analytics, Firebase); payment methods and app stores. We do not sell personal data to third parties.</p>
       
       <h3>4. Data Retention</h3>
       <p>We will keep personal data for the time necessary to fulfill the purposes described in this Policy, legal obligations, and regular exercise of rights.</p>

       <h3>5. Cookies & Local Storage</h3>
       <p>We use local storage and cookies to improve your experience. This includes:</p>
       <ul>
         <li><strong>Local Storage:</strong> We store user preferences (like theme and mode) and cached data (like your last calculator configuration) directly on your device to speed up the application and allow offline functionality.</li>
         <li><strong>Cookies:</strong> Used primarily for authentication and security purposes by our identity providers (like Google/Firebase).</li>
       </ul>
       
       <h3>6. Third-Party Links & Affiliates</h3>
       <p>DoughLabPro may display links to third-party websites, including affiliate links to online shops and marketplaces. If you click those links, you will be redirected to external websites that are not operated by DoughLabPro. We are not responsible for the content, privacy practices or data collection policies of those third-party sites. We encourage you to review their privacy policies before providing any personal information or completing a purchase.</p>

       <h3>7. Contact</h3>
       <p>For privacy-related questions, please contact support@doughlabpro.com.</p>
    </LegalPageLayout>
  );
};

export default PrivacyPage;