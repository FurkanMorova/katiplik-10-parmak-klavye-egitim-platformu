import React from 'react';

interface SeoArticleProps {
  title: string;
  content: string; // HTML string for rich SEO text
}

export default function SeoArticle({ title, content }: SeoArticleProps) {
  return (
    <article className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }}>{title}</h1>
      <div 
        style={{ 
          lineHeight: '1.8', 
          color: 'var(--text-secondary)',
          fontSize: '1.1rem'
        }}
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </article>
  );
}
