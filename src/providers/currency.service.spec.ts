import 'rxjs/add/operator/map';
import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Storage } from "@ionic/storage";
import { CurrencyService } from "./currency.service";

/**
 * Currency test suite
 */
describe('Currency Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
          deps: [MockBackend, BaseRequestOptions]
        },
        Storage,
        MockBackend,
        BaseRequestOptions,
        CurrencyService
      ]

    });
  });

  it('should construct', async(inject([CurrencyService], (service) => {
    expect(service).toBeDefined();
  })));

  it('get currencies should return', async(inject([CurrencyService], (service) => {
    expect(service.init()).not.toBeNull();
  })));

  it('USD currency should return', async(inject([CurrencyService], (service) => {
    expect(service.getCurrency('USD')).not.toBeNull();
  })));

});
  