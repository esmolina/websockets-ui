import { users } from '../../dataBase';
import { registrationAnswerInterface, userInterface } from '../../types';

export const handleRegistration = (
  enteredName: string,
  enteredPassword: string,
): registrationAnswerInterface => {
  const existingUser = users.find(
    (user: userInterface) => user.name === enteredName,
  );
  if (existingUser) {
    if (existingUser.password === enteredPassword) {
      return {
        name: enteredName,
        index: users.indexOf(existingUser),
        error: false,
        errorText: '',
      };
    } else {
      return {
        name: enteredName,
        index: users.indexOf(existingUser),
        error: true,
        errorText: 'Incorrect password',
      };
    }
  }
  const newUser = {
    name: enteredName,
    password: enteredPassword,
  };
  users.push(newUser);

  return {
    name: enteredName,
    index: users.length - 1,
    error: false,
    errorText: '',
  };
};
