import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasMeteoComponent } from './datas-meteo.component';

describe('DatasMeteoComponent', () => {
  let component: DatasMeteoComponent;
  let fixture: ComponentFixture<DatasMeteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasMeteoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
