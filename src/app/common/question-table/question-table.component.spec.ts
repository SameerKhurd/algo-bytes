import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTableComponent } from './question-table.component';

describe('QuestionTableComponent', () => {
  let component: QuestionTableComponent;
  let fixture: ComponentFixture<QuestionTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionTableComponent]
    });
    fixture = TestBed.createComponent(QuestionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
