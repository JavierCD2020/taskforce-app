const n8nService = require('../services/n8n.service');

async function postN8nTest(req, res) {
  try {
    const data = await n8nService.sendDevopsTest();

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
}

module.exports = {
  postN8nTest
};
