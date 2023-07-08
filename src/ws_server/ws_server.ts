import * as WebSocket from 'ws';
import { handleRegistration } from '../requestHandlers/handleRegistration';

export const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const request = JSON.parse(message.toString());
      if (request.type === 'reg') {
        const regResult = handleRegistration(
          request.data.name,
          request.data.password,
        );
        const response = {
          type: 'reg',
          data: JSON.stringify(regResult),
          id: 0,
        };
        ws.send(JSON.stringify(response));
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
});

wsServer.on('error', (error) => {
  console.error('WebSocket server error:', error);
});
