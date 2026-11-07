import app from './app.js';
import { testConnection } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(`🚀 TRISIS GYM API SERVER IS RUNNING`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);

  await testConnection();
});
