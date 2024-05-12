import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordEtudComponent } from './dashbord-etud.component';

describe('DashbordEtudComponent', () => {
  let component: DashbordEtudComponent;
  let fixture: ComponentFixture<DashbordEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordEtudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
