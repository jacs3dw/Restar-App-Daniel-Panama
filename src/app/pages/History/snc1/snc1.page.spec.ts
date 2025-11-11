import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Snc1Page } from './snc1.page';

describe('Snc1Page', () => {
  let component: Snc1Page;
  let fixture: ComponentFixture<Snc1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Snc1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
