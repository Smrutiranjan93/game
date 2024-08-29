import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurDistributorsComponent } from './our-distributors.component';

describe('OurDistributorsComponent', () => {
  let component: OurDistributorsComponent;
  let fixture: ComponentFixture<OurDistributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurDistributorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
