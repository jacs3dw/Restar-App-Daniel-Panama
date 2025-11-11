import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackorderPage } from './trackorder.page';

describe('TrackorderPage', () => {
  let component: TrackorderPage;
  let fixture: ComponentFixture<TrackorderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
