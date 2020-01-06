import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersMoreProfitsComponent } from './customers-more-profits.component';

describe('CustomersMoreProfitsComponent', () => {
  let component: CustomersMoreProfitsComponent;
  let fixture: ComponentFixture<CustomersMoreProfitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersMoreProfitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersMoreProfitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
