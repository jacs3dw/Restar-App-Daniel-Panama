import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Snc2Page } from './snc2.page';

describe('Snc2Page', () => {
  let component: Snc2Page;
  let fixture: ComponentFixture<Snc2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Snc2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
