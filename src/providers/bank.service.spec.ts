import { async, inject, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import "rxjs/add/operator/map";
import { BankTransferService } from "./bank.service";

/**
 * Bank test suite
 */
describe("Bank Service", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
        BankTransferService,
      ],

    });

  });
  it("service should be defined", async(inject([BankTransferService], (service) => {
    expect(service).toBeDefined();
  })));

  it("Deposit response should not be null", async(inject([BankTransferService], (service) => {
    expect(service.deposit(2.00, "USD")).not.toBeNull();
  })));

  it("USD should not be null", async(inject([BankTransferService], (service) => {
    expect(service.deposit(2.00, "USD")).not.toBeNull();
  })));

  it("Withdraw response should not be null", async(inject([BankTransferService], (service) => {
    expect(service.withdraw(1, 0.01, "user@gmail.com")).not.toBeNull();
  })));

});
