import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUser } from './gestion-user';

describe('GestionUser', () => {
  let component: GestionUser;
  let fixture: ComponentFixture<GestionUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
