import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AlertCircle } from 'lucide-react';
import { getCardConfig } from '../cardRegistry';

interface PreviewProps {
  content: string;
}

const ErrorDisplay = ({ message, usage }: { message: string, usage: string }) => (
  <div className="my-4 p-4 rounded-lg bg-red-950/20 border border-red-900/50 text-red-200 font-sans text-sm flex items-start gap-3">
    <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
    <div>
      <div className="font-medium mb-1">{message}</div>
      <div className="text-red-300/60 text-xs mb-1.5">Expected format:</div>
      <code className="bg-red-950/50 px-2 py-1 rounded text-red-100 font-mono text-xs border border-red-900/30 block w-fit">
        {usage}
      </code>
    </div>
  </div>
);

export const Preview: React.FC<PreviewProps> = ({ content }) => {
  
  // Pre-process content to transform custom #card syntax into code blocks
  // that we can intercept with the renderers.
  // Regex looks for lines starting with #card and captures the type.
  const processedContent = useMemo(() => {
    return content.replace(/^#card\s+(\w+)(.*)$/gm, (match, type, args) => {
      // We convert it to a code block with a special language identifier
      return `\n\`\`\`custom-card:${type.trim()}\n${args.trim()}\n\`\`\`\n`;
    });
  }, [content]);

  const components: any = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-custom-card:(\w+)/.exec(className || '');
      
      if (!inline && match) {
        const type = match[1];
        // Extract arguments from children (the content of the code block)
        const argsRaw = String(children).trim();
        // Parse args into an array for validation and usage
        const args = argsRaw ? argsRaw.split(/\s+/) : [];

        const config = getCardConfig(type);

        if (config) {
            const error = config.validate(args);
            if (error) {
                return <ErrorDisplay message={error} usage={config.usage} />;
            }
            
            // Render the component using the factory method with parsed args
            return config.getComponent(args);
        }

        return <div className="p-4 bg-gray-800 border border-gray-700 text-gray-400 rounded text-sm">Unknown card type: <span className="font-mono text-gray-300">{type}</span></div>;
      }

      return !inline && className ? (
        <div className="bg-gray-950 rounded-md my-4 border border-gray-800 overflow-hidden">
             <div className="bg-gray-900/50 px-4 py-1 text-xs text-gray-500 border-b border-gray-800 font-mono">
                {className.replace('language-', '')}
             </div>
             <pre className="p-4 overflow-x-auto text-sm text-gray-300">
                <code className={className} {...props}>
                    {children}
                </code>
            </pre>
        </div>
      ) : (
        <code className="bg-gray-800/50 text-gray-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    },
    // Styling standard markdown elements
    h1: ({children}: any) => <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-800 pb-4">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-2xl font-semibold text-white mt-8 mb-4">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-xl font-medium text-gray-200 mt-6 mb-3">{children}</h3>,
    p: ({children}: any) => <p className="text-gray-400 leading-relaxed mb-4">{children}</p>,
    ul: ({children}: any) => <ul className="list-disc list-inside text-gray-400 mb-4 ml-4 space-y-1">{children}</ul>,
    ol: ({children}: any) => <ol className="list-decimal list-inside text-gray-400 mb-4 ml-4 space-y-1">{children}</ol>,
    blockquote: ({children}: any) => <blockquote className="border-l-4 border-indigo-500 pl-4 py-1 my-4 bg-gray-900/30 text-gray-300 italic rounded-r">{children}</blockquote>,
    a: ({children, href}: any) => <a href={href} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">{children}</a>,
  };

  return (
    <div className="prose prose-invert max-w-none p-8 pb-32">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};
