import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cp3Page } from './cp3.page';

describe('Cp3Page', () => {
  let component: Cp3Page;
  let fixture: ComponentFixture<Cp3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
