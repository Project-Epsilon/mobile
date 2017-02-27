import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {environment} from "../environments/environment";
import {BankTransferService} from './bank.service';
import {AuthHttp} from "angular2-jwt";

//check deposit
describe('Bank Service', () => {
    beforeEach(() => {
      this.BankTransferService = new BankTransferService();
    });
    //check if deposit is not null
     it('Deposit response should not be null', () => {
        
        expect(this.BankTransferService.deposit(2.00,'USD')).not.toBeNull();;
    });
     //check if withdrawl is not null
     it('Withdrawl response should  be null', () => {
        
        expect(this.BankTransferService.Withdrawl(2,'USD')).not.toBeNull();;
    });
  
    });
   
  
  
  })