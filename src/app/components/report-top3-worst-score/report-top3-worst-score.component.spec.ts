import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTop3WorstScoreComponent } from './report-top3-worst-score.component';

describe('ReportTop3WorstScoreComponent', () => {
  let component: ReportTop3WorstScoreComponent;
  let fixture: ComponentFixture<ReportTop3WorstScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTop3WorstScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTop3WorstScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
