import { ErrorHandler, NgModule } from "@angular/core";
import { Http } from "@angular/http";
import { IonicStorageModule, Storage } from "@ionic/storage";
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
import { OtpPage } from "../pages/otp/otp";
import { SendMoneyPage } from "../pages/send-money/send-money";
import { TabsPage } from "../pages/tabs/tabs";
import { TransfersPage } from "../pages/transfers/transfers";

import { DepositComponent } from "../pages/manage/deposit/deposit.component";
import { WithdrawComponent } from "../pages/manage/withdraw/withdraw.component";
import { AcceptDeclineModalPage } from "../pages/modals/acceptdecline-modal/acceptdecline-modal";
import { AddContactModalPage } from "../pages/modals/addcontact-modals/addcontact-modal";
import { BankTransferModalPage } from "../pages/modals/banktransfer-modal/banktransfer-modal";
import { ContactModalPage } from "../pages/modals/contact-modals/contact-modal";
import { AuthService } from "../providers/auth.service";
import { BankTransferService } from "../providers/bank.service";
import { ContactsService } from "../providers/contact.service";
import { CurrencyService } from "../providers/currency.service";
import { TransferService } from "../providers/transfer.service";
import { WalletsService } from "../providers/wallet.service";
import { PhonePipe } from "../utils/PhonePipe";

export function getAuthHttp(http, storage: Storage) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{Accept: "application/json"}],
    tokenGetter: (() => storage.get("token")),
  }), http);
}

@NgModule({
  bootstrap: [IonicApp],
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
    AcceptDeclineModalPage,
    TransfersModalPage,
    WalletSlideComponent,
    BankTransferModalPage,
    WalletHeaderComponent,
    TransactionLogComponent,
    TransactionComponent,
    PhonePipe,
    EditAccountPage,
    WithdrawComponent,
    DepositComponent,
  ],
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
    AcceptDeclineModalPage,
    BankTransferModalPage,
    TransfersModalPage,
    EditAccountPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: "__db",
    }),
  ],
  providers: [
    AuthHttp,
    AuthService,
    WalletsService,
    CurrencyService,
    BankTransferService,
    TransferService,
    ContactsService,
    {
      deps: [Http, Storage],
      provide: AuthHttp,
      useFactory: getAuthHttp,
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler,
    },
  ],
})

export class AppModule {}
