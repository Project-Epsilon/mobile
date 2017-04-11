/* tslint:disable:no-unused-variable */
import { AfterContentChecked, Component, Input } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { IonicModule } from "ionic-angular";
import { NavController } from "ionic-angular";
import {Observable} from "rxjs";
import { MyApp } from "../../app/app.component";
import { CurrencyService } from "../../providers/currency.service";
import { EditAccountPage } from "./edit-account";
let component: EditAccountPage;
let fixture: ComponentFixture<EditAccountPage>;

describe("Edit Account", () => {
  let component: EditAccountPage;
  let fixture: ComponentFixture<EditAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, EditAccountPage],
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
    fixture = TestBed.createComponent(EditAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Edit-account component create", () => {
    localStorage["currencies"] = "usd";

    expect(component).toBeTruthy();
  });

  it("Walletheader deposit", () => {
    expect(component.deleteUser()).toBeDefined();
  });
});
