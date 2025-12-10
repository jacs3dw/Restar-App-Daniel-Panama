import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { getproducto } from 'Api/services/entities_manager/indexEntitiesManager';

interface OrderDetail {
  id: string;
  imageUrl: string;
  title: string;
  link: string;
  description: string;
}

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class OrderdetailsPage implements OnInit {

  orderDetails: OrderDetail | null = null;
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.goBack();
      return;
    }

    await this.loadOrderDetails(id);
  }

  private async loadOrderDetails(id: string) {
    try {
      this.loading = true;

      const resp = await getproducto(id);
      const product = resp.data;

      this.orderDetails = {
        id: product.id,
        imageUrl: product.image,
        title: product.title,
        link: product.url,
        description: product.description,
      };

    } catch (error) {
      console.error('Error al cargar el producto', error);
      this.goBack();
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigateByUrl('/tabs/home');
  }

  // 🟩 AGREGADO — ENVIAR EL OBJETO REAL A TRACKORDER
  goToTrackOrder() {
    if (!this.orderDetails) return;

    this.router.navigate(['/trackorder'], {
      state: { order: this.orderDetails }
    });
  }
}
