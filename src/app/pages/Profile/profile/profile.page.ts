import { Component, OnInit } from '@angular/core';
import { UserSessionService, UserLogged } from '../../services/session/user-session.service';
import { updatePerfil } from 'Api/services/entities_manager/indexEntitiesManager';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserLoaderService } from 'Api/services/auth/user-loader.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
async showErrorModal(message: string) {
  const alert = await this.alertController.create({
    header: 'Error',
    message: message || 'Ocurrió un error inesperado',
    buttons: [
      {
        text: 'Aceptar',
        role: 'confirm',
      }
    ],
    backdropDismiss: false
  });

  await alert.present();
}

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
    private alertController: AlertController,
    private userLoader: UserLoaderService,

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
    await this.showErrorModal('No se pudo identificar al usuario');
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

    if (!resp?.status) {
      await this.showErrorModal(resp?.message || 'Error al actualizar el perfil');
      return;
    }

    // ✅ vuelve a pedir el perfil actualizado al backend
    await this.userLoader.loadUserFromToken();

    // vuelve a leer el usuario desde sesión
    this.user = this.userSession.getUser();

    if (this.user?.full_name) {
      this.initial = this.user.full_name.charAt(0).toUpperCase();
    }

    this.router.navigate(['/tabs/home']);


  } catch (error) {
    console.error('Error inesperado al actualizar perfil:', error);
    await this.showErrorModal('Error de conexión con el servidor');
  }
}


}
