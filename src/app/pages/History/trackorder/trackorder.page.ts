import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

type TrackingStatus = 'done' | 'current' | 'pending';

interface TrackingStep {
  date: string;
  time: string;
  title: string;
  address: string;
  status: TrackingStatus;
}

interface TrackingInfo {
  shippingId: string;
  steps: TrackingStep[];
}

interface OrderDetail {
  id: number;
  imageUrl: string;
  title: string;
  link: string;
  description: string;
}

@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.page.html',
  styleUrls: ['./trackorder.page.scss'],
  standalone: false,
})
export class TrackorderPage implements OnInit {

  darkMode = false;

  // mock trackings (igual que antes)
  private mockTrackings: TrackingInfo[] = [
    {
      shippingId: '97847548956',
      steps: [
        { date: 'May 21', time: '12:50', title: 'Package has been received', address: 'W Market Rd, Gouripur 3517', status: 'done' },
        { date: 'May 19', time: '13:00', title: 'Accept by Wedx', address: 'W Market Rd, Gouripur 3517', status: 'done' },
      ],
    },
    {
      shippingId: '55555555555',
      steps: [
        { date: 'Jun 10', time: '09:30', title: 'Package in transit', address: 'Main Street 123, City', status: 'done' },
        { date: 'Jun 09', time: '16:10', title: 'Package picked up', address: 'Warehouse 45, City', status: 'done' },
      ],
    },
  ];

  // mock orders (datos de la segunda vista)
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

  trackingInfo: TrackingInfo | null = null;
  orderDetails: OrderDetail | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAppMode();
    this.loadTrackingById('97847548956');
    this.loadOrderDetails(1); // carga datos del "order details"
  }

  loadTrackingById(shippingId: string) {
    const found = this.mockTrackings.find((t) => t.shippingId === shippingId) || null;
    this.trackingInfo = found;
  }

  loadOrderDetails(id: number) {
    const found = this.mockOrders.find((o) => o.id === id) || null;
    this.orderDetails = found;
  }

  goBack() {
    // redirige a history (ajusta si prefieres /tabs/home u otra ruta)
    this.router.navigateByUrl('/tabs/history');
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }
}
