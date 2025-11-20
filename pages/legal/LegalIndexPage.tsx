
import React, { useEffect } from 'react';
import { Page } from '../../types';
import { ShieldCheckIcon, GlobeAltIcon, ScaleIcon, LockClosedIcon, CurrencyDollarIcon, ExclamationCircleIcon } from '../../components/IconComponents';

// --- Placeholders ---
const DATE = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const COMPANY_NAME = 'DoughLabPro Inc.'; // Placeholder
const CONTACT_EMAIL = 'support@doughlabpro.com';
const ADDRESS = '123 Dough Street, Baker City'; // Placeholder
const STATE = 'Delaware'; // Common for SaaS

const LegalIndexPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {

    // Handle hash scrolling on mount
    useEffect(() => {
        const hash = window.location.hash.split('#')[2]; // #/legal#section
        if (hash) {
            const element = document.getElementById(hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, []);

    const navLinks = [
        { id: 'terms', label: 'Terms of Use', icon: <ScaleIcon className="h-4 w-4" /> },
        { id: 'privacy', label: 'Privacy Policy', icon: <LockClosedIcon className="h-4 w-4" /> },
        { id: 'dpa', label: 'DPA', icon: <GlobeAltIcon className="h-4 w-4" /> },
        { id: 'affiliate', label: 'Affiliate Disclosure', icon: <CurrencyDollarIcon className="h-4 w-4" /> },
        { id: 'refund', label: 'Refund Policy', icon: <CurrencyDollarIcon className="h-4 w-4" /> },
        { id: 'disclaimer', label: 'Global Disclaimer', icon: <ExclamationCircleIcon className="h-4 w-4" /> },
    ];

    return (
        <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in-out]">
            <div className="mb-10 text-center">
                <ShieldCheckIcon className="mx-auto h-12 w-12 text-slate-900" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Master Legal Document
                </h1>
                <p className="mt-2 text-slate-500">
                    Applies to DoughLabPro &bull; Last Updated: {DATE}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Sidebar Navigation */}
                <aside className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
                    <nav className="space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={`#/legal#${link.id}`}
                                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                            >
                                {link.icon}
                                {link.label}
                            </a>
                        ))}
                    </nav>
                    <div className="mt-8 rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
                        <p className="font-bold text-slate-700 mb-1">{COMPANY_NAME}</p>
                        <p>{ADDRESS}</p>
                        <p className="mt-2 text-lime-600">{CONTACT_EMAIL}</p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-9 space-y-16">
                    
                    {/* TERMS OF USE */}
                    <section id="terms" className="scroll-mt-24 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/50">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <ScaleIcon className="h-6 w-6 text-slate-400" />
                            Terms of Use
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">(Global SaaS – Contractual Terms)</p>
                            
                            <h3>1. Acceptance</h3>
                            <p>By using DoughLabPro (“Service”), you agree to these Terms. If you do not agree, discontinue use immediately. The Service is intended for users aged 18+.</p>

                            <h3>2. Description of Service</h3>
                            <p>DoughLabPro provides dough calculators, technical presets, levain tracking, batch logs, insights, AI-generated suggestions, and affiliate recommendations. The Service is informational only and not professional advice.</p>

                            <h3>3. User Accounts</h3>
                            <p>You must provide accurate information and secure your credentials. You are responsible for all activity under your account. We may suspend or terminate accounts for misuse or violation of these Terms.</p>

                            <h3>4. License</h3>
                            <p>You receive a limited, non-transferable, revocable license to use the Service. You may not reverse-engineer, extract data, redistribute, resell, or bypass monetization restrictions.</p>

                            <h3>5. Intellectual Property</h3>
                            <p>All code, UI, design, text, data, and trademarks belong to {COMPANY_NAME}.</p>

                            <h3>6. Safety & Risk Notice</h3>
                            <p>Using ovens, fermentation, levain, and kitchen equipment involves inherent risks. You assume full responsibility for:</p>
                            <ul>
                                <li>Preventing contamination</li>
                                <li>Monitoring dough and levain safety</li>
                                <li>Handling heat and ovens</li>
                                <li>Verifying recipe suitability</li>
                                <li>Applying any technical or AI-generated content</li>
                            </ul>
                            <p>We are not liable for injury, burns, food poisoning, contamination, equipment damage, or bake failure.</p>

                            <h3>7. AI Features</h3>
                            <p>AI tools may generate incorrect, incomplete, or non-optimal instructions. AI content is informational only. You assume full risk for its application.</p>

                            <h3>8. Affiliate Links</h3>
                            <p>We may earn commissions from affiliate links, at no extra cost to you. Affiliate relationships do not influence core functionality or preset logic.</p>

                            <h3>9. Subscriptions & Billing</h3>
                            <p>Payments are processed through Stripe. Subscriptions renew automatically until cancelled. No prorated refunds. Free trials may be revoked for misuse.</p>

                            <h3>10. Limitation of Liability</h3>
                            <p>To the fullest extent permitted by law, {COMPANY_NAME} is not liable for: personal injury, equipment damage, food safety issues, recipe or baking failure, loss of data, indirect or consequential losses. Maximum liability is the amount paid by you in the last 12 months.</p>

                            <h3>11. Termination</h3>
                            <p>We may suspend or terminate accounts at any time for violation of these Terms.</p>

                            <h3>12. Governing Law</h3>
                            <p>These Terms are governed by the laws of the State of {STATE}, USA. All disputes shall be resolved through binding arbitration, individually.</p>
                        </div>
                    </section>

                    {/* PRIVACY POLICY */}
                    <section id="privacy" className="scroll-mt-24 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/50">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <LockClosedIcon className="h-6 w-6 text-slate-400" />
                            Privacy Policy
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                             <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">(Global, GDPR/CCPA/LGPD-aligned)</p>

                            <h3>1. Types of Data Collected</h3>
                            <p>We collect: name, email, account data; dough configurations, batch logs, levain data; device info, IP, browser, usage logs; payment metadata via Stripe; affiliate click data; support messages. <strong>We do not collect sensitive medical or biometric data.</strong></p>

                            <h3>2. How We Use Data</h3>
                            <ul>
                                <li>Operate the Service</li>
                                <li>Sync data across devices</li>
                                <li>Store configurations and logs</li>
                                <li>Provide insights and AI suggestions</li>
                                <li>Process payments</li>
                                <li>Detect fraud</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                            <p>We do not sell user data.</p>

                            <h3>3. Legal Bases</h3>
                            <p>Data is processed under: contract performance, legitimate interest, user consent, and legal compliance.</p>

                            <h3>4. Sharing Data</h3>
                            <p>We share data only with necessary processors: Firebase (Google Cloud), Stripe, analytics providers, email delivery tools, AI inference providers, affiliate networks.</p>

                            <h3>5. International Transfers</h3>
                            <p>Data may be processed globally. We apply safeguards including encryption, access control, and compliant contracts.</p>

                            <h3>6. Security</h3>
                            <p>We use industry-standard security measures. No system is fully secure.</p>

                            <h3>7. User Rights</h3>
                            <p>You may request access, correction, deletion, export, or restriction. Submit requests to {CONTACT_EMAIL}.</p>

                            <h3>8. Retention</h3>
                            <p>Data is retained while the account is active. Upon request, data is deleted or anonymized within 30 days.</p>

                            <h3>9. Children</h3>
                            <p>Not intended for users under 13.</p>

                            <h3>10. Updates</h3>
                            <p>We may update this Policy. Continued use means acceptance.</p>
                        </div>
                    </section>

                    {/* DPA */}
                    <section id="dpa" className="scroll-mt-24 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/50">
                         <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <GlobeAltIcon className="h-6 w-6 text-slate-400" />
                            Data Processing Addendum (DPA)
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                             <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">(Short, strong, compliant)</p>
                             
                             <h3>1. Roles</h3>
                             <p>Controller: User. Processor: {COMPANY_NAME}.</p>

                             <h3>2. Instructions</h3>
                             <p>Processor only processes Personal Data per Controller instructions.</p>

                             <h3>3. Subprocessors</h3>
                             <p>Authorized subprocessors include: Google/Firebase, Stripe, analytics providers, AI providers, cloud hosting, affiliate platforms.</p>

                             <h3>4. Transfers</h3>
                             <p>Global processing is permitted with safeguards (encryption + contractual protections).</p>

                             <h3>5. Security</h3>
                             <p>Processor implements industry-standard protection.</p>

                             <h3>6. Assistance</h3>
                             <p>Processor assists with user data requests (access, correction, deletion).</p>

                             <h3>7. Deletion</h3>
                             <p>Data is deleted or anonymized within 30 days upon request.</p>

                             <h3>8. Breach Notification</h3>
                             <p>Processor notifies Controller of confirmed breaches without undue delay.</p>

                             <h3>9. No Secondary Use</h3>
                             <p>Processor will not: use data for its own purposes, sell data, train non-DoughLabPro AI models with personal data, or share data outside authorized subprocessors.</p>

                             <h3>10. Governing Law</h3>
                             <p>Follows the governing law defined in the Terms of Use.</p>
                        </div>
                    </section>

                     {/* AFFILIATE DISCLOSURE */}
                    <section id="affiliate" className="scroll-mt-24 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/50">
                         <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <CurrencyDollarIcon className="h-6 w-6 text-slate-400" />
                            Affiliate Disclosure
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                             <p>DoughLabPro participates in affiliate programs. We may earn commissions from qualifying purchases made through links. This does not affect prices or influence platform logic.</p>
                        </div>
                    </section>
                    
                    {/* REFUND POLICY */}
                    <section id="refund" className="scroll-mt-24 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/50">
                         <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <CurrencyDollarIcon className="h-6 w-6 text-slate-400" />
                            Refund Policy
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                             <p>All payments are final and non-refundable, except where required by law. No refunds for: unused subscription time, dissatisfaction with baking results, user mistakes, changes in personal circumstances.</p>
                             <p>Subscriptions may be cancelled at any time via account settings.</p>
                        </div>
                    </section>

                    {/* DISCLAIMER */}
                    <section id="disclaimer" className="scroll-mt-24 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/50">
                         <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <ExclamationCircleIcon className="h-6 w-6 text-slate-400" />
                            Global Safety & AI Disclaimer
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                             <p>DoughLabPro provides informational tools related to dough, fermentation, and baking. <strong>We do not guarantee food safety, baking success, oven safety, or contamination prevention.</strong></p>
                             <p>High-temperature ovens and fermentation involve real risks. AI outputs may contain errors, unsafe suggestions, or incomplete information. Always follow local food-safety laws, professional guidelines, and common sense. Use the Service at your own risk.</p>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LegalIndexPage;
