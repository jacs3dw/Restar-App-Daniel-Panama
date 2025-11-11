import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnborPage } from './onbor.page';

describe('OnborPage', () => {
  let component: OnborPage;
  let fixture: ComponentFixture<OnborPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OnborPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
