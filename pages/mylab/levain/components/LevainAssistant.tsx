import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Levain } from '../../../../types';
import { askLevainAssistant } from '../../../../ai/assistantClient';
// FIX: Add missing icon imports
import { SparklesIcon, UserCircleIcon, SpinnerIcon, CloseIcon } from '../../../../components/IconComponents';
import { useTranslation } from '../../../../i18n';

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
      content: t('levain_pet.detail_page.assistant.initial_message')
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
            content: t('levain_pet.detail_page.assistant.initial_message')
        }]);
        setInputValue('');
        setIsLoading(false);
    }
  }, [isOpen, t]);

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
        ? 'bg-red-100 dark:bg-red-500/10 text-red-800 dark:text-red-200 self-start'
        : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 self-start';

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
        className="relative mx-4 flex flex-col w-full max-w-2xl h-[80vh] max-h-[700px] rounded-2xl bg-white shadow-xl dark:border dark:border-slate-700 dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-lime-500" />
            {t('levain_pet.detail_page