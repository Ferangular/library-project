import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLibraryComponent } from './first-library.component';

describe('FirstLibraryComponent', () => {
  let component: FirstLibraryComponent;
  let fixture: ComponentFixture<FirstLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstLibraryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FirstLibraryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
