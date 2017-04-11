import { DebugElement } from "@angular/core/";
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { App, NavController, NavParams } from "ionic-angular";
import { IonicModule } from "ionic-angular";
import "rxjs/add/operator/map";
import { MyApp } from "../../app/app.component";
import { AuthService } from "../../providers/auth.service";
import { ContactsService } from "../../providers/contact.service";
import { CurrencyService } from "../../providers/currency.service";
import { WalletsService } from "../../providers/wallet.service";
import { environment } from "../environments/environment";
import { HomePage } from "./Home";

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let de: DebugElement;
let el: HTMLElement;
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
describe("Home Component", () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [MyApp, HomePage],
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
        {provide: NavParams, useClass: MockNavParams},

        {
          deps: [Http],
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
        },
        NavController,
        AuthService,
        ContactsService,
        CurrencyService,
        WalletsService,
        App,
        Storage,
        MockBackend,
        BaseRequestOptions,
      ],

    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    comp    = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });

  it("home component created", () => {

    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();

  });

  it("logout test", () => {

    expect(comp.logout()).not.toBeNull();

  });

});
