import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/Intro/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'notify',
    loadChildren: () => import('./pages/Profile/notify/notify.module').then( m => m.NotifyPageModule)
  },
  
  {
    path: 'help',
    loadChildren: () => import('./pages/Profile/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/Profile/faq/faq.module').then( m => m.FaqPageModule)
  },
  
  {
    path: 'profile',
    loadChildren: () => import('./pages/Profile/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'ship',
    loadChildren: () => import('./pages/History/ship/ship.module').then( m => m.ShipPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/History/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'ssp',
    loadChildren: () => import('./pages/History/ssp/ssp.module').then( m => m.SspPageModule)
  },

  {
    path: 'intro1',
    loadChildren: () => import('./pages/Intro/intro1/intro1.module').then( m => m.Intro1PageModule)
  },
  {
    path: 'intro2',
    loadChildren: () => import('./pages/Intro/intro2/intro2.module').then( m => m.Intro2PageModule)
  },
  {
    path: 'onbor',
    loadChildren: () => import('./pages/Intro/onbor/onbor.module').then( m => m.OnborPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/Login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/Login/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/History/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'snc',
    loadChildren: () => import('./pages/History/snc/snc.module').then( m => m.SncPageModule)
  },
  {
    path: 'snc1',
    loadChildren: () => import('./pages/History/snc1/snc1.module').then( m => m.Snc1PageModule)
  },
  {
    path: 'snc2',
    loadChildren: () => import('./pages/History/snc2/snc2.module').then( m => m.Snc2PageModule)
  },
  {
    path: 'trackorder',
    loadChildren: () => import('./pages/History/trackorder/trackorder.module').then( m => m.TrackorderPageModule)
  },
  {
    path: 'cparcel',
    loadChildren: () => import('./pages/History/cparcel/cparcel.module').then( m => m.CparcelPageModule)
  },
  {
    path: 'cp1',
    loadChildren: () => import('./pages/History/cp1/cp1.module').then( m => m.Cp1PageModule)
  },
  {
    path: 'cp2',
    loadChildren: () => import('./pages/History/cp2/cp2.module').then( m => m.Cp2PageModule)
  },
  {
    path: 'cp3',
    loadChildren: () => import('./pages/History/cp3/cp3.module').then( m => m.Cp3PageModule)
  },
  {
    path: 'cp4',
    loadChildren: () => import('./pages/History/cp4/cp4.module').then( m => m.Cp4PageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/Chat/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'orderdetails/:id',
    loadComponent: () =>
      import('./pages/tabs/orderdetails/orderdetails.page').then(m => m.OrderdetailsPage)
  },   
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
