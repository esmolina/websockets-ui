import * as WebSocket from 'ws';
import { giveRegResponse } from '../requestHandlers/giveRegResponse';
import { handleCreateRoom } from '../requestHandlers/handleCreateRoom';
import { handleAddUserToRoom } from '../requestHandlers/handleAddUserToRoom';
import { giveCreateGameResponse } from '../requestHandlers/giveCreateGameResponse';
import { handleUpdateRoom } from '../requestHandlers/handleUpdateRoom';

export const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const request = JSON.parse(message.toString());
      switch (request.type) {
        case 'reg':
          const requestData = JSON.parse(request.data.toString());
          ws.send(giveRegResponse(requestData.name, requestData.password, ws));
          handleUpdateRoom();
          break;
        case 'create_room':
          handleCreateRoom(ws);
          break;
        case 'add_user_to_room':
          const requestRoomId = JSON.parse(request.data.toString()).indexRoom;
          handleAddUserToRoom(requestRoomId, ws);
          giveCreateGameResponse(requestRoomId);
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
