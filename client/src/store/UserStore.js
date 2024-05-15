import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = true;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setIsUser(user) {
    this._user = user;
  }

  get IsAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
