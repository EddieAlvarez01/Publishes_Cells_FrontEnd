import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserCrudComponent } from './edit-user-crud.component';

describe('EditUserCrudComponent', () => {
  let component: EditUserCrudComponent;
  let fixture: ComponentFixture<EditUserCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
