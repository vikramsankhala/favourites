(function () {
  const toggle = document.getElementById('chatToggle');
  const panel = document.getElementById('chatPanel');
  const close = document.getElementById('chatClose');
  const messages = document.getElementById('chatMessages');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');

  function openChat() {
    panel.hidden = false;
    input.focus();
  }

  function closeChat() {
    panel.hidden = true;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function appendMsg(text, cls) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + (cls || '');
    if (cls && cls.includes('user')) {
      div.textContent = text;
    } else {
      div.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
    }
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendLoading() {
    const div = document.createElement('div');
    div.className = 'chat-msg assistant loading';
    div.id = 'chatLoading';
    div.textContent = 'Thinking';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeLoading() {
    document.getElementById('chatLoading')?.remove();
  }

  async function send() {
    const text = (input.value || '').trim();
    if (!text) return;

    input.value = '';
    sendBtn.disabled = true;

    appendMsg(text, 'user');

    appendLoading();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      removeLoading();

      if (!res.ok) {
        appendMsg('Error: ' + (data.error || data.details || res.status), 'error');
        return;
      }

      appendMsg(data.reply || 'No response.', 'assistant');
    } catch (err) {
      removeLoading();
      appendMsg('Failed to reach server. Is the backend running?', 'error');
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  toggle?.addEventListener('click', openChat);
  close?.addEventListener('click', closeChat);
  sendBtn?.addEventListener('click', send);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') send();
  });
})();
