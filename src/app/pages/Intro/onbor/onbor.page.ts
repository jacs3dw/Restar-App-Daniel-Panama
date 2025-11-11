import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onbor',
  templateUrl: './onbor.page.html',
  styleUrls: ['./onbor.page.scss'],
  standalone:false,
})
export class OnborPage implements OnInit {

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
