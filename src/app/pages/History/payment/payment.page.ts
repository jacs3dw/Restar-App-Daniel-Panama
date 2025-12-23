import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, AlertController, IonModal } from "@ionic/angular";
import { UserSessionService } from "../../services/session/user-session.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { pagarCompra } from "Api/services/entities_manager/indexEntitiesManager";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.page.html",
  styleUrls: ["./payment.page.scss"],
  standalone: false,
})
export class PaymentPage implements OnInit {
  async showErrorModal(message: string) {
    const alert = await this.alertController.create({
      header: "Error en el pago",
      message: message || "Ocurrió un error inesperado",
      buttons: [
        {
          text: "Aceptar",
          role: "confirm",
        },
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }

  @ViewChild("modal", { static: false }) modal!: IonModal;

  darkMode = false;

  orderAmount: number = 0;
  deliveryFee: number = 5;
  totalFinal: number = 0;

  selectedPaymentMethod: string | null = null;

  orderId: string = "";

  showPaymentAlert: boolean = false;

  constructor(
    private modalcontroller: ModalController,
    public router: Router,
    private userSession: UserSessionService,
    private http: HttpClient,
    private alertController: AlertController,

    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.checkAppMode();
    this.loadOrderValues();
  }

  loadOrderValues() {
    const amount = Number(localStorage.getItem("orderAmount"));
    this.orderAmount = isNaN(amount) ? 0 : amount;
    this.totalFinal = this.orderAmount;
  }

  close() {
    try {
      this.modal?.dismiss();
    } catch {}
    this.router.navigate(["/trackorder"]);
  }

  close1() {
    try {
      this.modal?.dismiss();
    } catch {}
    this.router.navigate(["/tabs/home"]);
  }

  async checkAppMode() {
    const checkIsDarkMode = localStorage.getItem("darkModeActivated");
    this.darkMode = checkIsDarkMode === "true";
    document.body.classList.toggle("dark", this.darkMode);
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  async openPaymentAlert() {}

  async submitPayment() {
    if (!this.selectedPaymentMethod) {
      this.showPaymentAlert = true;
      return;
    }

    const token = this.userSession.getToken();

    if (!token) {
      console.error("No hay token guardado. Debes iniciar sesión.");
      return;
    }

    const body = {
      payment_method: this.selectedPaymentMethod,
    };

    const url = "http://localhost:8000/api/order-management/save-by-user";

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const pago = await pagarCompra(body);
    console.log("pago:", pago);

    if (!pago?.status || !Array.isArray(pago.data) || pago.data.length === 0) {
      await this.showErrorModal(pago?.message || "Error al procesar el pago");
      return;
    }

    this.orderId = pago.data[0].id;
    console.log("ID recibido de la API:", this.orderId);

    this.cdr.detectChanges();

    try {
      await this.modal.present();
    } catch {
      await this.showErrorModal("No se pudo mostrar la confirmación del pago");
    }
  }

  goHome() {
    this.router.navigate(["/tabs/home"]).then(() => {
    window.location.reload();
  });
  }
}
