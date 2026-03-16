const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
const HTTP_PORT = 3000;
const HTTPS_PORT = 443;

// Serve static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// /up endpoint that returns JSON with status 200
app.get('/up', (req, res) => {
    res.status(200).json({ status: "OK" });
});

// Load SSL certificates (replace with your actual cert paths)
// For production, use paths to your actual .crt and .key files
// For development, you can generate self-signed certificates with:
// openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

let sslOptions = null;
const CERT_PATH = process.env.SSL_CERT_PATH || 'cert.pem';
const KEY_PATH = process.env.SSL_KEY_PATH || 'key.pem';

if (fs.existsSync(CERT_PATH) && fs.existsSync(KEY_PATH)) {
    sslOptions = {
        key: fs.readFileSync(KEY_PATH),
        cert: fs.readFileSync(CERT_PATH)
    };
}

// Start HTTP server
app.listen(HTTP_PORT, () => {
    console.log(`HTTP server running at http://localhost:${HTTP_PORT}`);
});

// Start HTTPS server if certificates are available
if (sslOptions) {
    https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
        console.log(`HTTPS server running at https://localhost:${HTTPS_PORT}`);
    });
} else {
    console.log(`Warning: SSL certificates not found at ${CERT_PATH} and ${KEY_PATH}`);
    console.log('HTTPS server not started. For Cloudflare SSL:');
    console.log('  - Use Flexible SSL mode in Cloudflare (connects via HTTP)');
    console.log('  - Or add SSL certificates and restart the server');
}
