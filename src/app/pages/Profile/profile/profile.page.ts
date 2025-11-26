import { Component, OnInit } from '@angular/core';
import { UserSessionService, UserLogged } from '../../services/session/user-session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone:false,
})
export class ProfilePage implements OnInit {

  darkMode = false;
  user: UserLogged | null = null;

  constructor(private userSession: UserSessionService) {}

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
  }
}
