
import React, { useState, useEffect } from 'react';
import { CardConfig } from '../cardRegistry';
import { X, Eye, Check } from 'lucide-react';

interface ComponentInsertionModalProps {
    card: CardConfig;
    onClose: () => void;
    onInsert: (markdown: string) => void;
}

export const ComponentInsertionModal: React.FC<ComponentInsertionModalProps> = ({ card, onClose, onInsert }) => {
    // Initialize params state array based on card parameters
    const [params, setParams] = useState<string[]>(() => 
        card.parameters.map(p => p.defaultValue)
    );

    const handleParamChange = (index: number, value: string) => {
        const newParams = [...params];
        newParams[index] = value;
        setParams(newParams);
    };

    const handleInsert = () => {
        // Construct markdown string: #card <type> <param1> <param2> ...
        const argsString = params.filter(p => p.trim() !== '').join(' ');
        const markdown = `\n#card ${card.type} ${argsString}\n`;
        onInsert(markdown);
    };

    // Handle escape key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Preview Component Rendering
    // We wrap it in a try-catch boundary conceptually, though React error boundaries are better. 
    // Here we assume the component renders safely with valid defaults.
    const PreviewComponent = card.getComponent(params);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${card.color.bg} ${card.color.text}`}>
                            <card.icon size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-100">{card.label}</h3>
                            <p className="text-xs text-gray-500">{card.description}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    
                    {/* Settings Panel (Left) */}
                    <div className="w-full md:w-80 bg-gray-950/50 border-r border-gray-800 p-6 flex flex-col gap-6 overflow-y-auto shrink-0">
                        <div className="space-y-4">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Parameters</h4>
                            
                            {card.parameters.map((param, idx) => (
                                <div key={param.name} className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-300 block">
                                        {param.label}
                                    </label>
                                    
                                    {param.type === 'select' ? (
                                        <div className="relative">
                                            <select
                                                value={params[idx]}
                                                onChange={(e) => handleParamChange(idx, e.target.value)}
                                                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 px-3 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer"
                                            >
                                                {param.options?.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            value={params[idx]}
                                            onChange={(e) => handleParamChange(idx, e.target.value)}
                                            placeholder={param.defaultValue}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 px-3 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        />
                                    )}
                                    
                                    {param.description && (
                                        <p className="text-[11px] text-gray-500">{param.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-800">
                            <div className="bg-gray-900 p-3 rounded border border-gray-800 font-mono text-xs text-gray-400 break-all">
                                <span className="text-indigo-400">#card</span> {card.type} {params.join(' ')}
                            </div>
                        </div>
                    </div>

                    {/* Preview Panel (Right) */}
                    <div className="flex-1 bg-gray-900/30 p-6 overflow-y-auto flex flex-col">
                        <div className="flex items-center gap-2 mb-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Eye size={14} /> Live Preview
                        </div>
                        
                        <div className="flex-1 flex items-center justify-center min-h-[300px] border-2 border-dashed border-gray-800 rounded-xl p-4 bg-gray-950/20">
                            <div className="w-full max-w-xl pointer-events-none select-none">
                                {/* Wrap in a div to isolate styling if needed */}
                                {PreviewComponent}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-800 bg-gray-900 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleInsert}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all active:scale-95"
                    >
                        <Check size={16} />
                        Insert Component
                    </button>
                </div>
            </div>
        </div>
    );
};
