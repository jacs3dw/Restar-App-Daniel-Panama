import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SspPage } from './ssp.page';

describe('SspPage', () => {
  let component: SspPage;
  let fixture: ComponentFixture<SspPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SspPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
