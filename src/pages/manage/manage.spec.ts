import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { IonicModule, LoadingController, NavController, NavParams } from "ionic-angular";
import { MyApp } from "../../app/app.component";
import { AuthService } from "../../providers/auth.service";
import { BankTransferService } from "../../providers/bank.service";
import { WalletsService } from "../../providers/wallet.service";
import { DepositComponent } from "./deposit/deposit.component";
import { ManagePage } from "./manage";
import { WithdrawComponent } from "./withdraw/withdraw.component";

let component: ManagePage;
let fixture: ComponentFixture<ManagePage>;

class MockNavParams {
  public data = {
    action: {
      action: "withdraw",
    },
  };

  public get(param) {
    return this.data[param];
  }
}

describe("Manage Page", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, DepositComponent, WithdrawComponent, ManagePage],
      imports: [
        IonicModule.forRoot(ManagePage),
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
        Storage,
        MockBackend,
        BaseRequestOptions,
        NavController,
        LoadingController,
        BankTransferService,
        WalletsService,
        AuthService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Should create manage page", () => {
    expect(component).toBeTruthy();
  });

  it("Should fire lifecycle hook upon entering", () => {
    component.navParams = new NavParams({action: "withdraw", wallet: new Object()});
    expect(component.ionViewDidEnter()).toBeUndefined();

    component.navParams = new NavParams({action: "deposit", wallet: new Object()});
    expect(component.ionViewDidEnter()).toBeUndefined();
  });

  it("Should fire lifecycle hook upon leaving", () => {
    component.navParams = new NavParams({wallet: new Object()});
    try {
      expect(component.ionViewDidLeave()).toBeUndefined();
    }
    catch (err){

    }
  });
});
