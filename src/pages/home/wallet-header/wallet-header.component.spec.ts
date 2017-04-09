/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { NavController } from "ionic-angular";
import { IonicModule } from "ionic-angular";
import { MyApp } from "../../../app/app.component";
import {Observable} from "rxjs";
import { AfterContentChecked, Component, Input } from "@angular/core";
import { CurrencyService } from "../../../providers/currency.service";
import { WalletHeaderComponent } from "./wallet-header.component";
let component: WalletHeaderComponent;
let fixture: ComponentFixture<WalletHeaderComponent>;


describe("WalletHeader", () => {

  class MockCurrencyService {
    getCurrency(code:any){
      return Observable.of();
    }
    init(data: any) {
      return Observable.of();
    }
    mapCurrencies(data:any){
      return Observable.of();
    }
  }
  let component: WalletHeaderComponent;
  let fixture: ComponentFixture<WalletHeaderComponent>;
  let service:CurrencyService;
  let mService:MockCurrencyService;
  beforeEach(async(() => {



    TestBed.configureTestingModule({
      declarations: [MyApp, WalletHeaderComponent],
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
        {provide:CurrencyService, useClass: MockCurrencyService},

        {
          deps: [Http],
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
        },
        MockBackend,
        BaseRequestOptions,
        NavController,
        CurrencyService,
        Storage,

      ],
    }).compileComponents();
  }));
  beforeEach(() => {

    var store = {};

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
      store = {};
    });
    fixture = TestBed.createComponent(WalletHeaderComponent);
    component = fixture.componentInstance;
    component.currencyName = "USD";
    service = TestBed.get(CurrencyService);

    fixture.detectChanges();
  });

  it("Walletheader create", () => {
    localStorage['currencies'] = 'usd';

    expect(component).toBeTruthy();
  });

  it("Walletheader deposit", () => {
    localStorage['currencies'] = 'usd';
    expect(component.redirect("deposit")).toBeTruthy();
  });
});
