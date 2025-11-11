import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cp1Page } from './cp1.page';

describe('Cp1Page', () => {
  let component: Cp1Page;
  let fixture: ComponentFixture<Cp1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
