import { ErrorHandler, NgModule } from "@angular/core";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { MyApp } from "./app.component";

import { TransactionLogComponent } from "../components/transaction-log/transaction-log.component";
import { TransactionComponent } from "../components/transaction/transaction.component";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { WalletHeaderComponent } from "../pages/home/wallet-header/wallet-header.component";
import { WalletSlideComponent } from "../pages/home/wallet-slide/wallet-slide.component";
import { LoginPage } from "../pages/login/login";

import { EditAccountPage } from "../pages/edit-account/edit-account";
import { ManagePage } from "../pages/manage/manage";
import { TransfersModalPage } from "../pages/modals/transfers-modal/transfers-modal";
import { MorePage } from "../pages/more/more";
import { SendMoneyPage } from "../pages/send-money/send-money";
import { TabsPage } from "../pages/tabs/tabs";
import { TransfersPage } from "../pages/transfers/transfers";
import { OtpPage } from "../pages/otp/otp";

import { DepositComponent } from "../pages/manage/deposit/deposit.component";
import { WithdrawComponent } from "../pages/manage/withdraw/withdraw.component";
import { AddContactModalPage } from "../pages/modals/addcontact-modals/addcontact-modal";
import { ContactModalPage } from "../pages/modals/contact-modals/contact-modal";
import { AuthService } from "../providers/auth.service";
import { BankTransferService } from "../providers/bank.service";
import { ContactsService } from "../providers/contact.service";
import { CurrencyService } from "../providers/currency.service";
import { TransferService } from "../providers/transfer.service";
import { WalletsService } from "../providers/wallet.service";
import { PhonePipe } from "../utils/PhonePipe";

export function getAuthHttp(http) {
  let storage: Storage = new Storage();
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{Accept: "application/json"}],
    tokenGetter: (() => storage.get("token")),
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
    OtpPage,
    ContactModalPage,
    AddContactModalPage,
    TransfersModalPage,
    WalletSlideComponent,
    WalletHeaderComponent,
    TransactionLogComponent,
    TransactionComponent,
    PhonePipe,
    EditAccountPage,
    WithdrawComponent,
    DepositComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
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
    OtpPage,
    ContactModalPage,
    AddContactModalPage,
    TransfersModalPage,
    EditAccountPage,
  ],
  providers: [
    AuthHttp,
    Storage,
    AuthService,
    WalletsService,
    CurrencyService,
    BankTransferService,
    TransferService,
    ContactsService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http],
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler,
    },
  ],
})
export class AppModule {}
