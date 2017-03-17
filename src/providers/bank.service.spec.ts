import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {environment} from "../environments/environment";
import {BankTransferService} from './bank.service';
import {AuthHttp} from "angular2-jwt";
import {TestBed, async, inject} from '@angular/core/testing';
import {BaseRequestOptions, Http, HttpModule, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Storage} from "@ionic/storage";
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
                Storage,
                AuthHttp,
                MockBackend,
                BaseRequestOptions,
                BankTransferService
            ]

        });


    it('Deposit response should not be null', () => {
        expect(this.BankTransferService.deposit(2.00, 'USD')).not.toBeNull();
    });

    it('Withdrawl response should  be null', () => {
        expect(this.BankTransferService.Withdrawl(2, 'USD')).not.toBeNull();
    });

});

})