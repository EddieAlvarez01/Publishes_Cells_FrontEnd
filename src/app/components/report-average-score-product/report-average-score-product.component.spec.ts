import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAverageScoreProductComponent } from './report-average-score-product.component';

describe('ReportAverageScoreProductComponent', () => {
  let component: ReportAverageScoreProductComponent;
  let fixture: ComponentFixture<ReportAverageScoreProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAverageScoreProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAverageScoreProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
