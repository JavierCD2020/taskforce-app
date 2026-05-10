const N8N_WEBHOOK_URL = 'http://n8n:5678/webhook/devops-test';

async function sendDevopsTest() {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: 'backend',
      message: 'Prueba desde Node.js hacia n8n'
    })
  });

  return response.json();
}

module.exports = {
  sendDevopsTest
};
