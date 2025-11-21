
import React from 'react';
import { Page } from '@/types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-500">
      <div className="mx-auto max-w-7xl px-4">
        <p>&copy; {currentYear} DoughLabPro. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <button onClick={() => onNavigate('terms')} className="hover:text-lime-600 hover:underline">
            Terms of Use
          </button>
          <button onClick={() => onNavigate('privacy')} className="hover:text-lime-600 hover:underline">
            Privacy Policy
          </button>
          <button onClick={() => onNavigate('shop')} className="hover:text-lime-600 hover:underline">
            Shop
          </button>
        </div>
        <p className="mt-4 text-xs text-slate-400">
          An indie project made with flour, water, and code.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
