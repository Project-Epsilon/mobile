import { DebugElement } from "@angular/core/";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { App, NavController, NavParams } from "ionic-angular";
import { IonicModule } from "ionic-angular";
import "rxjs/add/operator/map";
import { MyApp } from "../../app/app.component";
import { AuthService } from "../../providers/auth.service";
import { LoginPage } from "./login";

let comp: LoginPage;
let fixture: ComponentFixture<LoginPage>;
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
describe("Login Component", () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [MyApp, LoginPage],
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
        App,
        Storage,
        MockBackend,
        BaseRequestOptions,
      ],

    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(LoginPage);
    comp    = fixture.componentInstance;

  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });

  it("login service created", () => {

    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();

  });

  it("autologin test", () => {

    expect(comp.autoLogin()).toBeDefined();

  });

});
