import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserSessionService } from '../../services/session/user-session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: false,
})
export class PaymentPage implements OnInit {

  darkMode = false;

  orderAmount: number = 0;
  deliveryFee: number = 5;
  totalFinal: number = 0;

  selectedPaymentMethod: string | null = null;

  constructor(
    private modalcontroller: ModalController,
    public router: Router,
    private userSession: UserSessionService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.checkAppMode();
    this.loadOrderValues();
  }

  loadOrderValues() {
    const amount = Number(localStorage.getItem("orderAmount"));

    this.orderAmount = isNaN(amount) ? 0 : amount;
    this.totalFinal = this.orderAmount + this.deliveryFee;

    console.log("OrderAmount:", this.orderAmount);
    console.log("DeliveryFee:", this.deliveryFee);
    console.log("TotalFinal:", this.totalFinal);
  }

  close() {
    this.modalcontroller.dismiss();
    this.router.navigate(['/trackorder']);
  }

  close1() {
    this.modalcontroller.dismiss();
    this.router.navigate(['/tabs/home']);
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
    console.log("Método de pago seleccionado:", method);
  }

  // 🔥🔥🔥 SOLUCIÓN: Enviar token + body
  submitPayment() {
    if (!this.selectedPaymentMethod) {
      console.log("Debes seleccionar un método de pago");
      return;
    }

    const token = this.userSession.getToken(); // 🔥 RECUPERAR TOKEN

    if (!token) {
      console.error("No hay token guardado. Debes iniciar sesión.");
      return;
    }

    const body = {
      payment_method: this.selectedPaymentMethod
    };

    const url = 'http://localhost:8000/api/order-management/save-by-user';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post(url, body, { headers })
      .subscribe({
        next: (resp) => {
          console.log("Orden creada correctamente:", resp);
          this.router.navigate(['/trackorder']);
        },
        error: (err) => {
          console.error("Error creando la orden:", err);
        }
      });
  }

}
