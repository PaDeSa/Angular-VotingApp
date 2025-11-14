import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBulletin } from './save-bulletin';

describe('SaveBulletin', () => {
  let component: SaveBulletin;
  let fixture: ComponentFixture<SaveBulletin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveBulletin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveBulletin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
