import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionElection } from './gestion-election';

describe('GestionElection', () => {
  let component: GestionElection;
  let fixture: ComponentFixture<GestionElection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionElection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionElection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
