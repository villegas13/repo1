import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  // 1. Persistencia: Recuperar datos de Local Storage al cargar
  useEffect(() => {
    const savedContent = localStorage.getItem('markdown-content');
    if (savedContent) {
      setMarkdown(savedContent);
    }
  }, []);

  // 2. Persistencia: Guardar en Local Storage cada vez que cambie el markdown
  useEffect(() => {
    localStorage.setItem('markdown-content', markdown);
  }, [markdown]);

  // 3. Lógica de Tiempo Real con Debounce
  useEffect(() => {
    const renderTimer = setTimeout(async () => {
      if (!markdown.trim()) {
        setHtml('');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/render-markdown', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ markdown }),
        });
        
        const data = await response.json();
        setHtml(data.html);
      } catch (error) {
        console.error('Error enviando markdown al servidor:', error);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(renderTimer);
  }, [markdown]);

  return (
    <div className="container">
      <header className="header">
        <h1>Markdown Live Editor</h1>
      </header>
      <div className="editor-pane">
        <textarea
          className="input-area"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Escribe tu Markdown aquí..."
        />
        <div 
          className="preview-area"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export default App;