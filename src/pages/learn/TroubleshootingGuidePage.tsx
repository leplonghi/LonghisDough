
import React from 'react';
import { Page } from '@/types';
import TechnicalPageLayout from './TechnicalPageLayout';
import LearnTopicCard from '@/components/learn/LearnTopicCard';
import { QuestionMarkCircleIcon } from '@/components/ui/Icons';

interface TroubleshootingGuidePageProps {
  onNavigate: (page: Page) => void;
}

const TroubleshootingGuidePage: React.FC<TroubleshootingGuidePageProps> = ({ onNavigate }) => {
    const topics = [
        { page: 'learn/troubleshooting', title: 'Sticky Dough', description: 'Diagnosis and solutions for dough that is too soft and hard to handle.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
        { page: 'learn/troubleshooting', title: 'Dry or Tearing Dough', description: 'Understand why the dough is not developing elasticity.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
        { page: 'learn/troubleshooting', title: 'Under-fermentation', description: 'Causes and corrections for dough that doesn\'t rise as expected.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
        { page: 'learn/troubleshooting', title: 'Pale Crust', description: 'Discover why your pizza is not browning in the oven.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
        { page: 'learn/troubleshooting', title: 'Oily Cheese', description: 'The science behind "oil-out" and how to control it.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
        { page: 'learn/troubleshooting', title: 'Soggy Center (Gum Line)', description: 'How to avoid the layer of dense raw dough under the topping.', icon: <QuestionMarkCircleIcon className="h-8 w-8" /> },
    ];

    return (
        <TechnicalPageLayout
            title="Troubleshooting Guide"
            subtitle="Diagnose and fix common problems: sticky dough, pale crust, and more."
        >
            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map(topic => (
                    <LearnTopicCard
                        key={topic.title}
                        {...topic}
                        onClick={() => onNavigate(topic.page as Page)}
                    />
                ))}
            </div>
        </TechnicalPageLayout>
    );
};

export default TroubleshootingGuidePage;
