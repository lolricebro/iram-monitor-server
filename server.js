const WebSocket = require('ws');

const port = 8080; // Fixed port for ngrok

const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    // Broadcast to all connected monitors
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server running on port ${port}`);
console.log('Waiting for connections...');
