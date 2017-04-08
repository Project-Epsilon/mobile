import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FormBuilder} from "@angular/forms";
import {BaseRequestOptions, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {Storage} from "@ionic/storage";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {AlertController, LoadingController, ModalController, NavController, NavParams,ViewController,IonicModule} from "ionic-angular";
import {MyApp} from "../../app/app.component";
import {AuthService} from "../../providers/auth.service";
import {BankTransferService} from "../../providers/bank.service";
import {TransferService} from "../../providers/transfer.service";
import {WalletsService} from "../../providers/wallet.service";
import {TransfersPage} from "./transfers";
let component: TransfersPage;

let fixture: ComponentFixture<TransfersPage>;

export class NavParamsMock {
  static returnParam = null;

  public get(key): any {
    if (NavParamsMock.returnParam) {
      return NavParamsMock.returnParam
    }
    return 'default';
  }

  static setParams(value) {
    NavParamsMock.returnParam = value;
  }
}
describe("Transfer Component", () => {

  beforeEach(async(() => {
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
        ModalController,
        WalletsService,
        TransferService,
        LoadingController,
        AlertController,
        NavController,
        FormBuilder,
        BankTransferService,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    try {
      fixture = TestBed.createComponent(TransfersPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }catch(exception){}
  });

  it("Transfer component should create", () => {
    expect(component).toBeTruthy();
  });


  it("Transfer component should create", () => {
      expect(component).toBeTruthy();
  });

  it("Test add transaction", () => {
    expect(component.addTransaction("token")).toBeDefined();
  })
  it("Test show accept and decline", () => {
      expect(component.showAcceptDeclineModal("token")).toBeDefined();
  });
  it("Test show transfermodal", () => {
    expect(component.showTransferModal("token")).toBeDefined();
  });

});
