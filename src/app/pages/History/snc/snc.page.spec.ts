import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SncPage } from './snc.page';

describe('SncPage', () => {
  let component: SncPage;
  let fixture: ComponentFixture<SncPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SncPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
