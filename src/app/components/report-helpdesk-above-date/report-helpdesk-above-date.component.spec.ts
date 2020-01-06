import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHelpdeskAboveDateComponent } from './report-helpdesk-above-date.component';

describe('ReportHelpdeskAboveDateComponent', () => {
  let component: ReportHelpdeskAboveDateComponent;
  let fixture: ComponentFixture<ReportHelpdeskAboveDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportHelpdeskAboveDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportHelpdeskAboveDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
