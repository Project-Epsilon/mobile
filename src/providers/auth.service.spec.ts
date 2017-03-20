import { Injectable, NgZone } from "@angular/core";
import { async, inject, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Storage } from "@ionic/storage";
import { AUTH_PROVIDERS, AuthConfig, AuthHttp, provideAuth, tokenNotExpired } from "angular2-jwt";
import { environment } from "../environments/environment";
import { AuthService } from "./auth.service";

/**
 * Auth test suite
 */
describe("Auth Service", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
          deps: [MockBackend, BaseRequestOptions],
        },
        {
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
          },
          deps: [Http],
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
    expect(service.login ("Google")).not.toBeNull();
  })));

});
