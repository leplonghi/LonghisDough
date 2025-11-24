import React, { useState } from 'react';
import { Page } from '@/types';
import { ChevronDownIcon } from '@/components/ui/Icons';

// --- Placeholders for Company Data ---
const COMPANY_NAME = '[COMPANY NAME]';
const COMPANY_ADDRESS = '[FULL ADDRESS]';
const COMPANY_CITY_STATE = '[CITY/STATE]';
const LAST_UPDATED_DATE = '[dd/mm/yyyy]';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'terms', title: 'Terms of Use' },
  { id: 'privacy', title: 'Privacy Policy' },
  { id: 'cookies', title: 'Cookie Policy' },
  { id: 'affiliate', title: 'Affiliate Disclosure' },
  { id: 'eula', title: 'EULA' },
  { id: 'ip', title: 'Intellectual Property' },
  { id: 'contact', title: 'Legal Contact' },
];

const LegalSection: React.FC<{ id: string, title: string, lastUpdated?: string, children: React.ReactNode }> = ({ id, title, lastUpdated, children }) => (
  <section id={id} className="mb-12 scroll-mt-24">
    <div className="border-b border-slate-200 pb-4">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {lastUpdated && (
        <p className="mt-2 text-sm text-slate-500">Last updated: {lastUpdated}</p>
      )}
    </div>
    <div className="prose mt-6 max-w-none text-slate-600">
      {children}
    </div>
  </section>
);


const LegalIndexPage: React.FC<{ onNavigate: (page: Page) => void }> = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // A simplified handler for mobile navigation that closes the menu.
    const handleMobileNav = (id: string) => {
      setIsMobileMenuOpen(false);
      window.location.hash = `#legal#${id}`;
    };

    return (
        <div className="mx-auto max-w-7xl">
            {/* Mobile Header/Dropdown */}
            <div className="lg:hidden mb-6 relative">
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-full flex items-center justify-between rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200/50 text-left"
                >
                    <span className="font-semibold">Navigate page</span>
                    <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 p-2 z-10">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#/legal#${section.id}`}
                                onClick={(e) => { e.preventDefault(); handleMobileNav(section.id); }}
                                className="block w-full text-left rounded-md p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                {section.title}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block lg:col-span-1">
                    <nav className="sticky top-24 space-y-2">
                        {sections.map((section) => (
                        <a
                            key={section.id}
                            href={`#/legal#${section.id}`}
                            className="flex w-full items-center rounded-lg p-3 text-sm font-semibold transition-colors text-slate-600 hover:bg-slate-100"
                        >
                            <span className="truncate">{section.title}</span>
                        </a>
                        ))}
                    </nav>
                </aside>

                <main className="lg:col-span-3">
                    <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10">
                        
                        <LegalSection id="overview" title="Legal Matters">
                            <p>This area gathers the documents regulating the use of DoughLabPro, data protection, cookie usage, app licensing, affiliate disclosures, and contact channels for legal matters.</p>
                            <p>We recommend reading these documents carefully before using the application.</p>
                        </LegalSection>

                        <LegalSection id="terms" title="Terms of Use" lastUpdated={LAST_UPDATED_DATE}>
                            <h3>1. Object and Scope</h3>
                            <p>DoughLabPro is a technical support application for fermentation, baking, pizza making, and dough in general. It offers tools such as dough calculators, tutorials, bake history, My Lab, flour database, insights systems, and virtual assistants ("Services"). The Services are informational and educational in nature and do not constitute professional, nutritional, or medical advice.</p>
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
                            <p>The User acknowledges that: doughs, fermentation, and baking involve technical and environmental variables; the Company does not guarantee specific results, yield, flavor, texture, or final performance of the dough. The Company is not liable for: indirect damages, loss of profits, or culinary losses; failures resulting from improper use of the App; temporary service unavailability. The Services are provided "as is" and "as available".</p>
                            <h3>8. Modifications</h3>
                            <p>We may change these Terms at any time. Changes take effect 30 days after publication. If the User continues to use the App, it is considered that they have accepted the changes.</p>
                            <h3>9. Applicable Law</h3>
                            <p>These Terms are governed by applicable laws. The forum of {COMPANY_CITY_STATE} is elected to resolve conflicts.</p>
                            <h3>10. Affiliate Links</h3>
                            <p>Some links in DoughLabPro, including in the Shop and in contextual suggestions, are affiliate links. This means that if you click on the link and purchase a product, we may receive an affiliate commission at no extra cost to you. We only recommend products that we believe are technically relevant and useful for dough and baking workflows. However, any purchase decision is entirely yours and DoughLabPro is not responsible for the performance, availability or quality of third-party products.</p>
                        </LegalSection>

                        <LegalSection id="privacy" title="Privacy Policy" lastUpdated={LAST_UPDATED_DATE}>
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
                           <h3>5. Third-Party Links & Affiliates</h3>
                           <p>DoughLabPro may display links to third-party websites, including affiliate links to online shops and marketplaces. If you click those links, you will be redirected to external websites that are not operated by DoughLabPro. We are not responsible for the content, privacy practices or data collection policies of those third-party sites. We encourage you to review their privacy policies before providing any personal information or completing a purchase.</p>
                        </LegalSection>

                        <LegalSection id="cookies" title="Cookie Policy" lastUpdated={LAST_UPDATED_DATE}>
                          <h3>1. What are Cookies</h3>
                          <p>Cookies are small files stored on your device that help recognize the browser and improve the user experience, remembering preferences and analyzing performance.</p>
                          <h3>2. How We Use Cookies</h3>
                          <p>We may use: Strictly necessary cookies: for basic App operation; Performance cookies: to understand usage and improve features; Functionality cookies: to remember theme (light/dark), language, and other preferences.</p>
                          <h3>3. Managing Cookies</h3>
                          <p>You can manage or disable cookies in your browser or device settings.</p>
                        </LegalSection>

                        <LegalSection id="affiliate" title="Affiliate Disclosure" lastUpdated={LAST_UPDATED_DATE}>
                            <p>DoughLabPro participates in affiliate marketing programs. This means we may earn a commission on purchases made through our links to retailer sites.</p>
                            <p><strong>How it works:</strong> When you click on a link to a product in our Shop, Calculator, or Learn sections and make a purchase, the retailer pays us a small percentage of that sale. This comes at <strong>no extra cost to you</strong>.</p>
                            <p><strong>Our Promise:</strong> We only recommend products, tools, and ingredients that we believe are technically sound and beneficial for dough making and baking. Our recommendations are driven by utility and quality, not commission.</p>
                        </LegalSection>

                        <LegalSection id="eula" title="EULA – End User License Agreement" lastUpdated={LAST_UPDATED_DATE}>
                          <h3>1. License</h3>
                          <p>We grant the User a limited, personal, non-exclusive, non-transferable, and revocable license to install and use the App on their devices, exclusively for personal purposes.</p>
                          <h3>2. Restrictions</h3>
                          <p>The User agrees not to: decompile, reverse engineer, or attempt to access the source code; distribute unauthorized copies of the App; modify, sublicense, or resell the App; use the App for illegal purposes.</p>
                        </LegalSection>

                        <LegalSection id="ip" title="Intellectual Property">
                            <p>All content of DoughLabPro, including but not limited to: name and brand "DoughLabPro"; logos, icons, graphic elements; layout, visual identity, and interface design; texts, tutorials, descriptions, and presets; algorithms, calculation models, and source codes; are the exclusive property of {COMPANY_NAME} or its licensors, protected by copyright, industrial property legislation, and other applicable norms.</p>
                        </LegalSection>

                        <LegalSection id="contact" title="Legal Contact">
                            <p>For questions, requests regarding your personal data, or legal communications, use the channels below:</p>
                            <p><strong>Email:</strong> support@doughlabpro.com</p>
                            <p><strong>Address:</strong> {COMPANY_ADDRESS}</p>
                        </LegalSection>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default LegalIndexPage;