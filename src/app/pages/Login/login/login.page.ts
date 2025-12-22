import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { generateCode, LoginCode, loginUser } from 'Api/services/auth/indexAuth';
import { getAllUsers } from 'Api/services/entities_manager/indexEntitiesManager';
import { UserSessionService } from '../../services/session/user-session.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  darkMode = false;

  email: string = '';
  code: string = '';
  codeSent: boolean = false;

  constructor(
    private router: Router,
    private userSession: UserSessionService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.checkAppMode();
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  async onGenerateCode() {
  try {
    if (!this.email) {
      await this.showErrorModal('Debes ingresar un correo');
      return;
    }

    const resp = await generateCode({ email: this.email });
    console.log('generateCode:', resp);

    if (!resp?.status) {
      await this.showErrorModal(resp?.message || 'No se pudo enviar el código');
      return;
    }

    this.codeSent = true;

  } catch (error) {
    console.error(error);
    await this.showErrorModal('Error al generar el código');
  }
}


  async onCreateAccountClick() {
    try {
      const response = await getAllUsers();
      console.log('response:', response);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
  async showErrorModal(message: string) {
  const alert = await this.alertController.create({
    header: 'Error de inicio de sesión',
    message: message || 'No fue posible iniciar sesión',
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


  async onLoginWithCode() {
  try {
    if (!this.code || this.code.length !== 4) {
      await this.showErrorModal('El código debe tener 4 dígitos');
      return;
    }

    const resp = await LoginCode({
      email: this.email,
      code: this.code
    });

    console.log('loginCode:', resp);

    if (!resp?.status) {
      await this.showErrorModal(resp?.message || 'Código inválido');
      return;
    }

    const token = resp?.data?.token;
    const user = resp?.data?.user;

    if (!token || !user) {
      await this.showErrorModal('Respuesta inválida del servidor');
      return;
    }

    localStorage.setItem('token', token);

    this.userSession.setUser({
      id: user.id,
      full_name: user.full_name || user.name || '',
      phone: user.phone || '',
      email: user.email || '',
      country: user.country || '',
      role_id: user.role_id || '',
      role: user.role || null
    });

    this.router.navigate(['/intro']);

  } catch (error) {
    console.error(error);
    await this.showErrorModal('Error de conexión con el servidor');
  }
}


}
