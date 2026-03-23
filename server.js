try { require('dotenv').config(); } catch (_) {}
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(express.static(__dirname));

const SYSTEM_PROMPT = `You are a helpful assistant for the Live Stage music website. 
The site curates 4K live concert videos from Celine Dion, Shakira, Enrique Iglesias, 
best dance videos, Bruce Springsteen, Beatles, Carpenters, ABBA, top crooners, football legends (Pelé, Maradona, Messi, Ronaldo, Cruyff, Zidane, Ronaldinho, R9, Van Basten, Beckenbauer), Messi gear & equipment (boots, jerseys, Adidas),
African/Latin/Flamenco world music, and classic love songs. Help users discover videos, 
recommend based on their tastes, or answer questions about the content.`;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'AI is not configured. Set ANTHROPIC_API_KEY in environment variables.',
    });
  }

  try {
    const response = await fetch(
      'https://api.anthropic.com/v1/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: message }],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({
        error: `Anthropic API error: ${response.status}`,
        details: err.slice(0, 200),
      });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';
    return res.json({ reply: text });
  } catch (err) {
    console.error('Anthropic API error:', err.message);
    return res.status(500).json({
      error: 'Failed to get AI response',
      details: err.message,
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Live Stage listening on port ${PORT}`);
});
