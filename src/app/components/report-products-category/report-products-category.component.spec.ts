import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProductsCategoryComponent } from './report-products-category.component';

describe('ReportProductsCategoryComponent', () => {
  let component: ReportProductsCategoryComponent;
  let fixture: ComponentFixture<ReportProductsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportProductsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProductsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
