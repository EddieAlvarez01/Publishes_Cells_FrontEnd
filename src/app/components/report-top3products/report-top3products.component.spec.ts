import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTop3productsComponent } from './report-top3products.component';

describe('ReportTop3productsComponent', () => {
  let component: ReportTop3productsComponent;
  let fixture: ComponentFixture<ReportTop3productsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTop3productsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTop3productsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
