const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// /up endpoint that returns JSON with status 200
app.get('/up', (req, res) => {
    res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
