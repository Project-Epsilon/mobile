import { async, inject, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import "rxjs/add/operator/map";
import { TransferService } from "./transfer.service";

/**
 * Bank test suite
 */
describe("Transfers Service", () => {
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
        TransferService,
      ],

    });

  });
  it("Transfer service should be defined", async(inject([TransferService], (service) => {
    expect(service).toBeDefined();
  })));

  it("send response should not be null", async(inject([TransferService], (service) => {
    expect(service.send(2.00, "USD")).not.toBeNull();
  })));

  it("getTransferByToken should not be null", async(inject([TransferService], (service) => {
    expect(service.getTransferByToken("token")).not.toBeNull();
  })));

  it("receive response should not be null", async(inject([TransferService], (service) => {
    expect(service.receive("token")).not.toBeNull();
  })));

  it("pending response should not be null", async(inject([TransferService], (service) => {
    expect(service.getPendingTransactions()).not.toBeNull();
  })));
});
