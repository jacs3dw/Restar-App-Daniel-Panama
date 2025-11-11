import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CparcelPage } from './cparcel.page';

describe('CparcelPage', () => {
  let component: CparcelPage;
  let fixture: ComponentFixture<CparcelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CparcelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
