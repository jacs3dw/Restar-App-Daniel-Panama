import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// 👇 AGREGAR ESTE IMPORT
import { HttpClientModule } from '@angular/common/http';
import { UserLoaderService } from 'Api/services/auth/user-loader.service';

// 👇 IMPORTA EL SERVICIO QUE CREA LA SESIÓN DESDE EL TOKEN

// 👇 FUNCIÓN QUE USARÁ APP_INITIALIZER
export function initUser(userLoader: UserLoaderService) {
  // Debe devolver una función que a su vez devuelva una Promise o void
  return () => userLoader.loadUserFromToken();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    // 👇 YA LO TENÍAS AGREGADO
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // 👇 Registramos el servicio (realmente con providedIn: 'root' no es obligatorio, pero no estorba)
    UserLoaderService,

    // 👇 APP_INITIALIZER para cargar el usuario ANTES de bootstrap
    {
      provide: APP_INITIALIZER,
      useFactory: initUser,
      deps: [UserLoaderService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
