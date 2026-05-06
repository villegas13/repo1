const express = require('express');
const cors = require('cors');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/render-markdown', (req, res) => {
  const { markdown } = req.body;
  
  if (typeof markdown !== 'string') {
    return res.status(400).json({ error: 'Se requiere un string de markdown' });
  }

  const html = marked.parse(markdown);
  res.json({ html });
});

app.listen(PORT, () => {
  console.log(`Servidor de renderizado corriendo en http://localhost:${PORT}`);
});