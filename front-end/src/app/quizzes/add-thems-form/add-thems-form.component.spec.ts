import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThemsFormComponent } from './add-thems-form.component';

describe('AddThemsFormComponent', () => {
  let component: AddThemsFormComponent;
  let fixture: ComponentFixture<AddThemsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddThemsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
