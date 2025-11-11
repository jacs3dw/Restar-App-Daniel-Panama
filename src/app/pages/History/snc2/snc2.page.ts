import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snc2',
  templateUrl: './snc2.page.html',
  styleUrls: ['./snc2.page.scss'],
  standalone:false,
})
export class Snc2Page implements OnInit {

  darkMode = false;

  constructor() { }
  
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

}
