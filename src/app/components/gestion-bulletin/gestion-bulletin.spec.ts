import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBulletin } from './gestion-bulletin';

describe('GestionBulletin', () => {
  let component: GestionBulletin;
  let fixture: ComponentFixture<GestionBulletin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionBulletin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBulletin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
