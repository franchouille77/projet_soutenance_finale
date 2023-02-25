import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturesListComponent } from './temperatures-list.component';

describe('TemperaturesListComponent', () => {
  let component: TemperaturesListComponent;
  let fixture: ComponentFixture<TemperaturesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperaturesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperaturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
