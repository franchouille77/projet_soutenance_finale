import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturesDetailsComponent } from './temperatures-details.component';

describe('TemperaturesDetailsComponent', () => {
  let component: TemperaturesDetailsComponent;
  let fixture: ComponentFixture<TemperaturesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperaturesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperaturesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
