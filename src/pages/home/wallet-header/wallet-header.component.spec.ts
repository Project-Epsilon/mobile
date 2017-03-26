/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { NavController } from "ionic-angular";
import { IonicModule } from "ionic-angular";
import { MyApp } from "../../../app/app.component";
import { CurrencyService } from "../../../providers/currency.service";
import { WalletHeaderComponent } from "./wallet-header.component";
let component: WalletHeaderComponent;
let fixture: ComponentFixture<WalletHeaderComponent>;

describe("WalletHeader", () => {

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
    fixture = TestBed.createComponent(WalletHeaderComponent);
    component = fixture.componentInstance;
    component.currencyName = "USD";
    fixture.detectChanges();
  });

  it("Walletheader create", () => {
    expect(component).toBeTruthy();
  });
});
