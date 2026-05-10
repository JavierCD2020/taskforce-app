const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health.routes');
const n8nRoutes = require('./routes/n8n.routes');

const app = express();

app.use(cors({
  origin: 'https://devops.taskforce.pe'
}));

app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api', n8nRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
