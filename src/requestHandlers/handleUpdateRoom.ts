import { WebSocket } from 'ws';
import { giveUpdateMessage } from './giveUpdateMessage';
import { wsServer } from '../ws_server/ws_server';

export const handleUpdateRoom = () => {
  const updateMessage = giveUpdateMessage();
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(updateMessage));
    }
  });
};
