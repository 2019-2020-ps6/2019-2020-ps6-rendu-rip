import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassewordComponent } from './passeword.component';

describe('PassewordComponent', () => {
  let component: PassewordComponent;
  let fixture: ComponentFixture<PassewordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassewordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassewordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
