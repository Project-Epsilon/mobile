import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SendMoneyPage } from "../pages/send-money/send-money";
import { PendingPage } from "../pages/pending/pending";
import { ManagePage } from "../pages/manage/manage";
import { MorePage } from "../pages/more/more";
import { WalletSlideComponent } from '../pages/home/wallet-slide/wallet-slide.component';
import { WalletHeaderComponent } from '../pages/home/wallet-header/wallet-header.component';
import { TransactionLogComponent } from '../components/transaction-log/transaction-log.component';
import { TransactionComponent } from '../components/transaction/transaction.component';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SendMoneyPage,
    PendingPage,
    ManagePage,
    MorePage,
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
    PendingPage,
    ManagePage,
    MorePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
