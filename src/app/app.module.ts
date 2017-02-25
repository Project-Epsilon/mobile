import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
    TransfersModalPage
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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
