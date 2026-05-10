const pool = require('../services/mysql.service');

async function getHealth(req, res) {
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
}

module.exports = {
  getHealth
};
