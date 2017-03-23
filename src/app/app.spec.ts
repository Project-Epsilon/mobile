import { TabsPage } from "../pages/tabs/tabs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { MyApp } from "./app.component";
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { AUTH_PROVIDERS, AuthConfig, AuthHttp, provideAuth } from "angular2-jwt";
import { AuthService } from "../providers/auth.service";
import { Storage } from "@ionic/storage";
let fixture: ComponentFixture<MyApp>;
let comp: MyApp;

describe("Component: Root Component", () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
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
      ],
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    comp = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it("is created", () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

});
