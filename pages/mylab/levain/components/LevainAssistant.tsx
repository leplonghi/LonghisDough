
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Levain } from '@/types';
import { askLevainAssistant } from '@/ai/assistantClient';
import { SparklesIcon, UserCircleIcon, SpinnerIcon, CloseIcon } from '@/components/ui/Icons';
import { useTranslation } from '@/i18n';

interface LevainAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  levain: Levain;
}

const LevainAssistant: React.FC<LevainAssistantProps> = ({ isOpen, onClose, levain }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Based on your levain's records, I can help you adjust routine, ratios, and usage time."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);
  
  // Reset when modal is opened
  useEffect(() => {
    if(isOpen) {
         setMessages([{
            role: 'assistant',
            content: "Based on your levain's records, I can help you adjust routine, ratios, and usage time."
        }]);
        setInputValue('');
        setIsLoading(false);
    }
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = inputValue.trim();
    if (!question || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askLevainAssistant(levain, question);
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
  
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative mx-4 flex flex-col w-full max-w-2xl h-[80vh] max-h-[700px] rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-lime-500" />
            {t('levain_pet.detail_page.assistant.modal_title')}
          </h2>
           <button onClick={onClose} className="rounded-full p-1 text-slate-500 hover:bg-slate-200">
                <CloseIcon className="h-6 w-6" />
            </button>
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
                placeholder={t('levain_pet.detail_page.assistant.placeholder')}
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
    </div>
  );
};

export default LevainAssistant;
