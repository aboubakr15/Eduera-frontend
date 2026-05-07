console.log('Starting server.js...');
console.log('__dirname:', __dirname);
console.log('PORT env:', process.env.PORT);
console.log('NODE_ENV env:', process.env.NODE_ENV);

const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

const BACKEND_URL = process.env.BACKEND_URL || 'https://graduation-project-production-be44.up.railway.app';
console.log('Backend URL:', BACKEND_URL);

function proxyRequest(req, res) {
  const url = BACKEND_URL + req.originalUrl.replace('/api', '');
  console.log(`Proxying ${req.method} ${req.originalUrl} -> ${url}`);

  const protocol = url.startsWith('https') ? https : http;

  const proxyReq = protocol.request(url, {
    method: req.method,
    headers: {
      ...req.headers,
      host: new URL(BACKEND_URL).host,
    },
  }, (proxyRes) => {
    res.status(proxyRes.statusCode);
    proxyRes.headers && Object.entries(proxyRes.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err.message);
    res.status(502).send('Bad Gateway');
  });

  req.pipe(proxyReq);
}

app.use('/api', proxyRequest);
app.use('/token', proxyRequest);
app.use('/auth', proxyRequest);

// Check if build folder exists
const buildPath = path.join(__dirname, 'build');
console.log('Checking for build folder at:', buildPath);
console.log('Build folder exists:', fs.existsSync(buildPath));

if (fs.existsSync(buildPath)) {
  const files = fs.readdirSync(buildPath);
  console.log('Build folder contents:', files);
  const indexPath = path.join(buildPath, 'index.html');
  console.log('index.html exists:', fs.existsSync(indexPath));
}

if (!fs.existsSync(buildPath)) {
  console.error('ERROR: build folder not found at', buildPath);
  process.exit(1);
}

// Serve static files from the build directory
app.use(express.static(buildPath));

// Handle SPA routing - serve index.html for all non-file routes
app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('index.html not found at', indexPath);
    return res.status(500).send('index.html not found in build folder');
  }
  res.sendFile(indexPath);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', buildExists: fs.existsSync(buildPath) });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack || err);
  res.status(500).send('Internal Server Error');
});

const server = app.listen(PORT, () => {
  console.log(`Server successfully started on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Build path: ${buildPath}`);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
