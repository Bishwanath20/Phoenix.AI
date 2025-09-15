import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { runChatStream } from '../services/geminiService';
import { RobotIcon, PaperPlaneIcon, PlusIcon, TrashIcon } from './icons';

const initialMessage: Omit<ChatMessage, 'timestamp'> = {
    role: 'model',
    text: 'Hello! I\'m your AI assistant. I can help you build the backend logic for your app. What would you like to create?',
};


const AiChat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        try {
            const savedMessages = localStorage.getItem('chatHistory');
            if (savedMessages) {
                return JSON.parse(savedMessages);
            }
        } catch (error) {
            console.error("Failed to load chat history from localStorage", error);
        }
        return [{ 
            ...initialMessage, 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
        }];
    });

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        try {
            localStorage.setItem('chatHistory', JSON.stringify(messages));
        } catch (error) {
            console.error("Failed to save chat history to localStorage", error);
        }
    }, [messages]);

    const handleClearChat = () => {
        if (window.confirm('Are you sure you want to clear the entire chat history?')) {
            setMessages([{ 
                ...initialMessage, 
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
            }]);
        }
    };


    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            role: 'user',
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        
        const currentChatHistory = [...messages, userMessage];
        setMessages(currentChatHistory);
        setInput('');
        setIsLoading(true);

        const modelMessageTemplate: ChatMessage = {
            role: 'model',
            text: '',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };
        setMessages(prev => [...prev, modelMessageTemplate]);

        try {
            const stream = await runChatStream(currentChatHistory);
            for await (const chunk of stream) {
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage.role === 'model') {
                        const updatedMessages = [...prev];
                        updatedMessages[prev.length - 1] = { ...lastMessage, text: lastMessage.text + chunk };
                        return updatedMessages;
                    }
                    return prev;
                });
            }
        } catch (error) {
            console.error('Error with Gemini API:', error);
             setMessages(prev => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage.role === 'model') {
                    const updatedMessages = [...prev];
                    updatedMessages[prev.length - 1] = { ...lastMessage, text: "Sorry, I couldn't connect to the AI. Please check your API key and try again." };
                    return updatedMessages;
                }
                return prev;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
    };
    
    const suggestionChips = ["+ Authentication", "+ Database Schema", "+ REST API"];

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-canvas-border shrink-0">
                <h3 className="font-semibold text-gray-900 dark:text-canvas-text-primary">AI Chat</h3>
                <button
                    onClick={handleClearChat}
                    className="text-gray-500 dark:text-canvas-text-secondary hover:text-red-500 dark:hover:text-red-400 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-canvas-lighter transition-colors"
                    title="Clear Chat"
                    aria-label="Clear Chat History"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6 p-4 pr-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            {msg.role === 'model' && (
                                <div className="w-8 h-8 rounded-full bg-canvas-primary flex items-center justify-center shrink-0 mt-1">
                                    <RobotIcon className="w-5 h-5 text-white" />
                                </div>
                            )}
                            <div className="flex flex-col">
                                <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-canvas-primary text-white rounded-br-none' : 'bg-gray-100 dark:bg-canvas-lighter text-gray-800 dark:text-canvas-text-primary rounded-bl-none'}`}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                </div>
                                <span className={`text-xs mt-1.5 text-gray-400 dark:text-canvas-text-secondary ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                 {isLoading && messages[messages.length - 1]?.role === 'model' && !messages[messages.length - 1]?.text && (
                    <div className="flex justify-start">
                        <div className="flex gap-3 max-w-sm">
                            <div className="w-8 h-8 rounded-full bg-canvas-primary flex items-center justify-center shrink-0 mt-1">
                                <RobotIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="px-4 py-3 rounded-2xl bg-gray-100 dark:bg-canvas-lighter rounded-bl-none">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-gray-400 dark:bg-canvas-text-secondary rounded-full animate-pulse delay-0"></span>
                                    <span className="w-2 h-2 bg-gray-400 dark:bg-canvas-text-secondary rounded-full animate-pulse delay-200"></span>
                                    <span className="w-2 h-2 bg-gray-400 dark:bg-canvas-text-secondary rounded-full animate-pulse delay-400"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-canvas-border shrink-0">
                <div className="flex flex-wrap gap-2 mb-3">
                    {suggestionChips.map(chip => (
                         <button key={chip} onClick={() => handleSuggestionClick(chip.substring(2))} className="flex items-center gap-1.5 bg-gray-100 dark:bg-canvas-lighter hover:bg-gray-200 dark:hover:bg-canvas-border text-gray-600 dark:text-canvas-text-secondary px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                            <PlusIcon className="w-3.5 h-3.5" />
                            {chip.substring(2)}
                        </button>
                    ))}
                </div>
                <div className="flex items-center bg-gray-100 dark:bg-canvas-lighter rounded-lg pr-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Describe what you want to build..."
                        className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-canvas-primary p-2 rounded-lg text-white disabled:bg-gray-300 dark:disabled:bg-canvas-border disabled:text-gray-500 dark:disabled:text-canvas-text-secondary transition-colors">
                        <PaperPlaneIcon className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-canvas-text-secondary mt-3 text-center">
                    ✨ AI is analyzing your frontend components...
                </p>
            </div>
        </div>
    );
};

export default AiChat;