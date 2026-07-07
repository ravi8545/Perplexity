import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MarkdownRenderer = ({ content }) => {
  if (!content) return null

  return (
    <div className="markdown-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-xl font-bold mt-5 mb-3 text-[#f0f0f5]">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-semibold mt-4 mb-2 text-[#f0f0f5]">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-semibold mt-3 mb-1.5 text-[#f0f0f5]">{children}</h3>,
          p: ({ children }) => <p className="mb-3 leading-relaxed text-[#d0d0dd]">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-[#f0f0f5]">{children}</strong>,
          em: ({ children }) => <em className="italic text-[#b8b8d0]">{children}</em>,
          ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1.5">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1.5">{children}</ol>,
          li: ({ children }) => <li className="text-[#d0d0dd] leading-relaxed">{children}</li>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#20B2AA] hover:text-[#00CED1] underline underline-offset-2 transition-colors">
              {children}
            </a>
          ),
          code: ({ inline, className: langClass, children }) => {
            if (inline) {
              return <code className="bg-[#2a2a45] text-[#20B2AA] px-1.5 py-0.5 rounded text-[0.85em] font-mono">{children}</code>
            }
            return (
              <pre className="bg-[#0d0d18] border border-[#2a2a45] rounded-xl p-4 mb-3 overflow-x-auto">
                <code className="text-[0.85rem] font-mono leading-relaxed text-[#d0d0dd]">{children}</code>
              </pre>
            )
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-3 border-[#20B2AA] pl-4 my-3 text-[#9898b0] italic">{children}</blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-sm border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="border-b border-[#2a2a45]">{children}</thead>,
          th: ({ children }) => <th className="text-left px-3 py-2 text-[#9898b0] font-semibold text-xs uppercase tracking-wider">{children}</th>,
          td: ({ children }) => <td className="px-3 py-2 text-[#d0d0dd] border-b border-[#2a2a45]/30">{children}</td>,
          hr: () => <hr className="border-[#2a2a45] my-4" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
