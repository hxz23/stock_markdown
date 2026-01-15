import React, { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { INITIAL_MARKDOWN } from './constants';
import { Sparkles, Layout, Code2, Loader2, AlertTriangle, Key } from 'lucide-react';
import { generateMarkdownContent } from './services/geminiService';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState(INITIAL_MARKDOWN);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [apiKeyError, setApiKeyError] = useState(false);

  // Check for API key on mount to show proper UI
  useEffect(() => {
    if (!process.env.API_KEY) {
        // We can handle this gracefully if needed, but for now we assume it's injected.
        // If not, the AI feature will just fail when clicked.
    }
  }, []);

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsAiLoading(true);
    setApiKeyError(false);
    try {
      const generated = await generateMarkdownContent(aiPrompt);
      // Append the generated content
      setMarkdown(prev => prev + '\n\n' + generated);
      setShowAiDialog(false);
      setAiPrompt('');
    } catch (error) {
      console.error(error);
      // A simple check if it's likely an API key issue
      setApiKeyError(true);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-950 text-white overflow-hidden">
      
      {/* Header */}
      <header className="h-14 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Layout size={18} strokeWidth={2.5} />
          </div>
          <h1 className="font-semibold text-lg tracking-tight text-gray-100">Markdown Pro <span className="text-gray-500 text-sm font-normal ml-2 hidden sm:inline">Editor & Live Preview</span></h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAiDialog(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold rounded-md transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <Sparkles size={14} />
            <span>AI Assist</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Editor Pane (Left) */}
        <div className="flex-1 border-r border-gray-800 flex flex-col min-w-[320px] relative group">
          <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <span className="text-xs font-mono text-gray-600 bg-gray-900/80 px-2 py-1 rounded border border-gray-800">MARKDOWN INPUT</span>
          </div>
          <Editor value={markdown} onChange={setMarkdown} />
        </div>

        {/* Preview Pane (Right) */}
        <div className="flex-1 bg-gray-900/30 overflow-y-auto min-w-[320px] relative scroll-smooth">
           {/* Custom scrollbar styling wrapper */}
           <div className="max-w-3xl mx-auto min-h-full">
              <Preview content={markdown} />
           </div>
        </div>
      </main>

      {/* AI Dialog Modal */}
      {showAiDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-800/50">
                <div className="flex items-center gap-2 text-indigo-400">
                    <Sparkles size={18} />
                    <h3 className="font-semibold text-white">Generate Content</h3>
                </div>
                <button onClick={() => setShowAiDialog(false)} className="text-gray-500 hover:text-white transition-colors">
                    <span className="text-2xl leading-none">&times;</span>
                </button>
            </div>
            
            <div className="p-6">
                <p className="text-sm text-gray-400 mb-4">
                    Describe what you want to add to your document. The AI can generate market reports, summaries, and insert charts automatically.
                </p>
                <textarea 
                    autoFocus
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g., Write a brief analysis of Apple's recent performance and include a kline chart."
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 min-h-[100px] resize-none mb-4"
                />
                
                {apiKeyError && (
                     <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-2 text-red-200 text-xs">
                        <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                        <div>
                            <strong>API Key Error:</strong> Could not connect to Gemini. Please ensure <code>process.env.API_KEY</code> is set correctly.
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={() => setShowAiDialog(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleAiGenerate}
                        disabled={isAiLoading || !aiPrompt.trim()}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all"
                    >
                        {isAiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                        {isAiLoading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
