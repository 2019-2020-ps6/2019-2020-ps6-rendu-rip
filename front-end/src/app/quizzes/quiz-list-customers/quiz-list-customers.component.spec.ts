import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListCustomersComponent } from './quiz-list-customers.component';

describe('QuizListCustomersComponent', () => {
  let component: QuizListCustomersComponent;
  let fixture: ComponentFixture<QuizListCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizListCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizListCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
