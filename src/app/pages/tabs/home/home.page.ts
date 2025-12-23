import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../../services/session/user-session.service';
import { actualizarCarrito, getAllProducts, getHomeProducts } from 'Api/services/entities_manager/indexEntitiesManager';
import { initUser } from 'src/app/app.module';
import { UserLoaderService } from 'Api/services/auth/user-loader.service';



interface ShipmentStop {
  icon: 'ellipse-outline' | 'location-outline';
  city: string;
  dateTime: string;
}

interface Shipment {
  status: 'Pending' | 'Completed';
  id: string;
  trackingNumber?: string;
  statusColor?: string;
  origin?: ShipmentStop;
  destination?: ShipmentStop;

  title: string;
  url: string;
  description: string;


  categoryName: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})

export class HomePage implements OnInit {

  darkMode = false;

  shipments: Shipment[] = [];
  allShipments: Shipment[] = [];
  selectedFilter: string = 'ALL';
  searchText: string = '';

  userName: string = '';

  constructor(
    private router: Router,
    private userSession: UserSessionService
  ) {}

  ngOnInit(): void {
    this.loadUserName();
    this.checkAppMode();
    this.loadShipments();
  }

  ionViewWillEnter() {
    console.log('HomePage entra en vista → recargando datos');
    this.loadUserName();
    this.checkAppMode();
    this.loadShipments();
  }
  ionViewDidEnter() {
  console.log('🔥 ionViewDidEnter DISPARADO');
  this.loadUserName();
  this.checkAppMode();
  this.loadShipments();
}

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  loadUserName() {
    this.userName = this.userSession.getUserName();
    console.log('Usuario en HomePage:', this.userSession.getUser());
  }

  items = [
    { label: 'All', value: 'ALL', focused: true },
    { label: 'Google', value: 'Google', focused: false },
    { label: 'Youtube', value: 'Youtube', focused: false },
    { label: 'Bing', value: 'Bing', focused: false },
    { label: 'DuckDuckGo', value: 'DuckDuckGo', focused: false },
  ];

  async loadShipments() {
  const resp = await getHomeProducts();
  console.log('Productos HOME (Initial):', resp);

  const backendData = resp?.data || [];

  this.allShipments = backendData.map((item: any, index: number) => ({
    id: item.id || String(index + 1),
    status: item.state, // Initial
    title: item.title,
    url: item.url,
    description: item.description,
    categoryName: item.category?.name || ''
  }));

  this.shipments = [...this.allShipments];
}


  async goToCp4(event: Event, shipment: Shipment) {
    event.stopPropagation();

    const user = this.userSession.getUser();
    if (!user) {
      console.warn('No hay usuario en sesión');
      return;
    }

    const body = {
      users_id: user.id,
      products_id: shipment.id,
    };

    try {
      const resp = await actualizarCarrito(body);
      console.log('Respuesta actualizarCarrito:', resp);

      if (resp.status) {
        this.router.navigateByUrl('/cp4');
      } else {
        console.error('Error al actualizar carrito:', resp.message);
      }
    } catch (error) {
      console.error('Error al actualizar carrito:', error);
    }
  }

  goToOrderDetails(event: Event, shipment: Shipment) {
    event.stopPropagation();
    this.router.navigateByUrl(`/orderdetails/${shipment.id}`);
  }

  openShipmentUrl(event: Event, url: string) {
    event.stopPropagation();
    window.open(`https://${url}`, '_blank');
  }

  onDeleteShipment(event: Event, shipment: Shipment) {
    event.stopPropagation();
    this.shipments = this.shipments.filter(s => s !== shipment);
  }

  onFocus(index: number) {
    this.items.forEach((it, i) => it.focused = i === index);

    this.selectedFilter = this.items[index].value;

    this.applyFilter();
  }

  onSearchChange() {
    this.applyFilter();
  }

  applyFilter() {
    let filtered = [...this.allShipments];

    
    if (this.selectedFilter !== 'ALL') {
      const filterWord = this.selectedFilter.toLowerCase();
      filtered = filtered.filter(s =>
        s.categoryName.toLowerCase().includes(filterWord)
      );
    }

    
    if (this.searchText.trim() !== '') {
      const text = this.searchText.toLowerCase();
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(text)
      );
    }

    this.shipments = filtered;
  }

}
