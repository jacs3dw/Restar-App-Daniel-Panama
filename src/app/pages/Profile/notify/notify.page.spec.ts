import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifyPage } from './notify.page';

describe('NotifyPage', () => {
  let component: NotifyPage;
  let fixture: ComponentFixture<NotifyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
