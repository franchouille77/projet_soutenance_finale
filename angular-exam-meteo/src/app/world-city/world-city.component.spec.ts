import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldCityComponent } from './world-city.component';

describe('WorldCityComponent', () => {
  let component: WorldCityComponent;
  let fixture: ComponentFixture<WorldCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
