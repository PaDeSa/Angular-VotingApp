import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsOpened } from './elections-opened';

describe('ElectionsOpened', () => {
  let component: ElectionsOpened;
  let fixture: ComponentFixture<ElectionsOpened>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectionsOpened]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionsOpened);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
