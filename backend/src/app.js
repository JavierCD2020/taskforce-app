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

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});