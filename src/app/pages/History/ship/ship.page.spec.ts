import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipPage } from './ship.page';

describe('ShipPage', () => {
  let component: ShipPage;
  let fixture: ComponentFixture<ShipPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
