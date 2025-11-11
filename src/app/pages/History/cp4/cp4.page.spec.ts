import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cp4Page } from './cp4.page';

describe('Cp4Page', () => {
  let component: Cp4Page;
  let fixture: ComponentFixture<Cp4Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
