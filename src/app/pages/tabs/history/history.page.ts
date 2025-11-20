import { Component, OnInit } from '@angular/core';



interface Delivery {
  status: 'Pending' | 'Completed' | 'On the way' | string;
  statusColor?: string;

  // 👇 Nuevos campos para igualarse a "shipments"
  title: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: false,
})
export class HistoryPage implements OnInit {

  darkMode = false;

  items = [
    { label: 'All',        value: 'ALL',       focused: true  },
    { label: 'Completed',  value: 'COMPLETED', focused: false },
    { label: 'Pending',    value: 'PENDING',   focused: false },
  ];

  // 🔹 Lista base (simula backend)
  deliveries: Delivery[] = [];

  constructor() {}

  ngOnInit(): void {
    this.checkAppMode();
    this.loadDeliveries(); // simula carga de backend
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  // 🔹 Simulación. Luego aquí llamas a tu API y mapeas al formato Delivery
  loadDeliveries() {
    this.deliveries = [
      {
        status: 'Completed',
        statusColor: '#3AC479',
        title: 'Package from Amsterdam to New York',
        url: 'www.fastdelivery.com/track/1247848754',
        description: 'Your package is being processed and will be shipped soon.',
      },
      {
        status: 'Pending',
        statusColor: '#4CAF50',
        title: 'Order delivered to Paris',
        url: 'www.fastdelivery.com/track/8744552211',
        description: 'This shipment has been successfully delivered to the recipient.',
      },
      {
        status: 'Pending',
        statusColor: '#2196F3',
        title: 'Shipment en route to Lisbon',
        url: 'www.fastdelivery.com/track/9981237777',
        description: 'Your package is on the way and will arrive very soon.',
      },
    ];
  }

  // 🔹 Manejo del foco en los chips
  onFocus(index: number) {
    this.items.forEach((item, i) => {
      item.focused = i === index;
    });
  }

  // 🔹 Saber qué filtro está seleccionado
  get selectedFilter(): 'ALL' | 'COMPLETED' | 'PENDING' {
    const focusedItem = this.items.find(i => i.focused);
    return (focusedItem?.value as any) || 'ALL';
  }

  // 🔹 Lista filtrada que usará el HTML
  get filteredDeliveries(): Delivery[] {
    if (this.selectedFilter === 'ALL') {
      return this.deliveries;
    }
    if (this.selectedFilter === 'COMPLETED') {
      return this.deliveries.filter(d => d.status === 'Completed');
    }
    if (this.selectedFilter === 'PENDING') {
      return this.deliveries.filter(d => d.status === 'Pending');
    }
    return this.deliveries;
  }

  // 🔹 Navegación al detalle (si quieres replicar /trackorder)
  goToTrackOrder(delivery: Delivery) {
    // aquí navegas al detalle, por ejemplo usando Router
    // this.router.navigate(['/trackorder', delivery.trackingNumber]);
  }

  // 🔹 Click en "I want to delete"
  onDeleteDelivery(event: Event, delivery: Delivery) {
    event.stopPropagation(); // para que no dispare el click del card
    console.log('Delete delivery:', delivery);
    // aquí va tu lógica de borrado / modal / confirmación
  }

  // 🔹 Click en URL
  openDeliveryUrl(event: Event, url: string) {
    event.stopPropagation();
    // si quieres abrir fuera:
    window.open(`https://${url.replace(/^https?:\/\//, '')}`, '_blank');
  }

}
