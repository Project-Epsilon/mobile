import { async, ComponentFixture, TestBed} from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { NavParams,ToastController, ViewController,AlertController,LoadingController } from "ionic-angular";
import { IonicModule } from "ionic-angular";
import { MyApp } from "../../../app/app.component";
import { AuthService } from "../../../providers/auth.service";
import { BankTransferService } from "../../../providers/bank.service";
import { WalletsService } from "../../../providers/wallet.service";
import { TransferService } from "../../../providers/transfer.service";
import { AcceptDeclineModalPage } from "./acceptdecline-modal";
import { AbstractMockObservableService } from "./AbstractMockObservableService";
let component: AcceptDeclineModalPage;

let fixture: ComponentFixture<AcceptDeclineModalPage>;

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
export class ViewControllerMock {
  public _setHeader(): any {
    return {} };
  public _setIONContent(): any
  { return {} };
  public _setIONContentRef(): any { return {} }; }
describe("modal Component", () => {
  class MockService extends AbstractMockObservableService {
    send(receiver, amount, walletId, message) {
      return this;
    }
    getTransferByToken(token:any) {
      return this;
    }
    receive(token:any){
      return this;
    }
  }

  let mockService;
  beforeEach(async(() => {
    mockService = new MockService();
    TestBed.configureTestingModule({
      declarations: [MyApp, AcceptDeclineModalPage],
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
        { provide: ViewController, useClass: ViewControllerMock },
        {provide: TransferService, useValue: mockService },
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
        LoadingController,
        TransferService,
        ToastController,
        WalletsService,
        FormBuilder,
        BankTransferService,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptDeclineModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Create acceptdeclinemodal component", () => {
    expect(component).toBeTruthy();
  });

  it("Test accept", () => {
    expect(component.decline()).not.toBeNull();
  });
});
