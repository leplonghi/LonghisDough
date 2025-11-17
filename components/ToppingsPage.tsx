
import React from 'react';
import { useTranslation } from '../i18n';
import { PizzaSliceIcon } from './IconComponents';
import { TOPPING_COMBINATIONS } from '../toppings-constants';
import { RecipeStyle } from '../types';

const ToppingsPage: React.FC = () => {
    const { t } = useTranslation();

    const groupedToppings = TOPPING_COMBINATIONS.reduce((acc, combo) => {
        const category = combo.category || 'other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(combo);
        return acc;
    }, {} as Record<string, typeof TOPPING_COMBINATIONS>);

    const categoryOrder = ['classic', 'modern', 'experimental'];

    return (
        <div className="mx-auto max-w-4xl animate-[fadeIn_0.5s_ease-in-out]">
            <div className="text-center">
                <PizzaSliceIcon className="mx-auto h-12 w-12 text-lime-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    Biblioteca de Coberturas
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                    Explore combinações clássicas e modernas de coberturas de pizza, com guias de quantidade para diferentes tamanhos.
                </p>
            </div>

            <div className="mt-12 space-y-12">
                {categoryOrder.map(category => {
                    if (!groupedToppings[category]) return null;
                    return (
                        <div key={category}>
                            <h2 className="text-2xl font-bold capitalize text-slate-800 dark:text-slate-100 border-b-2 border-lime-500 pb-2 mb-6">
                                {category}
                            </h2>
                            <div className="space-y-8">
                                {groupedToppings[category].map(combo => (
                                    <div key={combo.id} className="rounded-xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800 overflow-hidden">
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{combo.name}</h3>
                                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{combo.notes}</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <span className="text-xs font-semibold mr-2">Estilos:</span>
                                                {combo.compatibleStyles.map(style => (
                                                    <span key={style} className="inline-block rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                                                        {t(`form.${style.toLowerCase()}`, { defaultValue: style })}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full text-sm text-left">
                                                <thead className="bg-slate-50 dark:bg-slate-700/50">
                                                    <tr>
                                                        <th className="px-6 py-3 font-medium text-slate-600 dark:text-slate-300">Tamanho</th>
                                                        <th className="px-6 py-3 font-medium text-slate-600 dark:text-slate-300 text-right">Molho (g)</th>
                                                        <th className="px-6 py-3 font-medium text-slate-600 dark:text-slate-300 text-right">Queijo (g)</th>
                                                        <th className="px-6 py-3 font-medium text-slate-600 dark:text-slate-300 text-right">Cobertura (g)</th>
                                                        <th className="px-6 py-3 font-medium text-slate-600 dark:text-slate-300 text-right">Azeite Final (g)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                                    {combo.sizes.map(size => (
                                                        <tr key={size.sizeCm}>
                                                            <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">{size.sizeCm} cm</td>
                                                            <td className="px-6 py-4 text-right">{size.sauceGrams || '–'}</td>
                                                            <td className="px-6 py-4 text-right">{size.cheeseGrams || '–'}</td>
                                                            <td className="px-6 py-4 text-right">{size.toppingsGrams ?? '–'}</td>
                                                            <td className="px-6 py-4 text-right">{size.oilFinishGrams ?? '–'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ToppingsPage;
