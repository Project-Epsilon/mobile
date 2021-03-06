import { async, inject, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";
import { CurrencyService } from "./currency.service";

/**
 * Currency test suite
 */
describe("Currency Service", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          deps: [MockBackend, BaseRequestOptions],
          provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
        },
        Storage,
        MockBackend,
        BaseRequestOptions,
        CurrencyService,
      ],

    });
  });

  it("should construct", async(inject([CurrencyService], (service) => {
    expect(service).toBeDefined();
  })));

  it("get currencies should return", async(inject([CurrencyService], (service) => {
    expect(service.init()).not.toBeNull();
  })));

  it("USD currency should return", async(inject([CurrencyService], (service) => {
    expect(service.getCurrency("USD")).not.toBeNull();
  })));

});
