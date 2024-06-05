import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkLeftSidebarComponent } from './network-left-sidebar.component';

describe('NetworkLeftSidebarComponent', () => {
  let component: NetworkLeftSidebarComponent;
  let fixture: ComponentFixture<NetworkLeftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkLeftSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetworkLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
