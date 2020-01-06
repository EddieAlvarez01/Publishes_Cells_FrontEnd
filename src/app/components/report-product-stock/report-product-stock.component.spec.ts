import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProductStockComponent } from './report-product-stock.component';

describe('ReportProductStockComponent', () => {
  let component: ReportProductStockComponent;
  let fixture: ComponentFixture<ReportProductStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportProductStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProductStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
