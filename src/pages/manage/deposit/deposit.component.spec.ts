import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { NavController, NavParams } from "ionic-angular";
import { IonicModule } from "ionic-angular";
import { MyApp } from "../../../app/app.component";
import { AuthService } from "../../../providers/auth.service";
import { BankTransferService } from "../../../providers/bank.service";
import { DepositComponent } from "./deposit.component";
let component: DepositComponent;
import {WalletsService} from "../../../providers/wallet.service";

let fixture: ComponentFixture<DepositComponent>;

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
describe("Deposit Component", () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, DepositComponent],
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
        WalletsService,
        FormBuilder,
        NavController,
        BankTransferService,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("create deposit component", () => {
    expect(component).toBeTruthy();
  });

  it("Set decimal method defined", () => {
    expect(component.setDecimalPlaces()).toBeDefined();
  });
  it("deposit test", () => {
    expect(component.deposit()).toBeDefined();
  });

});
