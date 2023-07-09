import { handleRegistration } from '../requestHandlers/handleRegistration';

export const giveRegResponse = (
  enteredName: string,
  enteredPassword: string,
) => {
  const regResult = handleRegistration(enteredName, enteredPassword);
  const response = {
    type: 'reg',
    data: JSON.stringify(regResult),
    id: 0,
  };
  return JSON.stringify(response);
};
