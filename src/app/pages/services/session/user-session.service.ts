import { Injectable } from '@angular/core';

export interface UserRole {
  id: string;
  name: string;
}

export interface UserLogged {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  country: string;
  role_id: string;
  role?: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private _user: UserLogged | null = null;

  constructor() {}

  setUser(user: UserLogged) {
    this._user = user;
  }

  getUser(): UserLogged | null {
    return this._user;
  }

  getUserName(): string {
    return this._user?.full_name ?? '';
  }

  // 🔥🔥🔥 ÚNICO MÉTODO NUEVO — NO AFECTA NADA DEL CARRITO
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearSession() {
    this._user = null;
    localStorage.removeItem('token');
  }
}
