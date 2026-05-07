console.log('Starting server.js...');
console.log('__dirname:', __dirname);
console.log('PORT env:', process.env.PORT);
console.log('NODE_ENV env:', process.env.NODE_ENV);

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

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
