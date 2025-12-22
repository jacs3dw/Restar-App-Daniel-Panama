import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { getAllorders, IdProducts } from 'Api/services/entities_manager/indexEntitiesManager';

type BackendStatus = "Pending" | "Completed" | "Cancelled";
type TrackingStatus = 'done' | 'current' | 'pending' | 'cancelled';


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
  id: string;
  imageUrl: string;
  title: string;
  link: string;
  description: string;
  state: BackendStatus;
  reason: string;
}


@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.page.html',
  styleUrls: ['./trackorder.page.scss'],
  standalone: false,
})
export class TrackorderPage implements OnInit {

  darkMode = false;

  trackingInfo: TrackingInfo | null = null;
  orderDetails: OrderDetail | null = null;
  pendingDate?: string;
  completedDate?: string;


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
  this.checkAppMode();

  const id = this.route.snapshot.paramMap.get("id");

  if (!id) {
    this.router.navigateByUrl('/tabs/history');
    return;
  }

  await this.loadOrderInfo(id);   // 👈 primero el pedido
  this.loadTrackingById(id);      // 👈 luego el tracking
}

private formatDate(dateISO?: string): string {
  if (!dateISO) return '—';
  const d = new Date(dateISO);
  return d.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

private formatTime(dateISO?: string): string {
  if (!dateISO) return '—';
  const d = new Date(dateISO);
  return d.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

  async loadOrderInfo(orderId: string) {
    try {
      const resp: any = await IdProducts(orderId);

      const found = resp.data;
      console.log("ORDER:", found);

      this.orderDetails = {
        id: found.id,
        title: found.title,
        description: found.description,
        link: found.url,
        imageUrl: found.image,
        state: found.state,
        reason: found.reason,
      };
       // 👇 guarda fechas directamente en la orden
    this.pendingDate = found.pending_date;
    this.completedDate = found.completed_date;

    } catch (e) {
      console.error("Error loading product info:", e);
    }
  }

  loadTrackingById(shippingId: string) {

  const backendStatus: BackendStatus = this.orderDetails?.state ?? "Pending";

  // ❌ CANCELLED → NO TIMELINE
  if (backendStatus === "Cancelled") {
    this.trackingInfo = null;
    return;
  }

  // ✅ COMPLETED → TODO DONE
  if (backendStatus === "Completed") {
  this.trackingInfo = {
    shippingId,
    steps: [
      {
        date: this.formatDate(this.pendingDate),
        time: this.formatTime(this.pendingDate),
        title: 'Solicitud registrada',
        address: 'La solicitud para retirar la URL fue creada',
        status: 'done',
      },
      {
        date: this.formatDate(this.completedDate),
        time: this.formatTime(this.completedDate),
        title: 'URL retirada',
        address: 'El contenido fue retirado correctamente',
        status: 'done',
      },
    ]
  };
  return;
}


  // ⏳ PENDING
  this.trackingInfo = {
  shippingId,
  steps: [
    {
      date: this.formatDate(this.pendingDate),
      time: this.formatTime(this.pendingDate),
      title: 'Solicitud registrada',
      address: 'La solicitud para retirar la URL fue creada',
      status: 'current',
    },
    {
      date: '—',
      time: '—',
      title: 'URL retirada',
      address: 'Pendiente de procesamiento',
      status: 'pending',
    },
  ]
};

}



  goBack() {
    this.router.navigateByUrl('/tabs/history');
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }
}
