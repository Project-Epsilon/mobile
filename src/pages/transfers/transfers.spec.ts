import {async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import {AlertController, LoadingController, ModalController, NavController, NavParams } from "ionic-angular";
import { IonicModule } from "ionic-angular";
import { MyApp } from "../../app/app.component";
import { AuthService } from "../../providers/auth.service";
import { BankTransferService } from "../../providers/bank.service";
import { TransferService } from "../../providers/transfer.service";
import { WalletsService } from "../../providers/wallet.service";
import { TransfersPage } from "./transfers";
let component: TransfersPage;

let fixture: ComponentFixture<TransfersPage>;

class MockNavParams {
   public data = {
    currency: {
      currency: "USD",
      name: "Mike",
    },
  };

  public get(param) {
    return this.data[param];
  }
}
describe("Transfer Component", () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, TransfersPage],
      imports: [
        IonicModule.forRoot(MyApp),
      ],
      providers: [
        {
          deps: [MockBackend, BaseRequestOptions],
          provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
        },
        {
          provide: NavParams, useClass: MockNavParams,
        },
        {
          deps: [Http],
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
        },
        MockBackend,
        BaseRequestOptions,
        AuthService,
        Storage,
        TransferService,
        ModalController,
        WalletsService,
        LoadingController,
        AlertController,
        NavController,
        FormBuilder,
        BankTransferService,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TransfersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Transfer component should create", () => {
    expect(component).toBeTruthy();
  });

  it("Test showTransferModal", () => {
    expect(component.showTransferModal()).toBeDefined();
  });
  it("Test receive", () => {
    expect(component.receive()).toBeDefined();
  });

});
