import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommentsAssignedComponent } from './report-comments-assigned.component';

describe('ReportCommentsAssignedComponent', () => {
  let component: ReportCommentsAssignedComponent;
  let fixture: ComponentFixture<ReportCommentsAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCommentsAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCommentsAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
