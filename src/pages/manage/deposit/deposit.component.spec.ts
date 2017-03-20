import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {NavParams,NavController} from "ionic-angular";
import {DepositComponent} from "./deposit.component";
import {Storage} from "@ionic/storage";
import {BankTransferService} from "../../../providers/bank.service";
import {MyApp} from "../../../app/app.component";
import {IonicModule} from "ionic-angular";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions} from "@angular/http";
import {AUTH_PROVIDERS, AuthConfig, AuthHttp, provideAuth} from "angular2-jwt";
import {AuthService} from "../../../providers/auth.service";
let component: DepositComponent;
import {WalletsService} from "../../../providers/wallet.service";

let fixture: ComponentFixture<DepositComponent>;

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
