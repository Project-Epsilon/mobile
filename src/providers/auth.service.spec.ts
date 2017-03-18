import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../environments/environment';
import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AuthService } from './auth.service';
import { Storage } from "@ionic/storage";

/**
 * Auth test suite
 */
describe('Auth Service', () => {

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
        Storage,
        MockBackend,
        BaseRequestOptions,
        AuthService
      ]

    });
  });


  it('Get authentication response should not be null', async(inject([AuthService], (service) => {
    expect(this.AuthService.authenticated()).not.toBeNull();
  })));

});