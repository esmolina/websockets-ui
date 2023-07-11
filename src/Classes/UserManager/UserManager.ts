import { UserID, UserInterface } from '../types';
import { WebSocket } from 'ws';

//Singleton pattern
export class UserManager {
  private static instance: UserManager;

  private _users: Array<UserInterface> = [];
  private _passwords: Map<UserID, string> = new Map(); // passwords Map ([key: user.id, value: user password], ...)
  private _connectedUsers: Map<UserID, WebSocket> = new Map(); // connectedUsers Map ([key: user.id, value: websocket of connected user], ...)
  private _lastUserId = 0;

  private constructor() {}

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }

    return UserManager.instance;
  }

  public getUser = (name: string): UserInterface | undefined => {
    return this._users.find((user: UserInterface) => user.name === name);
  };

  public checkPassword = (userId: UserID, enteredPassword: string): boolean => {
    const rightPassword = this._passwords.get(userId);
    return rightPassword === enteredPassword;
  };

  public updateUser = (userId: UserID, currentWebsocket: WebSocket): void => {
    this._connectedUsers.set(userId, currentWebsocket);
  };

  public addUser = (
    enteredName: string,
    enteredPassword: string,
    socket: WebSocket,
  ): UserInterface => {
    const newUserId = this._lastUserId;
    const newUser = {
      id: newUserId,
      name: enteredName,
    };
    this._users.push(newUser);
    this._passwords.set(newUserId, enteredPassword);
    this._connectedUsers.set(newUserId, socket);
    this._lastUserId++;
    return newUser;
  };
}
