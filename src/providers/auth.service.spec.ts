import { inject, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AuthConfig, AuthHttp } from "angular2-jwt";
import { AuthService } from "./auth.service";

/**
 * Auth test suite
 */
describe("Auth Service", () => {

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
        Storage,
        MockBackend,
        BaseRequestOptions,
        AuthService,
      ],

    });
  });

  it("Get authentication response should not be null", (inject([AuthService], (service) => {
    expect(service.authenticated()).not.toBeNull();
  })));

  it("Login response should not be null", (inject([AuthService], (service) => {
    expect(service.login("Google")).not.toBeNull();
  })));

  it("OTP response should not be null", (inject([AuthService], (service) => {
    service.otp("Google","obj1").toPromise().then((result) => {

      expect(result).not.toBeNull();
    });

  })));


  it("UPDATE response should not be null", (inject([AuthService], (service) => {
    service.updateUserInfo("Google").toPromise().then((result) => {
      expect(result).not.toBeNull();
    });
  })));

  it("logout response should not be null", (inject([AuthService], (service) => {

    expect(service.logout()).not.toBeNull();

  })));


});
