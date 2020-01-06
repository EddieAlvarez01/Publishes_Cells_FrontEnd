import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTop3CustomersComponent } from './report-top3-customers.component';

describe('ReportTop3CustomersComponent', () => {
  let component: ReportTop3CustomersComponent;
  let fixture: ComponentFixture<ReportTop3CustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTop3CustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTop3CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
