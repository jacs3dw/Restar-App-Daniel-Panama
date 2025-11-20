import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  // 🔹 Nuevos campos:
  title: string;
  url: string;
  description: string; // menos de 100 caracteres
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false,
})


export class HomePage implements OnInit {

  darkMode = false;
  shipments: Shipment[] = [];

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.checkAppMode();
    this.loadShipments();
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    // const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    console.log(checkIsDarkMode);
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }
  items = [
    { label: 'All',        value: 'ALL',       focused: true },
    { label: 'Google',  value: 'Google', focused: false },
    { label: 'Youtube',    value: 'Youtube',   focused: false },
    { label: 'Bing',    value: 'Bing',   focused: false },
    { label: 'DuckDuckGo',    value: 'DuckDuckGo',   focused: false },
  ];
  loadShipments() {
    this.shipments = [
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
        url: 'www.fastdelivery.com/track/1247848754',
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
        url: 'www.fastdelivery.com/track/8744552211',
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
        url: 'www.fastdelivery.com/track/9981237777',
        description: 'Your package is on the way and will arrive very soon.',
      },
    ];
  }
  

  goToCp4(event: Event) {
    event.stopPropagation(); 
    this.router.navigateByUrl('/cp4');
  }
  
  goToOrderDetails(event: Event) {
    event.stopPropagation();       // 👈 clave para que no dispare el click del padre
    this.router.navigateByUrl('/orderdetails');
  }

  openShipmentUrl(event: Event, url: string) {
    event.stopPropagation(); 
    window.open(`https://${url}`, '_blank');
  }
  
  onDeleteShipment(event: Event, shipment: Shipment) {
    event.stopPropagation(); // no disparar goToCp4
  
    // Aquí luego conectas con tu backend.
    // Por ahora, lo quitamos del array para simular:
    this.shipments = this.shipments.filter(s => s !== shipment);
  }
  onFocus(index: number) {
  }

}
