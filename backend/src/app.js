const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors({
  origin: 'https://devops.taskforce.pe'
}));

app.use(express.json());

app.get('/api/health', async (req, res) => {

  try {

    const [rows] = await pool.query('SELECT NOW() AS server_time');

    res.json({
      status: 'ok',
      service: 'backend',
      mysql: 'connected',
      server_time: rows[0].server_time
    });

  } catch (error) {

    res.status(500).json({
      status: 'error',
      mysql: 'failed',
      message: error.message
    });

  }

});

const PORT = process.env.PORT || 3000;

app.post('/api/n8n-test', async (req, res) => {
  try {
    const response = await fetch('http://n8n:5678/webhook-test/devops-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'backend',
        message: 'Prueba desde Node.js hacia n8n'
      })
    });

    const data = await response.json();
    res.json({
      status: 'ok',
      backend: 'connected',
      n8n_response: data
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      n8n: 'failed',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});