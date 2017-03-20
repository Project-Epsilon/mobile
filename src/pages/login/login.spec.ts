/**
 * Created by ronniepang on 2017-03-19.
 */
import {Injectable} from "@angular/core";
import {async, inject, TestBed,ComponentFixture} from "@angular/core/testing";
import{DebugElement} from "@angular/core/";
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {Storage} from "@ionic/storage";
import { AUTH_PROVIDERS, AuthConfig, AuthHttp, provideAuth } from "angular2-jwt";
import "rxjs/add/operator/map";
import {environment} from "../environments/environment";
import{LoginPage} from "./login";
import {IonicModule} from "ionic-angular";
import {MyApp} from "../../app/app.component";
import { NavController,NavParams,App } from 'ionic-angular';
import {AuthService} from "../../providers/auth.service";

let comp: LoginPage;
let fixture: ComponentFixture<LoginPage>;
let de: DebugElement;
let el: HTMLElement;
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
describe("Login Component", () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [MyApp, LoginPage],

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

      imports: [
        IonicModule.forRoot(MyApp)
      ]

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

  it('login service created', () => {

    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();

  });

  it('autologin test', () => {

    expect(comp.autoLogin()).toBeDefined();

  });


});