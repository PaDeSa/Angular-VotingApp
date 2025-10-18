import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Maininfo } from './maininfo';

describe('Maininfo', () => {
  let component: Maininfo;
  let fixture: ComponentFixture<Maininfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Maininfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Maininfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
