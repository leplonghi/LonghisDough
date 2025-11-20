
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-500">
      <div className="mx-auto max-w-7xl px-4">
        <p>&copy; {currentYear} DoughLabPro. All rights reserved.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="https://www.doughlabpro.com/legal#terms-of-use" className="hover:text-lime-600 hover:underline">
            Terms of Use
          </a>
          <a href="https://www.doughlabpro.com/legal#privacy-policy" className="hover:text-lime-600 hover:underline">
            Privacy Policy
          </a>
          <a href="https://www.doughlabpro.com/legal#cookie-policy" className="hover:text-lime-600 hover:underline">
            Cookie Policy
          </a>
          <a href="https://www.doughlabpro.com/legal#safety-disclaimer" className="hover:text-lime-600 hover:underline">
            Safety Disclaimer
          </a>
          <a href="https://www.doughlabpro.com/legal#ai-notice" className="hover:text-lime-600 hover:underline">
            AI Notice
          </a>
          <a href="https://www.doughlabpro.com/legal#levain-pet-safety" className="hover:text-lime-600 hover:underline">
            Levain Pet Safety
          </a>
          <a href="mailto:contact@doughlabpro.com" className="hover:text-lime-600 hover:underline">
            Contact
          </a>
        </div>
        <p className="mt-4 text-xs text-slate-400">
          An indie project made with flour, water, and code.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
