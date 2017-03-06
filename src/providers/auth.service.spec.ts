import { Storage } from '@ionic/storage';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Injectable, NgZone } from '@angular/core';

import { environment } from '../environments/environment';
import {AuthService} from './auth.service';




describe('Auth Service', () => {
    beforeEach(() => {
       this.AuthService = new AuthService();
    
    });
  
     it('Auth authenticated response should not be null', () => {
        
        
        expect(this.AuthService.authenticated()).not.toBeNull();
    });
  
    });