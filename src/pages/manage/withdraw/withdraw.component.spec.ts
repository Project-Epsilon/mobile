import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {NavParams} from "ionic-angular";
import {WithdrawComponent} from "./withdraw.component";
import {Storage} from "@ionic/storage";
import {BankTransferService} from "../../../providers/bank.service";
import {MyApp} from "../../../app/app.component";
import {IonicModule} from "ionic-angular";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions} from "@angular/http";
import {AUTH_PROVIDERS, AuthConfig, AuthHttp, provideAuth} from "angular2-jwt";
import {AuthService} from "../../../providers/auth.service";
import {WalletsService} from "../../../providers/wallet.service";
let component: WithdrawComponent;

let fixture: ComponentFixture<WithdrawComponent>;

class MockNavParams {
  data = {
    currency: {
      currency: "USD",
      name: "Mike",
    }
  };

  get(param){
    return this.data[param];
  }
}
describe("Withdrawl Component", () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, WithdrawComponent],
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
          provide: NavParams, useClass: MockNavParams
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
        BankTransferService,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Create withdraw component", () => {
    expect(component).toBeTruthy();
  });

  it("Test Deposit", () => {
    expect(component.withdraw()).toBeDefined();
  });
});
