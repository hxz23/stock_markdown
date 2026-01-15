import React, { useRef, useState } from 'react';
import { Terminal, ChevronDown, ChevronRight } from 'lucide-react';
import { CARD_REGISTRY, CardConfig } from '../cardRegistry';
import { ComponentInsertionModal } from './ComponentInsertionModal';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedCard, setSelectedCard] = useState<CardConfig | null>(null);

  const handleInsertText = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);
    
    onChange(newValue);
    setSelectedCard(null); // Close modal
    
    // Restore focus and move cursor to end of inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  return (
    <div className="flex flex-col h-full bg-gray-950">
      <textarea
        ref={textareaRef}
        className="flex-1 w-full bg-gray-950 text-gray-300 p-6 font-mono text-sm resize-none focus:outline-none focus:ring-0 border-0 leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        placeholder="Type your markdown here..."
      />
      
      {/* Component Toolbar */}
      <div className="border-t border-gray-800 bg-gray-900/50 flex flex-col shrink-0">
        <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 p-3 w-full hover:bg-gray-800/50 transition-colors text-left focus:outline-none"
        >
            <Terminal size={12} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex-1">Available Components</span>
            {isExpanded ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
        </button>
        
        {isExpanded && (
            <div className="px-3 pb-3 grid grid-rows-2 grid-flow-col gap-2 overflow-x-auto auto-cols-max animate-in slide-in-from-top-2 duration-200">
                {CARD_REGISTRY.map((card) => {
                    const Icon = card.icon;
                    return (
                        <button 
                            key={card.type}
                            onClick={() => setSelectedCard(card)}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-600 rounded-md transition-all group min-w-max w-full"
                            title={card.description}
                        >
                            <div className={`${card.color.bg} p-1 rounded ${card.color.text} ${card.color.hoverBg} shrink-0`}>
                                <Icon size={14} />
                            </div>
                            <div className="text-left">
                                <div className="text-xs font-semibold text-gray-300">{card.label}</div>
                                <code className="text-[10px] text-gray-500 font-mono">{card.usage.split(' ')[0]} {card.usage.split(' ')[1]}...</code>
                            </div>
                        </button>
                    );
                })}
            </div>
        )}
      </div>

      {/* Insertion Modal */}
      {selectedCard && (
        <ComponentInsertionModal 
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
            onInsert={handleInsertText}
        />
      )}
    </div>
  );
};
