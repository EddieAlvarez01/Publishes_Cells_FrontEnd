import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSetupHomeComponent } from './page-setup-home.component';

describe('PageSetupHomeComponent', () => {
  let component: PageSetupHomeComponent;
  let fixture: ComponentFixture<PageSetupHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSetupHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSetupHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
