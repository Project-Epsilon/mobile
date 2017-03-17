import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import{WalletsService} from "./wallet.service";
/**
 * Wallet test suite
 */
describe('Wallet Service', () => {
    beforeEach(() => {
        this.service = new WalletsService();
    });

    it('Get wallets response should not be null', () => {
        expect(this.service.getWallets()).not.toBeNull();
    });

});
