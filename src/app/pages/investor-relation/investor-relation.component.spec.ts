import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorRelationComponent } from './investor-relation.component';

describe('InvestorRelationComponent', () => {
  let component: InvestorRelationComponent;
  let fixture: ComponentFixture<InvestorRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestorRelationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestorRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
