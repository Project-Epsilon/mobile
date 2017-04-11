import { Injectable, NgZone } from "@angular/core";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { AlertController, IonicModule, LoadingController, ModalController, NavController, NavParams, ViewController } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { MyApp } from "../../app/app.component";
import { AuthService } from "../../providers/auth.service";
import { BankTransferService} from "../../providers/bank.service";
import { TransferService } from "../../providers/transfer.service";
import { WalletsService } from "../../providers/wallet.service";
import { TransfersPage } from "./transfers";

export class NavParamsMock {
  static returnParam = null;

  public get(key): any {
    if (NavParamsMock.returnParam) {
      return NavParamsMock.returnParam;
    }
    return "default";
  }

  static setParams(value) {
    NavParamsMock.returnParam = value;
  }
}
describe("Transfer Component", () => {
  let component: TransfersPage;
  let fixture: ComponentFixture<TransfersPage>;
  let service: TransferService;
  let mService: MockTransferService;
  @Injectable()
  class MockTransferService {
    getTransferByToken(transferToken: any) {
      return 1;
    }
    receive(data: any) {
      return 2;
    }
    send(data: any) {
      return 1;
    }
  }

  beforeEach(async(() => {
     mService = new MockTransferService();

     NavParamsMock.setParams({transferToken: "2"});
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
          provide: NavParams, useClass: NavParamsMock,
        },
        {provide: TransferService, useClass: mService},

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

     fixture = TestBed.createComponent(TransfersPage);
     component = fixture.componentInstance;
     service = TestBed.get(TransferService);
  }));
  beforeEach(() => {

      fixture.detectChanges();

  });

  it("Transfer component should create", () => {
    expect(component).toBeTruthy();
  });

  it("Transfer component should create", () => {
      expect(component).toBeTruthy();
  });

  it("Test add transaction", () => {
    expect(component.addTransaction).not.toBeNull();
  });

  it("Test show accept and decline", () => {
      expect(component.showAcceptDeclineModal).toHaveBeenCalled();
  });

  it("Test show transfermodal", () => {
    expect(component.showTransferModal("token")).not.toBeNull();
  });

});
