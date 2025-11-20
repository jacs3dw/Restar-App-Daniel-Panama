import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface OrderDetail {
  id: number;
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

  // Simulamos el backend con un array
  private mockOrders: OrderDetail[] = [
    {
      id: 1,
      imageUrl: '../../../../assets/image/Foto.png',
      title: 'Horem ipsum dolor sit amet, consectetur adipiscing elit.',
      link: 'https://dominio.com/jddlsdfdd...',
      description: `Rorem ipsum dolor sit amet, consectetur adipiscing elit.  
Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
Rorem ipsum dolor sit amet, consectetur adipiscing elit.  
Nunc vulputate libero et velit interdum, ac aliquet odio mattis.`,
    },
    {
      id: 2,
      imageUrl: '../../../../assets/image/Foto.png',
      title: 'Otro pedido con datos distintos',
      link: 'https://dominio.com/otro-pedido',
      description: `Descripción del segundo pedido simulada desde el array.`,
    },
  ];

  // El objeto que usa la vista
  orderDetails: OrderDetail | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Aquí simulas que “llamas al backend” para traer el pedido 1
    this.loadOrderDetails(1);
  }

  // Función que simula la llamada al backend
  loadOrderDetails(id: number) {
    // aquí podrías meter setTimeout para simular delay si quieres
    const found = this.mockOrders.find((o) => o.id === id) || null;
    this.orderDetails = found;
  }

  goBack() {
    this.router.navigateByUrl('/tabs/home');
  }
}
