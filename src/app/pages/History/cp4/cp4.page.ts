import { Component, OnInit } from '@angular/core';
import { getCarrito, removeCarrito } from 'Api/services/entities_manager/indexEntitiesManager';

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  hasTracking: boolean;
  isRecommended?: boolean;
  url: string;
}

@Component({
  selector: 'app-cp4',
  templateUrl: './cp4.page.html',
  styleUrls: ['./cp4.page.scss'],
  standalone: false,
})
export class Cp4Page implements OnInit {

  darkMode = false;

  shippingOptions: ShippingOption[] = [];
  totalCarrito: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.checkAppMode();
    this.loadShippingOptions();
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  async loadShippingOptions() {
    try {
      const resp = await getCarrito();

      if (resp.status && Array.isArray(resp.data)) {
        this.shippingOptions = resp.data.map((item: any, index: number) => {
          const product = item.product || {};

          return {
            id: item.id,
            name: product.title || 'Producto sin título',
            price: Number(product.price || 0),
            hasTracking: true,
            isRecommended: index === 0,
            url: product.url || ''
          } as ShippingOption;
        });

        this.totalCarrito = this.shippingOptions.reduce((sum, item) => sum + item.price, 0);

        localStorage.setItem("orderAmount", this.totalCarrito.toString());

      } else {
        this.shippingOptions = [];
        this.totalCarrito = 0;
      }

    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      this.shippingOptions = [];
      this.totalCarrito = 0;
    }
  }

  // 🔹 MÉTODO QUE AGREGO EXACTAMENTE COMO ME PEDISTE
  async removeItem(optionId: string) {
    try {
      const resp = await removeCarrito(optionId);

      if (resp.status) {
        // Quitar visualmente el producto
        this.shippingOptions = this.shippingOptions.filter(item => item.id !== optionId);

        // Recalcular total
        this.totalCarrito = this.shippingOptions.reduce((sum, item) => sum + item.price, 0);

        localStorage.setItem("orderAmount", this.totalCarrito.toString());
      }
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  }

  get recommendedOption(): ShippingOption | undefined {
    return this.shippingOptions.find(o => o.isRecommended) || this.shippingOptions[0];
  }

}
