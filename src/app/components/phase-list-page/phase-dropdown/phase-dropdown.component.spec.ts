import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseDropdownComponent } from './phase-dropdown.component';

describe('PhaseDropdownComponent', () => {
  let component: PhaseDropdownComponent;
  let fixture: ComponentFixture<PhaseDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhaseDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
