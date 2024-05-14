import { Component, Input } from '@angular/core';
import {
  ProblemLoadingState,
  ExecutionState,
} from 'src/app/interfaces/problem-loading-state.interface';
import { Question } from 'src/app/interfaces/question.interface';
import {
  TestResult,
  TestcaseStatus,
} from 'src/app/interfaces/test-result.interface';

const TestcaseTitle = {
  passed: {
    icon: 'pi-check',
    label: 'Passed',
    cssClass: 'text-success',
  },
  failed: {
    icon: 'pi-times',
    label: 'Wrong Output',
    cssClass: 'text-danger',
  },
  error: {
    icon: 'pi-times',
    label: 'Runtime Error',
    cssClass: 'text-danger',
  },
  tle: {
    icon: 'pi-clock',
    label: 'Time Limit Exceeded',
    cssClass: 'text-danger',
  },
};


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  @Input() loadingState!: ProblemLoadingState;
  @Input() question!: Question;
  executionState = ExecutionState;
  testcaseStatus = TestcaseStatus;
  testcaseTitle: any = TestcaseTitle;
  currTestcaseIndex = 0;
  currTestResult!: TestResult;

  @Input()
  set testResult(testResult: TestResult) {
    if (testResult) {
      this.currTestResult = testResult;
      this.currTestcaseIndex = 0;
    }
  }

  onTestcaseSelect(testcaseIndex: number) {
    this.currTestcaseIndex = testcaseIndex;
  }
  
}
