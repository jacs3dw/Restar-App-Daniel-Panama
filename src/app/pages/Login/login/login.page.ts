import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginUser } from 'Api/services/auth/indexAuth';
import { getAllUsers } from 'Api/services/entities_manager/indexEntitiesManager';
import { UserSessionService } from '../../services/session/user-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  darkMode = false;

  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private userSession: UserSessionService
  ) {}

  ngOnInit(): void {
    this.checkAppMode();
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onCreateAccountClick() {
    try {
      const response = await getAllUsers();
      console.log('response:', response);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }

  async onLoginClick() {
    try {
      if (!this.email || !this.password) {
        console.log('Falta información');
        return;
      }

      const resp = await loginUser({ email: this.email, password: this.password });
      console.log('resp login:', resp);

      if (resp.status) {

        const token = resp?.data?.token;
        const user = resp?.data?.user;

        if (token) {
          localStorage.setItem('token', token);
        }

        if (user) {
          const mappedUser = {
            id: user.id,
            full_name: user.full_name || user.name || '',
            phone: user.phone || '',
            email: user.email || '',
            country: user.country || '',
            role_id: user.role_id || '',
            role: user.role || null
          };

          console.log("Usuario mapeado:", mappedUser);

          this.userSession.setUser(mappedUser);
        }

        this.router.navigate(['/intro']);

      } else {
        console.log('Error al iniciar sesión:', resp.message);
      }

    } catch (error) {
      console.error('Error en login:', error);
    }
  }
}
