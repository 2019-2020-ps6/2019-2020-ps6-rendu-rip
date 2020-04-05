import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRightVersusAnswerSelectedComponent } from './display-right-versus-answer-selected.component';

describe('DisplayRightVersusAnswerSelectedComponent', () => {
  let component: DisplayRightVersusAnswerSelectedComponent;
  let fixture: ComponentFixture<DisplayRightVersusAnswerSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayRightVersusAnswerSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRightVersusAnswerSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
