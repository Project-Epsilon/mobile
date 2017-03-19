import 'rxjs/add/operator/map';
import { BankTransferService } from './bank.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

/**
 * Bank test suite
 */
describe('Bank Service', () => {
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
        BankTransferService
      ]

    });

  });
  it('service should be defined', async(inject([BankTransferService], (service) => {
    expect(service).toBeDefined();
  })));

  it('Deposit response should not be null', async(inject([BankTransferService], (service) => {
    expect(service.deposit(2.00, 'USD')).not.toBeNull();
  })));

  it('USD should not be null', async(inject([BankTransferService], (service) => {
    expect(service.deposit(2.00, 'USD')).not.toBeNull();
  })));

  it('Withdraw response should not be null', async(inject([BankTransferService], (service) => {
    expect(service.withdraw(1, 0.01, 'user@gmail.com')).not.toBeNull();
  })));

});
