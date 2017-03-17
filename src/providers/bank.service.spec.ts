import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {environment} from "../environments/environment";
import {BankTransferService} from './bank.service';
import {AuthHttp} from "angular2-jwt";
/**
 * Bank test suite
 */
describe('Bank Service', () => {
    beforeEach(() => {
        this.BankTransferService = new BankTransferService();
    });

    it('Deposit response should not be null', () => {
        expect(this.BankTransferService.deposit(2.00, 'USD')).not.toBeNull();
    });

    it('Withdrawl response should  be null', () => {
        expect(this.BankTransferService.Withdrawl(2, 'USD')).not.toBeNull();
    });

});

})