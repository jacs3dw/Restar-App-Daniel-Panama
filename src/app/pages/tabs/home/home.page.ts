import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../../services/session/user-session.service';

interface ShipmentStop {
  icon: 'ellipse-outline' | 'location-outline';
  city: string;
  dateTime: string;
}

interface Shipment {
  trackingNumber: string;
  status: 'Pending' | 'Completed';
  statusColor?: string;
  origin: ShipmentStop;
  destination: ShipmentStop;

  title: string;
  url: string;
  description: string;
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
  ) { }

  ngOnInit(): void {
    this.checkAppMode();
    this.loadShipments();
    this.loadUserName();
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
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

  loadShipments() {
    this.allShipments = [
      {
        trackingNumber: '#124 784 8754',
        status: 'Completed',
        statusColor: '#',
        origin: {
          icon: 'ellipse-outline',
          city: 'Amsterdam, Netherlands',
          dateTime: '24 Jun, 16:32',
        },
        destination: {
          icon: 'location-outline',
          city: 'New York, USA',
          dateTime: '30 Jun, 08:41',
        },
        title: 'Package from Amsterdam to New York',
        url: 'https://www.google.com/',
        description: 'Your package is being processed and will be shipped soon.',
      },
      {
        trackingNumber: '#874 455 2211',
        status: 'Pending',
        statusColor: '#4CAF50',
        origin: {
          icon: 'ellipse-outline',
          city: 'Berlin, Germany',
          dateTime: '10 Jul, 12:20',
        },
        destination: {
          icon: 'location-outline',
          city: 'Paris, France',
          dateTime: '12 Jul, 09:15',
        },
        title: 'Order delivered to Paris',
        url: 'https://www.youtube.com/',
        description: 'This shipment has been successfully delivered to the recipient.',
      },
      {
        trackingNumber: '#998 123 7777',
        status: 'Pending',
        statusColor: '#2196F3',
        origin: {
          icon: 'ellipse-outline',
          city: 'Madrid, Spain',
          dateTime: '15 Jul, 18:45',
        },
        destination: {
          icon: 'location-outline',
          city: 'Lisbon, Portugal',
          dateTime: '16 Jul, 14:10',
        },
        title: 'Shipment en route to Lisbon',
        url: 'https://www.bing.com/',
        description: 'Your package is on the way and will arrive very soon.',
      },
        

    ];


    this.shipments = [...this.allShipments];
  }

  goToCp4(event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl('/cp4');
  }

  goToOrderDetails(event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl('/orderdetails');
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
        s.url.toLowerCase().includes(filterWord)
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
