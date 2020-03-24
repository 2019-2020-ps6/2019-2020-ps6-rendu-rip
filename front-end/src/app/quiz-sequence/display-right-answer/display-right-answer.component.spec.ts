import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRightAnswerComponent } from './display-right-answer.component';

describe('DisplayRightAnswerComponent', () => {
  let component: DisplayRightAnswerComponent;
  let fixture: ComponentFixture<DisplayRightAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayRightAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRightAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
