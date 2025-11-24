import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginUser } from 'Api/services/auth/indexAuth';
import { getAllEntities } from 'Api/services/entities/indexEntitis';
import { getAllUsers } from 'Api/services/entities_manager/indexEntitiesManager';
import { UserSessionService } from '../../services/session/user-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage implements OnInit {

  darkMode = false;
  

  constructor(
    private router: Router,
    private userSession: UserSessionService
  ) { }
  
  ngOnInit(): void {
    this.checkAppMode();
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    // const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    console.log(checkIsDarkMode);
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  async onCreateAccountClick() {
    try {
      const response = await getAllUsers();
      console.log('response:', response);
    } catch (error) {
      console.error('Error al obtener las entidades:', error);
    }
  }

  async onLoginClick() {
    try {
      if (!this.email || !this.password) {
        console.log('Falta información');
        return;
      }

      const resp = await loginUser({ email: this.email, password: this.password });
      console.log('resp:', resp); 

      if (resp.status) {
        const token = resp?.data?.token;
        const user = resp?.data?.user;  
        if (token) {
          // 🔐 Guardar token en localStorage
          localStorage.setItem('authToken', token);
        }
        if (user) {
          this.userSession.setUser(user); // 💾 Guardamos el usuario en el servicio de sesión
        }

        this.router.navigate(['/intro']);
      } else {
        console.log('Error al iniciar sesión:', resp.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

}
