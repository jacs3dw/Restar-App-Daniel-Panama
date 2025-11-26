// user-loader.service.ts
import { Injectable } from '@angular/core';
import { UserLogged, UserSessionService } from 'src/app/pages/services/session/user-session.service';
import { getperfills } from '../entities_manager/indexEntitiesManager';

@Injectable({
  providedIn: 'root'
})
export class UserLoaderService {

  constructor(private userSession: UserSessionService) {}

  async loadUserFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return; // No hay token, no hay usuario
    }
    console.log('token:', token);
    try {
      const resp = await getperfills();
      if (resp.status && resp.data) {
        const user = resp.data; // Ajusta según estructura real

        const mappedUser: UserLogged = {
          id: user.id,
          full_name: user.full_name || user.name || '',
          phone: user.phone || '',
          email: user.email || '',
          country: user.country || '',
          role_id: user.role_id || '',
          role: user.role || null
        };

        this.userSession.setUser(mappedUser);
      } else {
        // Token inválido o expirado
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error al cargar perfil de usuario:', error);
      localStorage.removeItem('token');
    }
  }
}
