/**
 * Created by ronniepang on 2017-03-19.
 */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {NavParams,AlertController, Loading, LoadingController,ModalController,NavController} from "ionic-angular";
import {TransfersPage} from "./transfers";
import {Storage} from "@ionic/storage";
import {BankTransferService} from "../../providers/bank.service";
import {MyApp} from "../../app/app.component";
import {IonicModule} from "ionic-angular";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions} from "@angular/http";
import {AUTH_PROVIDERS, AuthConfig, AuthHttp, provideAuth} from "angular2-jwt";
import {AuthService} from "../../providers/auth.service";
import {WalletsService} from "../../providers/wallet.service";
import { TransferService } from "../../providers/transfer.service";
let component: TransfersPage;

let fixture: ComponentFixture<TransfersPage>;

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
