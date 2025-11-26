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

  constructor() {
    // Ya NO cargamos desde localStorage
    // Solo vive en memoria mientras la app está abierta
  }

  setUser(user: UserLogged) {
    this._user = user;
    // Ya NO:
    // localStorage.setItem('userData', JSON.stringify(user));
  }

  getUser(): UserLogged | null {
    return this._user;
  }

  getUserName(): string {
    return this._user?.full_name ?? '';
  }

  clearSession() {
    this._user = null;
    // Puedes limpiar token aquí si quieres cerrar sesión
    localStorage.removeItem('token');
  }
}
