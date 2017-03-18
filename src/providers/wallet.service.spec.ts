import 'rxjs/add/operator/map';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { WalletsService } from "./wallet.service";

/**
 * Wallet test suite
 */
describe('Wallet Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
          deps: [Http]
        },
        MockBackend,
        BaseRequestOptions,
        WalletsService
      ]

    });

  });


  it('Get wallets service should not be null', async(inject([WalletsService], (service) => {
    expect(service).toBeDefined();
  })));

  it('Get wallets response should defined', async(inject([WalletsService], (service) => {
    expect(service.getWallets()).toBeDefined();
  })));

});
