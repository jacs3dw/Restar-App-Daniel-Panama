import { Component, OnInit } from '@angular/core';
import { UserSessionService, UserLogged } from '../../services/session/user-session.service';
import { updatePerfil } from 'Api/services/entities_manager/indexEntitiesManager';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  darkMode = false;
  user: UserLogged | null = null;

  initial: string = ''; 
  formUser: {
    full_name: string;
    phone: string;
    email: string;
    country: string;
    role_id: string;
  } = {
    full_name: '',
    phone: '',
    email: '',
    country: '',
    role_id: ''
  };

  constructor(
    private userSession: UserSessionService,
    private router: Router,
    private alertController: AlertController
  ) {}  

  ngOnInit(): void {
    this.checkAppMode();
    this.loadUser();
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  loadUser() {
    this.user = this.userSession.getUser();
    console.log("Usuario cargado en profile:", this.user);

    if (this.user) {
      this.formUser = {
        full_name: this.user.full_name || '',
        phone: this.user.phone || '',
        email: this.user.email || '',
        country: this.user.country || '',
        role_id: this.user.role_id || ''
      };

      this.initial = this.formUser.full_name
        ? this.formUser.full_name.charAt(0).toUpperCase()
        : '?';
    }
  }

  
  updateInitial() {
    this.initial = this.formUser.full_name
      ? this.formUser.full_name.charAt(0).toUpperCase()
      : '?';
  }

  logout() {
    // this.userSession.setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  
  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro que deseas cerrar tu sesión?',
      cssClass: 'logout-alert',
  
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.logout();
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  async onSubmitChanges() {
    if (!this.user?.id) {
      console.error('No hay ID de usuario para actualizar.');
      return;
    }

    try {
      const body = {
        full_name: this.formUser.full_name,
        phone: this.formUser.phone,
        email: this.formUser.email,
        country: this.formUser.country,
        role_id: this.formUser.role_id,
      };

      const resp = await updatePerfil(this.user.id, body);
      console.log('Respuesta updatePerfil:', resp);

      if (resp.status) {
        const updatedUser: UserLogged = {
          ...this.user,
          ...body,
        };

        this.userSession.setUser(updatedUser);
        this.user = updatedUser;

      
        this.initial = body.full_name.charAt(0).toUpperCase();

        console.log('Perfil actualizado correctamente');

        this.router.navigate(['/tabs/home']);
      } else {
        console.error('Error al actualizar perfil:', resp.message);
      }
    } catch (error) {
      console.error('Error inesperado al actualizar perfil:', error);
    }
  }

}
