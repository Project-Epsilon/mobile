import { async, ComponentFixture, TestBed} from "@angular/core/testing";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { App, IonicModule, NavController, NavParams} from "ionic-angular";
import { MyApp } from "../../app/app.component";
import { AuthService } from "../../providers/auth.service";
import { BankTransferService } from "../../providers/bank.service";
import { WalletsService } from "../../providers/wallet.service";
import { OtpPage } from "./otp";
let component: OtpPage;

let fixture: ComponentFixture<OtpPage>;

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
describe("OTP Component", () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, OtpPage],
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
        FormBuilder,
        Storage,
        App,
        NavController,
        WalletsService,
        FormBuilder,
        BankTransferService,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(OtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Create OTP component", () => {
    expect(component).toBeTruthy();
  });

  it("Test requestCode", () => {
    expect(component.requestCode()).not.toBeNull();
  });
  it("Test unlock account", () => {
    expect(component.unlockAccount()).not.toBeNull();
  });
});
