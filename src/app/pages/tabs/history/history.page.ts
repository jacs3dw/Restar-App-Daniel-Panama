import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAllorders, } from 'Api/services/entities_manager/indexEntitiesManager';
import { getStatusProducts } from 'Api/services/entities_manager/indexEntitiesManager';


interface Delivery {
  status: string;
  statusColor: string;
  title: string;
  url: string;
  description: string;
  id?: string;
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
    { label: 'All', value: 'ALL', focused: true },
    { label: 'Completed', value: 'COMPLETED', focused: false },
    { label: 'Pending', value: 'PENDING', focused: false },
  ];

  deliveries: Delivery[] = [];

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkAppMode();
    this.loadDeliveries();
  }
  ionViewWillEnter() {
    console.log('HomePage entra en vista → recargando datos');
    this.checkAppMode();
    this.loadDeliveries();
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

 async loadDeliveries() {
  try {
    const resp: any = await getStatusProducts();
    console.log("PRODUCTOS (NO Initial):", resp);

    if (!resp?.data?.length) {
      this.deliveries = [];
      return;
    }

    this.deliveries = resp.data.map((product: any) => {
      let status = "Pending";
      let statusColor = "#2196F3";
      const isCompleted = product.state === "Completed";
      const isCancelled = product.state === "Cancelled";

      if (isCompleted) {
        status = "Completed";
        statusColor = "#3AC479"; // Verde para completado
      } else if (isCancelled) {
        status = "Cancelled";
        statusColor = "#FF5722"; // Naranja para cancelado
      }

      return {
        status: status,
        statusColor: statusColor,
        id: product.id,
        title: product.title || "Sin título",
        url: product.url || "",
        description: product.description || "Sin descripción",
      };
    });

  } catch (error) {
    console.error("❌ Error al cargar history:", error);
  }
}



  // filtros UI
  onFocus(index: number) {
    this.items.forEach((item, i) => {
      item.focused = i === index;
    });
  }

  get selectedFilter(): 'ALL' | 'COMPLETED' | 'PENDING' {
    return (this.items.find(i => i.focused)?.value as any) || 'ALL';
  }

  get filteredDeliveries(): Delivery[] {
    if (this.selectedFilter === 'ALL') return this.deliveries;
    if (this.selectedFilter === 'COMPLETED') return this.deliveries.filter(d => d.status === 'Completed');
    if (this.selectedFilter === 'PENDING') return this.deliveries.filter(d => d.status === 'Pending');
    return this.deliveries;
  }

  goToTrackOrder(delivery: Delivery) {
    console.log("Go to track:", delivery);
    this.router.navigateByUrl('/trackorder/' + delivery.id);
  }

  onDeleteDelivery(event: Event, delivery: Delivery) {
    event.stopPropagation();
    console.log("Delete:", delivery);
  }

  openDeliveryUrl(event: Event, url: string) {
    event.stopPropagation();
    window.open(`https://${url.replace(/^https?:\/\//, '')}`, '_blank');
  }

}
