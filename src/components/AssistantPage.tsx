
import React, { useState, useRef, useEffect } from 'react';
import { DoughConfig, DoughResult, SavedDoughConfig, FlourDefinition, Oven, ChatMessage } from '../types';
import { askGeneralAssistant } from '../ai/assistantClient';
import { SparklesIcon, UserCircleIcon, SpinnerIcon } from './ui/Icons';
import { useTranslation } from '@/i18n';

interface AssistantPageProps {
  config?: DoughConfig;
  results?: DoughResult | null;
  lastBatch?: SavedDoughConfig;
  selectedFlour?: FlourDefinition;
  defaultOven?: Oven;
  t: (key: string, replacements?: { [key: string]: string | number | undefined }) => string;
}

const AssistantPage: React.FC<AssistantPageProps> = (props) => {
  const { t } = props;
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: t('assistant_page.greeting_short')
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = inputValue.trim();
    if (!question || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askGeneralAssistant({
        question,
        doughConfig: props.config,
        doughResult: props.results,
        lastBatch: props.lastBatch,
        flour: props.selectedFlour,
        oven: props.defaultOven,
        t,
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('assistant_page.error');
      setMessages(prev => [...prev, { role: 'error', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.role === 'user';
    const isError = message.role === 'error';

    const bubbleClasses = isUser
      ? 'bg-lime-500 text-white self-end'
      : isError 
        ? 'bg-red-100 text-red-800 self-start'
        : 'bg-slate-200 text-slate-800 self-start';

    const icon = isUser ? <UserCircleIcon className="h-6 w-6" /> : <SparklesIcon className="h-6 w-6 text-lime-500" />;

    return (
        <div className={`flex items-start gap-3 w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && <div className="flex-shrink-0">{icon}</div>}
            <div className={`max-w-md rounded-2xl p-4 ${bubbleClasses}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
             {isUser && <div className="flex-shrink-0">{icon}</div>}
        </div>
    );
  };

  return (
    <div className="mx-auto max-w-4xl flex flex-col h-[calc(100vh-8rem)] rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/50">
      <div className="flex-shrink-0 p-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <SparklesIcon className="h-6 w-6 text-lime-500" />
          {t('assistant_page.title_short')}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 w-full justify-start">
            <div className="flex-shrink-0"><SparklesIcon className="h-6 w-6 text-lime-500" /></div>
            <div className="max-w-md rounded-2xl p-4 bg-slate-200 flex items-center gap-2">
                <SpinnerIcon className="h-5 w-5 animate-spin" />
                <span className="text-sm font-medium">{t('common.thinking')}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex-shrink-0 p-4 border-t border-slate-200">
        <form onSubmit={handleSend} className="flex items-center gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('assistant_page.placeholder_short')}
            className="flex-1 rounded-lg border-slate-300 bg-slate-100 p-3 text-slate-900 focus:border-lime-500 focus:ring-lime-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="rounded-lg bg-lime-500 py-3 px-5 font-semibold text-white shadow-sm transition-colors hover:bg-lime-600 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {t('assistant_page.send')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssistantPage;
