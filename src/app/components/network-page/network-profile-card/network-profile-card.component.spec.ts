import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkProfileCardComponent } from './network-profile-card.component';

describe('NetworkProfileCardComponent', () => {
  let component: NetworkProfileCardComponent;
  let fixture: ComponentFixture<NetworkProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkProfileCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetworkProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
