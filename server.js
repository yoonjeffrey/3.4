// entrada del servidor
import 'dotenv/config';
import fs from 'node:fs';
import https from 'node:https';
import app from './src/app.js';

const PORT = process.env.PORT || 3003;

const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`servidor https corriendo en https://localhost:${PORT}`);
  console.log(`documentacion de endpoints: https://localhost:${PORT}/api-docs`);
});
