
import React from 'react';
import { AFFILIATE_LINKS, AffiliateProduct } from '@/data/affiliateLinks';
import { ShoppingBagIcon, ExternalLinkIcon, InfoIcon } from '@/components/ui/Icons';

const ProductCard: React.FC<{ product: AffiliateProduct }> = ({ product }) => (
  <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
    <div>
      <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
      <p className="mt-2 text-sm text-slate-600">{product.description}</p>
    </div>
    <div className="mt-4 pt-4 border-t border-slate-100">
        <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
        >
        View Product
        <ExternalLinkIcon className="h-4 w-4 text-slate-500" />
        </a>
    </div>
  </div>
);

const ShopSection: React.FC<{ title: string; products: AffiliateProduct[] }> = ({ title, products }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);

const ShopPage: React.FC = () => {
  const tools = AFFILIATE_LINKS.filter(p => p.category === 'tools');
  const ovens = AFFILIATE_LINKS.filter(p => p.category === 'ovens');
  const ingredients = AFFILIATE_LINKS.filter(p => p.category === 'ingredients');
  const books = AFFILIATE_LINKS.filter(p => p.category === 'books');

  return (
    <div className="mx-auto max-w-7xl animate-[fadeIn_0.5s_ease-in_out]">
      <button 
        onClick={() => window.history.back()} 
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
      >
        &larr; Back
      </button>

      {/* Header */}
      <div className="text-center mb-10">
        <ShoppingBagIcon className="mx-auto h-12 w-12 text-lime-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          DoughLabPro Shop
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
          Curated tools, ingredients, and books that truly help with dough and baking workflows.
        </p>
      </div>

      {/* Disclosure */}
      <div className="mx-auto max-w-3xl mb-12 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 border border-blue-200 flex items-start gap-3">
        <InfoIcon className="h-5 w-5 flex-shrink-0 text-blue-500 mt-0.5" />
        <p>
          <strong>Affiliate Disclosure:</strong> Some links on this page are affiliate links. If you click and buy, we may earn a small commission at no extra cost to you. We only recommend products that are technically relevant to dough and baking.
        </p>
      </div>

      {/* Sections */}
      <ShopSection title="Essential Tools" products={tools} />
      <ShopSection title="Ovens & Baking Surfaces" products={ovens} />
      <ShopSection title="Flours & Ingredients" products={ingredients} />
      <ShopSection title="Books & Learning" products={books} />

    </div>
  );
};

export default ShopPage;
