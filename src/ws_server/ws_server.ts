import * as WebSocket from 'ws';
import { handleRegistration } from '../requestHandlers/handleRegistration';
import { giveRegResponse } from '../ws_server_responses/reg_response';

export const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const request = JSON.parse(message.toString());
      switch (request.type) {
        case 'reg':
          ws.send(giveRegResponse(request.data.name, request.data.password));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
});

wsServer.on('error', (error) => {
  console.error('WebSocket server error:', error);
});
