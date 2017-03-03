import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SendMoneyPage } from "../pages/send-money/send-money";
import {TransfersPage} from "../pages/transfers/transfers";
import {TransfersModalPage} from "../pages/modals/transfers-modal/transfers-modal";
import { ManagePage } from "../pages/manage/manage";
import { MorePage } from "../pages/more/more";

import { WalletSlideComponent } from '../pages/home/wallet-slide/wallet-slide.component';
import { WalletHeaderComponent } from '../pages/home/wallet-header/wallet-header.component';
import { TransactionLogComponent } from '../components/transaction-log/transaction-log.component';
import { TransactionComponent } from '../components/transaction/transaction.component';

import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthService } from "../providers/auth.service";
import { BankTransferService } from "../providers/bank.service";
import {WalletsService} from "../providers/wallet.service";
import {CurrencyService} from "../providers/currency.service";

export function getAuthHttp(http) {
  let storage: Storage = new Storage();
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SendMoneyPage,
    TransfersPage,
    ManagePage,
    MorePage,
    TransfersModalPage,
    WalletSlideComponent,
    WalletHeaderComponent,
    TransactionLogComponent,
    TransactionComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SendMoneyPage,
    TransfersPage,
    ManagePage,
    MorePage,
    TransfersModalPage
  ],
  providers: [
    AuthHttp,
    Storage,
    AuthService,
    WalletsService,
    CurrencyService,
    BankTransferService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}
