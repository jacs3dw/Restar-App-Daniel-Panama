import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { getproducto } from 'Api/services/entities_manager/indexEntitiesManager';
// Y los tipos de tu ResponseApp si los necesitas
// import { ResponseApp } from 'ruta/del/tipo';

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
    // Leer el id de la URL: /orderdetails/:id
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      // Si no hay id, regresamos o mostramos error
      this.goBack();
      return;
    }

    await this.loadOrderDetails(id);
  }

  private async loadOrderDetails(id: string) {
    try {
      this.loading = true;

      const resp = await getproducto(id);
      // resp.data es el objeto que mostraste en el ejemplo
      const product = resp.data;

      // Mapeamos lo que viene del backend al modelo que usa la vista
      this.orderDetails = {
        id: product.id,
        imageUrl: product.image,    // <- del backend: image
        title: product.title,       // <- del backend: title
        link: product.url,          // <- del backend: url
        description: product.description, // <- del backend: description
      };

    } catch (error) {
      console.error('Error al cargar el producto', error);
      // si quieres, puedes mostrar un toast o navegar de vuelta
      this.goBack();
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigateByUrl('/tabs/home');
  }
}
