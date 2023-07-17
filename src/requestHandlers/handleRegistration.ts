import { WebSocket } from 'ws';
import { registrationResponseInterface } from './types';
import { UserManager } from '../Classes/UserManager/UserManager';

export const handleRegistration = (
  enteredName: string,
  enteredPassword: string,
  currentWebsocket: WebSocket,
): registrationResponseInterface => {
  const userManager = UserManager.getInstance();

  // reg.data verification
  if (enteredName.length < 5) {
    return {
      name: '',
      index: -1,
      error: true,
      errorText: 'Name should be at least 5 characters long',
    };
  }

  if (enteredPassword.length < 5) {
    return {
      name: '',
      index: -1,
      error: true,
      errorText: 'Password should be at least 5 characters long',
    };
  }

  let user = userManager.getUserByName(enteredName);

  if (user) {
    if (userManager.checkPassword(user.id, enteredPassword)) {
      userManager.updateUser(user.id, currentWebsocket);
    } else {
      return {
        name: user.name,
        index: user.id,
        error: true,
        errorText: 'Incorrect password',
      };
    }
  } else {
    user = userManager.addUser(enteredName, enteredPassword, currentWebsocket);
  }

  return {
    name: user.name,
    index: user.id,
    error: false,
    errorText: '',
  };
};
