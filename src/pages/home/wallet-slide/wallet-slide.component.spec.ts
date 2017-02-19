/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WalletSlideComponent } from './wallet-slide.component';

describe('WalletSlideComponent', () => {
  let component: WalletSlideComponent;
  let fixture: ComponentFixture<WalletSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
