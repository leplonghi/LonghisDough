
import React from 'react';
import TechnicalPageLayout from './TechnicalPageLayout';
import { BookOpenIcon, LightBulbIcon, ExclamationCircleIcon, ClockIcon, BeakerIcon } from '@/components/ui/Icons';

const Section: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-8 first:mt-0">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">
            {icon}
            {title}
        </h3>
        <div className="prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const AutolysePage: React.FC = () => {
  return (
    <TechnicalPageLayout
      title="Autolyse: Letting Flour and Water Do the First Shift"
      subtitle="Understanding the passive rest technique that improves extensibility and flavor."
      showReferencesSection={false}
    >
        <Section title="What Autolyse Really Is" icon={<ClockIcon className="h-5 w-5" />}>
            <p>
                Autolyse is a controlled rest period where only flour and water are combined and left to hydrate. Yeast, levain, and salt are added later.
            </p>
            <p className="mt-2">During autolyse:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Starch granules absorb water.</li>
                <li>Gluten-forming proteins (gliadin and glutenin) hydrate and begin to link.</li>
                <li>Naturally occurring enzymes start breaking down starches into simpler sugars.</li>
            </ul>
            <p className="mt-2">
                The result is a dough that feels smoother, more extensible, and easier to mix, even though you have done very little mechanical work.
            </p>
        </Section>

        <Section title="Why Bakers Use Autolyse">
            <p>Autolyse is not magic, but it offers several practical benefits:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Improved extensibility:</strong> The dough stretches more easily and resists tearing, which is crucial for open-crumb breads and high-hydration pizza or pan doughs.</li>
                <li><strong>Less mixing required:</strong> Because gluten starts forming during the rest, you usually need less intensive mixing or kneading to reach the same level of development.</li>
                <li><strong>Better flavor and color:</strong> Enzymatic activity during autolyse produces more simple sugars, which feed fermentation and contribute to crust color and aroma.</li>
                <li><strong>Gentler dough handling:</strong> Especially in high-hydration formulas, autolyse helps you "tame" the dough and reduce oxidation from aggressive mixing.</li>
            </ul>
        </Section>

        <Section title="When Autolyse Helps the Most">
            <p>Autolyse is particularly useful when:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Working with strong flours that can feel tight or elastic.</li>
                <li>Targeting high hydration doughs (70%+ for breads, pan pizzas, ciabatta, etc.).</li>
                <li>Aiming for a very open crumb with long fermentation.</li>
                <li>Mixing by hand, where reducing mechanical work is valuable.</li>
            </ul>
            <p className="mt-2">
                In simpler, lower-hydration doughs or enriched doughs with a lot of fat and sugar, the impact of autolyse is smaller and sometimes negligible.
            </p>
        </Section>

        <Section title="When Autolyse Is Not a Good Idea">
            <p>Autolyse is not mandatory for every formula. You should be cautious or skip it when:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>The recipe contains a lot of sugar or fat (brioche, some buns, rich pastries) – these ingredients can interfere with gluten formation and are usually added later anyway.</li>
                <li>The dough relies on short, direct fermentation with minimal rest times (fast pizza, basic sandwich loaves).</li>
                <li>You are working with very weak flour that already struggles to hold structure.</li>
            </ul>
            <p className="mt-2">
                In these cases, good mixing and fermentation management are far more important than adding an autolyse step.
            </p>
        </Section>

        <Section title="Basic Autolyse Protocol (Practical Guide)">
            <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li><strong>Weigh flour and water:</strong> Use the exact amounts from your formula. If you plan to hold back some water for later bassinage, subtract that from the autolyse water.</li>
                <li><strong>Mix just until no dry flour remains:</strong> Combine flour and water until you have a shaggy, homogeneous mass. No need to develop gluten at this stage.</li>
                <li><strong>Cover and rest:</strong> Let the dough rest, covered, for 20 to 60 minutes at room temperature.
                    <ul className="list-disc pl-5 mt-1 text-sm text-slate-500 dark:text-slate-400">
                        <li>Shorter autolyses (20–30 minutes) are enough for many pizza and bread formulas.</li>
                        <li>Longer autolyses (up to 60 minutes) can help with very strong flours or high hydration.</li>
                    </ul>
                </li>
                <li><strong>Add levain/yeast and salt after autolyse:</strong> Once the rest is over, sprinkle levain or yeast over the dough, add salt, and continue with mixing or kneading. Work until the dough is cohesive and elastic, then proceed to bulk fermentation as usual.</li>
            </ol>
        </Section>

        <Section title="Autolyse vs. 'Fermentolyse'" icon={<BeakerIcon className="h-5 w-5" />}>
            <p>
                Some bakers choose to mix levain together with flour and water from the beginning, leaving salt for later. This variant is often called <strong>fermentolyse</strong>.
            </p>
            <p className="mt-2 font-semibold">Key differences:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
                <li><strong>Autolyse (classic):</strong> flour + water only.</li>
                <li><strong>Fermentolyse:</strong> flour + water + levain (or yeast), salt later.</li>
            </ul>
            <p className="mt-2">
                Autolyse focuses on hydration and gluten development with minimal fermentation. Fermentolyse starts fermentation earlier, which can be interesting in certain sourdough schedules but is a different tool with different timing and behavior.
            </p>
        </Section>

        <Section title="Pro Tip – Keep It Simple and Measurable" icon={<LightBulbIcon className="h-5 w-5 text-yellow-500" />}>
            <p>
                Autolyse works best when you treat it as a controlled experiment, not a vague tradition. Start with 20–30 minutes, flour + water only, on a formula you know well. Compare dough feel during mixing, extensibility when shaping, and crumb structure after baking. If you see real benefits, then you can experiment with longer rests, higher hydration, or different flours.
            </p>
        </Section>

        <Section title="Critical Point – Do Not Lose Control" icon={<ExclamationCircleIcon className="h-5 w-5 text-red-500" />}>
            <p>
                If you include levain or yeast in the initial mix (fermentolyse) and extend the rest too long, you are no longer doing a simple autolyse – you are fermenting.
            </p>
            <p className="mt-2"><strong>Signs that you have gone too far:</strong></p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Dough already shows strong gas activity before bulk.</li>
                <li>Gluten is over-relaxed and difficult to handle.</li>
                <li>Timing for bulk and final proof becomes unpredictable.</li>
            </ul>
            <p className="mt-2">
                Use autolyse to improve structure and handling, not as an excuse to leave the dough unattended for hours. Time and temperature still matter.
            </p>
        </Section>

        <Section title="Technical References" icon={<BookOpenIcon className="h-5 w-5" />}>
          <ul className="list-disc pl-5 space-y-2">
              <li>Raymond Calvel – The Taste of Bread</li>
              <li>Michel Suas – Advanced Bread and Pastry</li>
              <li>Modernist Bread – Bread Science &amp; Techniques</li>
          </ul>
        </Section>
    </TechnicalPageLayout>
  );
};

export default AutolysePage;
