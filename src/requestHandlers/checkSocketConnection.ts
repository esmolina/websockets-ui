import { WebSocket } from 'ws';

export const checkSocketConnection = (
  sockets: Array<WebSocket>,
): string | WebSocket | undefined => {
  if (sockets.every((socket) => socket.readyState === WebSocket.OPEN))
    return 'all socked';
  let disconnectedSocket;
  for (let i = 0; i < sockets.length; i++) {
    if (sockets[i].readyState !== WebSocket.OPEN) {
      disconnectedSocket = sockets[i];
      break;
    }
  }

  return disconnectedSocket;
};
