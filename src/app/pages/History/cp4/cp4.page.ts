import { Component, OnInit } from '@angular/core';
import { getCarrito } from 'Api/services/entities_manager/indexEntitiesManager';

interface ShippingOption {
  id: string;
  name: string;           // Fast Delivery Services, USB Express Ltd., etc.
  price: number;          // 48.00, 64.00, etc. (si ya no lo usas, luego lo quitamos)
  hasTracking: boolean;   // true/false
  isRecommended?: boolean; // para saber cuál usar en el botón
  url: string;            // 🔹 nueva propiedad
}

@Component({
  selector: 'app-cp4',
  templateUrl: './cp4.page.html',
  styleUrls: ['./cp4.page.scss'],
  standalone: false,
})
export class Cp4Page implements OnInit {

  darkMode = false;

  // Lista que viene ahora del backend
  shippingOptions: ShippingOption[] = [];

  constructor() { }
  
  ngOnInit(): void {
    this.checkAppMode();
    this.loadShippingOptions(); // carga inicial desde el backend
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  // 🔹 AHORA usa getCarrito en lugar de mock
  async loadShippingOptions() {
    try {
      const resp = await getCarrito();   // llama a la API

      if (resp.status && Array.isArray(resp.data)) {
        this.shippingOptions = resp.data.map((item: any, index: number) => {
          const product = item.product || {};

          return {
            id: item.id,                                      // id del carrito
            name: product.title || 'Producto sin título',     // título del producto
            price: Number(product.price || 0),                // precio numérico
            hasTracking: true,                                // por ahora fijo
            isRecommended: index === 0,                       // el primero como recomendado
            url: product.url || '',                           // url del producto
          } as ShippingOption;
        });
      } else {
        this.shippingOptions = [];
      }

    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      this.shippingOptions = [];
    }
  }

  // 🔹 Opción recomendada (para el texto del botón)
  get recommendedOption(): ShippingOption | undefined {
    return this.shippingOptions.find(o => o.isRecommended) || this.shippingOptions[0];
  }

}
