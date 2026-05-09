/**
 * Punto de entrada de la aplicación
 */
require('dotenv').config();

const fs = require('fs');
const https = require('https');
const app = require('./src/app');

const PORT = process.env.PORT || 3003;

const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`🚀 Servidor (HTTPS) corriendo en https://localhost:${PORT}`);
  console.log(`📚 Documentación de endpoints: https://localhost:${PORT}/api-docs`);
});
