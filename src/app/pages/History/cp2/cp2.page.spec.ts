import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cp2Page } from './cp2.page';

describe('Cp2Page', () => {
  let component: Cp2Page;
  let fixture: ComponentFixture<Cp2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
