import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSectionComponent } from './question-section.component';

describe('QuestionSectionComponent', () => {
  let component: QuestionSectionComponent;
  let fixture: ComponentFixture<QuestionSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionSectionComponent]
    });
    fixture = TestBed.createComponent(QuestionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
