
import React, { useState, useRef, useEffect } from 'react';
import { DoughConfig, DoughResult, SavedDoughConfig, FlourDefinition, Oven, ChatMessage } from '../types';
import { createAssistantStream } from '../ai/assistantClient';
import { SparklesIcon, UserCircleIcon, SpinnerIcon } from './IconComponents';

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
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = inputValue.trim();
    if (!question || isStreaming) return;

    // 1. Add User Message to UI
    // We don't send the entire newHistory to the client fn immediately,
    // the client fn receives the *previous* history + the new question.
    const previousHistory = [...messages]; 
    const newHistory = [...messages, { role: 'user' as const, content: question }];
    
    setMessages(newHistory);
    setInputValue('');
    setIsStreaming(true);

    // 2. Add Placeholder for Assistant Response (empty initially)
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      // 3. Call Streaming Client
      // Note: We pass previousHistory because `createAssistantStream` constructs 
      // the new message (context + question) internally for the API call.
      const stream = createAssistantStream({
        question,
        history: previousHistory, 
        doughConfig: props.config,
        doughResult: props.results,
        lastBatch: props.lastBatch,
        flour: props.selectedFlour,
        oven: props.defaultOven,
        t,
      });

      let fullResponse = '';
      
      // 4. Process the Stream
      for await (const chunk of stream) {
        fullResponse += chunk;
        // Update the last message (the assistant placeholder)
        setMessages(prev => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            updated[lastIdx] = { ...updated[lastIdx], content: fullResponse };
            return updated;
        });
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('assistant_page.error');
      // Remove the empty placeholder and add error
      setMessages(prev => {
          const historyWithoutPlaceholder = prev.slice(0, -1);
          return [...historyWithoutPlaceholder, { role: 'error', content: errorMessage }];
      });
    } finally {
      setIsStreaming(false);
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
                {/* Render Markdown-ish simply */}
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
            </div>
             {isUser && <div className="flex-shrink-0">{icon}</div>}
        </div>
    );
  };

  return (
    <div className="mx-auto max-w-4xl flex flex-col h-[calc(100vh-8rem)] rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/50">
      <div className="flex-shrink-0 p-4 border-b border-slate-200 bg-slate-50/50 rounded-t-2xl">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <SparklesIcon className="h-6 w-6 text-lime-500" />
          {t('assistant_page.title_short')}
          <span className="text-xs font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">Flash Model (Fast)</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        {isStreaming && messages[messages.length - 1].content === '' && (
             <div className="flex items-start gap-3 w-full justify-start">
                <div className="flex-shrink-0"><SparklesIcon className="h-6 w-6 text-lime-500" /></div>
                <div className="rounded-2xl p-4 bg-slate-200 flex items-center gap-2">
                    <SpinnerIcon className="h-4 w-4 animate-spin text-slate-500" />
                    <span className="text-xs font-medium text-slate-500">{t('common.thinking')}</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex-shrink-0 p-4 border-t border-slate-200 bg-white rounded-b-2xl">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('assistant_page.placeholder_short')}
            className="flex-1 rounded-xl border-slate-300 bg-slate-50 p-3 text-slate-900 focus:border-lime-500 focus:ring-lime-500 shadow-sm"
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={isStreaming || !inputValue.trim()}
            className="rounded-xl bg-lime-500 p-3 font-bold text-white shadow-sm transition-all hover:bg-lime-600 disabled:cursor-not-allowed disabled:bg-slate-300 active:scale-95"
          >
            {isStreaming ? <SpinnerIcon className="h-6 w-6 animate-spin" /> : t('assistant_page.send')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssistantPage;
