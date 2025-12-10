import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone:false,
})
export class TabsPage implements OnInit {

  selectTab: any;
  @ViewChild('tabs',{static:false})
  tabs!: IonTabs;

  darkMode = false;

  constructor(public router:Router) { }

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

  selectStatus() {
    this.router.navigate(['/tabs/history']);
    this.selectTab = 'history'; // activa efecto visual
  }  
 
  setCurrentTab() {
    this.selectTab = this.tabs.getSelected();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

}
