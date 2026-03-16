const express = require('express');
const path = require('path');

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3000;

// Serve static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// /up endpoint that returns JSON with status 200
app.get('/up', (req, res) => {
    res.status(200).json({ status: "OK" });
});

// Start HTTP server
app.listen(HTTP_PORT, () => {
    console.log(`HTTP server running at http://localhost:${HTTP_PORT}`);
});
