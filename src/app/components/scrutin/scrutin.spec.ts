import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scrutin } from './scrutin';

describe('Scrutin', () => {
  let component: Scrutin;
  let fixture: ComponentFixture<Scrutin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scrutin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scrutin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
