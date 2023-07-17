import { handleRegistration } from './handleRegistration';
import { WebSocket } from 'ws';

export const giveRegResponse = (
  enteredName: string,
  enteredPassword: string,
  currentWebSocket: WebSocket,
) => {
  const regResult = handleRegistration(
    enteredName,
    enteredPassword,
    currentWebSocket,
  );
  const response = {
    type: 'reg',
    data: JSON.stringify(regResult),
    id: 0,
  };
  return JSON.stringify(response);
};
