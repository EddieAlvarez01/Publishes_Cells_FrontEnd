import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAdminYearComponent } from './report-admin-year.component';

describe('ReportAdminYearComponent', () => {
  let component: ReportAdminYearComponent;
  let fixture: ComponentFixture<ReportAdminYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAdminYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAdminYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
