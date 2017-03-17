import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import {Observable} from "rxjs";
import {TestBed, async, inject} from '@angular/core/testing';
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {environment} from "../environments/environment";
import{WalletsService} from "./wallet.service";
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

});
