import { WebSocket } from 'ws';

export const checkSocketConnection = (socket: WebSocket): boolean => {
  return socket.readyState === WebSocket.OPEN;
  // ToDo если не онлайн, завершить игру и признать техническое поражение
};
