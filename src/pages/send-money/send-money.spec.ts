/**
 * Created by ronniepang on 2017-03-19.
 */
/**
 * Created by ronniepang on 2017-03-19.
 */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {NavParams,AlertController, Loading, LoadingController,ModalController,NavController} from "ionic-angular";
import {SendMoneyPage} from "./send-money";
import {Storage} from "@ionic/storage";
import { ContactsService } from "../../providers/contact.service";
import {BankTransferService} from "../../providers/bank.service";
import {MyApp} from "../../app/app.component";
import {IonicModule} from "ionic-angular";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions} from "@angular/http";
import {AUTH_PROVIDERS, AuthConfig, AuthHttp, provideAuth} from "angular2-jwt";
import {AuthService} from "../../providers/auth.service";
import {WalletsService} from "../../providers/wallet.service";
import { TransferService } from "../../providers/transfer.service";
let component: SendMoneyPage;

let fixture: ComponentFixture<SendMoneyPage>;

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
describe("Send-money Component", () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, SendMoneyPage],
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
        FormBuilder,
        TransferService,
        ModalController,
        WalletsService,
        LoadingController,
        AlertController,
        NavController,
        FormBuilder,
        BankTransferService,
        ContactsService,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SendMoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Send-money component creation", () => {
    expect(component).toBeTruthy();
  });

  it("Test update", () => {
    expect(component.createContact()).toBeDefined();
  });
  it("Test send", () => {
    expect(component.send()).toBeDefined();
  });
  it("Test updatevalid", () => {
    expect(component.updateValidAmount()).toBeDefined();
  });
  it("Test ionViewDidLeave", () => {
    expect(component.ionViewDidLeave()).toBeDefined();
  });

});
