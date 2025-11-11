import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  standalone:false,
})
export class FaqPage implements OnInit {

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

  selectedseg: string = 'FAQ';
  selectTab(event: CustomEvent) {
    this.selectedseg = event.detail.value;
  }

  items = [
    { label: 'Delivery', focused: true },
    { label: 'Order', focused: false },
    { label: 'Receive', focused: false },
    { label: 'Courrier', focused: false }
  ];

  onFocus(index: number) {
    this.items.forEach((item, i) => {
      item.focused = i === index;
    });
  }

  s1: boolean = true;
  sets1() {
    this.s1 = !this.s1;
  }

  s2: boolean = false;
  sets2() {
    this.s2 = !this.s2;
  }

  s3: boolean = false;
  sets3() {
    this.s3 = !this.s3;
  }

  s4: boolean = false;
  sets4() {
    this.s4 = !this.s4;
  }

  s5: boolean = false;
  sets5() {
    this.s5 = !this.s5;
  }


}
