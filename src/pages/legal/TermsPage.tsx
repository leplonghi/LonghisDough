import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const TermsPage: React.FC = () => {
  return (
    <LegalPageLayout title="Terms of Use" lastUpdated="August 1, 2024">
        <h3>1. Object and Scope</h3>
        <p>DoughLabPro is a personal, indie application designed for technical support in fermentation, baking, and pizza making. It offers tools such as dough calculators, tutorials, bake history, My Lab, and insights. The Services are informational and educational in nature and do not constitute professional, nutritional, or medical advice.</p>
        <p><strong>Disclaimer:</strong> This application is provided by an independent developer "as is" and "as available". By using this app, you acknowledge that you do so at your own risk.</p>
        
        <h3>2. Eligibility</h3>
        <p>The User declares to be over 18 years old or have authorization from a legal guardian. Minors should not use the App without supervision.</p>
        
        <h3>3. User Account</h3>
        <p>To use the App, it may be necessary to create an account. The User agrees to: provide correct and updated information; keep their credentials confidential; not share their account with third parties. The Company may suspend or delete accounts that violate these Terms.</p>
        
        <h3>4. Usage License</h3>
        <p>We grant the User a limited, non-exclusive, non-transferable, and revocable license to use the App exclusively for personal purposes. It is prohibited to: decompile, modify, or reverse engineer; use the App commercially without authorization; copy, distribute, or reproduce parts of the App without permission.</p>
        
        <h3>5. User Generated Content (UGC)</h3>
        <p>The User may enter recipes, photos, notes, and data into My Lab. By doing so, they grant the Company a worldwide, free, non-exclusive, and revocable license to store, process, and display this content within the App. The User declares that: they own rights to the submitted content; they will not publish illegal, offensive, discriminatory content or content that violates copyright.</p>
        
        <h3>6. Paid Plans and Subscriptions</h3>
        <p>If the App offers paid plans, the following rules apply: Subscriptions are billed by the official store (Google Play, App Store, or web). Automatic renewal occurs until cancellation by the User. Refunds follow store policies (Google/Apple) and applicable law.</p>
        
        <h3>7. Limitation of Liability</h3>
        <p>The User acknowledges that: doughs, fermentation, and baking involve technical and environmental variables; the Developer does not guarantee specific results, yield, flavor, texture, or final performance of the dough. The Developer is not liable for: indirect damages, loss of profits, or culinary losses; failures resulting from improper use of the App; temporary service unavailability. The Services are provided "as is" without warranties of any kind.</p>
        
        <h3>8. Affiliate Links</h3>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
            <p><strong>Disclosure:</strong> Some links in DoughLabPro, including in the Shop and in contextual suggestions, are affiliate links. This means that if you click on the link and purchase a product, we may receive an affiliate commission at no extra cost to you. We only recommend products that we believe are technically relevant and useful for dough and baking workflows. However, any purchase decision is entirely yours and DoughLabPro is not responsible for the performance, availability or quality of third-party products.</p>
        </div>

        <h3>9. Modifications</h3>
        <p>We may change these Terms at any time. Changes take effect 30 days after publication. If the User continues to use the App, it is considered that they have accepted the changes.</p>
        
        <h3>10. Applicable Law</h3>
        <p>These Terms are governed by applicable laws.</p>
    </LegalPageLayout>
  );
};

export default TermsPage;