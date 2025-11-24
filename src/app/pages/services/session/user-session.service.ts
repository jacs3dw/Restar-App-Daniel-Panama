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

  // Guardar el usuario en memoria
  setUser(user: UserLogged) {
    this._user = user;
  }

  // Obtener el usuario actual
  getUser(): UserLogged | null {
    return this._user;
  }

  // Obtener solo el nombre completo
  getUserName(): string {
    return this._user?.full_name ?? '';
  }

  // Limpiar sesión (por si haces logout)
  clearSession() {
    this._user = null;
  }
}
