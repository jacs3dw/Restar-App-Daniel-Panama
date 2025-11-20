import { Component, OnInit } from '@angular/core';

interface ShippingOption {
  id: string;
  name: string;           // Fast Delivery Services, USB Express Ltd., etc.
  price: number;          // 48.00, 64.00, etc. (si ya no lo usas, luego lo quitamos)
  rating: number;         // 4.8
  hasTracking: boolean;   // true/false
  isRecommended?: boolean; // para saber cuál usar en el botón
  url: string;            // 🔹 nueva propiedad
}

@Component({
  selector: 'app-cp4',
  templateUrl: './cp4.page.html',
  styleUrls: ['./cp4.page.scss'],
  standalone:false,
})
export class Cp4Page implements OnInit {

  darkMode = false;

  // 🔹 Aquí la lista que luego vendrá del backend
  shippingOptions: ShippingOption[] = [];

  constructor() { }
  
  ngOnInit(): void {
    this.checkAppMode();
    this.loadShippingOptions(); // simula carga inicial
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  // 🔹 Simulación (mock). Aquí luego conectas con tu API
  loadShippingOptions() {
    this.shippingOptions = [
      {
        id: 'fast',
        name: 'Fast Delivery Services',
        price: 48.00,
        rating: 4.8,
        hasTracking: true,
        isRecommended: true,        // esta será la del botón
        url: 'www.fastdelivery.com',
      },
      {
        id: 'usb-express',
        name: 'USB Express Ltd.',
        price: 64.00,
        rating: 4.8,
        hasTracking: true,
        url: 'www.usbexpress.com',
      },
      {
        id: 'fox',
        name: 'Fox Parcel',
        price: 60.00,
        rating: 4.8,
        hasTracking: true,
        url: 'www.foxparcel.com',
      },
      {
        id: 'Nox',
        name: 'Nox',
        price: 58.00,
        rating: 4.3,
        hasTracking: true,
        url: 'www.noxshipping.com',
      },
    ];
  }

  // 🔹 Opción recomendada (para el texto del botón)
  get recommendedOption(): ShippingOption | undefined {
    return this.shippingOptions.find(o => o.isRecommended) || this.shippingOptions[0];
  }

}
