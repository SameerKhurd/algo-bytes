import {
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExecutePayload } from 'src/app/interfaces/payload.interface';
import {
  ExecutionState,
  ProblemLoadingState,
  QuestionState,
} from 'src/app/interfaces/problem-loading-state.interface';
import {
  ProgrammingLanguage,
  Question,
  QuestionTable,
} from 'src/app/interfaces/question.interface';
import { TestResult } from 'src/app/interfaces/test-result.interface';
import { DataService } from 'src/app/services/data.service';
import { ApplicationService } from 'src/app/services/http-services/application.service';
import { SubmissionService } from 'src/app/services/http-services/submission.service';
import { PromptComponent } from './layout/prompt/prompt.component';

export interface WindowSize {
  height: number;
  width: number;
}

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
})
export class ProblemComponent implements OnInit {
  @ViewChild('promptChildComponent', { static: false })
  promptChildComponent!: PromptComponent;
  loadingState: ProblemLoadingState = {
    question: QuestionState.LOADING,
    execution: ExecutionState.RUN_LOADING,
    isSubmissionTab: false,
  };
  question!: Question;
  testResult!: TestResult;
  functionArguments: string[] = [];
  avialableHeight = 0;

  constructor(
    public dataService: DataService,
    private applicationService: ApplicationService,
    private submissionService: SubmissionService,
    route: ActivatedRoute
  ) {
    this.avialableHeight = window.innerHeight;

    let qid = route.snapshot.paramMap.get('qid');
    qid = qid ? qid : '';
    this.dataService.qid = qid;
  }

  ngOnInit(): void {
    this.getQuestion(this.dataService.qid);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event.target.innerHeight);
    this.avialableHeight = event.target.innerHeight;
    event.target.innerWidth;
  }

  getQuestion(qid: string) {
    //this.loadingState.execution = ExecutionState.NORUN;
    this.loadingState.question = QuestionState.LOADING;
    this.loadingState.execution = ExecutionState.RUN_LOADING;

    this.applicationService.getQuestion(qid).subscribe({
      next: (result: any) => {
        this.question = result.question;
        this.dataService.qid = qid;
        this.functionArguments = this.question.functionArguments;
        this.loadingState.question = QuestionState.COMPLETE;
        this.loadingState.execution = ExecutionState.NORUN;
      },
      error: (error: any) => {
        this.loadingState.question = QuestionState.ERROR;
        this.loadingState.execution = ExecutionState.CLIENT_ERROR;
      },
      complete: () => {},
    });
  }

  executeCode(codeEvent: {
    code: string;
    submit: boolean;
    language: ProgrammingLanguage;
  }) {
    this.loadingState.execution = codeEvent.submit
      ? ExecutionState.SUBMIT_LOADING
      : ExecutionState.RUN_LOADING;
    const payload: ExecutePayload = {
      uid: this.dataService.user.uid,
      qid: this.question.qid,
      code: codeEvent.code,
      submit: codeEvent.submit,
      language: codeEvent.language,
    };
    this.submissionService.execute(payload).subscribe({
      next: (result: any) => {
        this.testResult = result;

        if (this.testResult.isSubmit) {
          if (this.loadingState.isSubmissionTab) {
            this.promptChildComponent.invokeGetUserQuestionSubmissions();
          }
          this.loadingState.isSubmissionTab = true;
        }

        if (this.dataService.questionTable) {
          this.dataService.questionTable.submitted++;
          if (this.testResult.finalStatus) {
            this.dataService.questionTable.accepted++;
          }
        }

        this.loadingState.execution = ExecutionState.COMPLETE;
      },
      error: (error: any) => {
        this.loadingState.execution = ExecutionState.SERVER_ERROR;
      },
      complete: () => {},
    });
  }
}
