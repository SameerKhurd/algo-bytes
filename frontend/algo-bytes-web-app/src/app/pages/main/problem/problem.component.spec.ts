import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemComponent } from './problem.component';

describe('ProblemComponent', () => {
  let component: ProblemComponent;
  let fixture: ComponentFixture<ProblemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemComponent]
    });
    fixture = TestBed.createComponent(ProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
