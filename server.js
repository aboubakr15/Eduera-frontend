const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle SPA routing - serve index.html for all non-file routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes or specific file requests
  if (req.path.startsWith('/api') || req.path.includes('.')) {
    res.status(404).send('Not Found');
    return;
  }
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
