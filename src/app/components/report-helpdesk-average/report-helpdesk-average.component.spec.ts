import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHelpdeskAverageComponent } from './report-helpdesk-average.component';

describe('ReportHelpdeskAverageComponent', () => {
  let component: ReportHelpdeskAverageComponent;
  let fixture: ComponentFixture<ReportHelpdeskAverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportHelpdeskAverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportHelpdeskAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
