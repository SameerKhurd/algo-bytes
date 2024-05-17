import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { programmingLanguages } from 'src/app/interfaces/question.interface';
import { UserQuestionSubmission } from 'src/app/interfaces/submission.interface';
import { DataService } from 'src/app/services/data.service';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import {
  SubmissionState,
  UserQuestionSubmissionsState,
} from 'src/app/interfaces/problem-loading-state.interface';
import { SubmissionService } from 'src/app/services/http-services/submission.service';
import { UserQuestionSubmissionsPayload } from 'src/app/interfaces/payload.interface';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss'],
})
export class SubmissionsComponent implements OnInit {
  @Output() onBackEvent = new EventEmitter<any>();
  loadingUserQuestionSubmissions = UserQuestionSubmissionsState.LOADING;
  loadingSubmission = SubmissionState.LOADING;
  userQuestionSubmissionsState = UserQuestionSubmissionsState;
  submissionState = SubmissionState;
  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    readOnly: true,
    language: 'python',
    minimap: { enabled: false },
  };
  submittedCode = '';
  submissions: UserQuestionSubmission[] = [];
  loadingArray = new Array(5);
  programmingLanguages: any = programmingLanguages;
  selectedSubmission!: UserQuestionSubmission;

  constructor(
    public dataService: DataService,
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    this.getUserQuestionSubmissions();
  }

  getUserQuestionSubmissions() {
    this.loadingUserQuestionSubmissions = UserQuestionSubmissionsState.LOADING;
    this.loadingSubmission = SubmissionState.LOADING;
    this.submissions = [
      {
        language: 0,
        runtime: 0,
        sid: '',
        status: true,
        time: '',
      },
    ];

    const payload: UserQuestionSubmissionsPayload = {
      uid: this.dataService.user.uid,
      qid: this.dataService.qid,
    };

    this.submissionService.getUserQuestionSubmissions(payload).subscribe({
      next: (result: any) => {
        this.submissions = result.reverse();

        if (this.submissions.length) {
          this.onSubmissionSelect(this.submissions[0]);
        }
        this.loadingUserQuestionSubmissions =
          UserQuestionSubmissionsState.COMPLETE;
      },
      error: (error: any) => {
        this.submissions = [];
        this.loadingUserQuestionSubmissions =
          UserQuestionSubmissionsState.ERROR;
      },
      complete: () => {},
    });
  }

  onSubmissionSelect(selectedSubmission: UserQuestionSubmission) {
    if (selectedSubmission !== this.selectedSubmission) {
      this.selectedSubmission = selectedSubmission;
      this.getSubmission();
    }
  }

  getSubmission() {
    this.loadingSubmission = SubmissionState.LOADING;
    this.submittedCode = '';

    this.submissionService
      .getSubmission(this.selectedSubmission.sid)
      .subscribe({
        next: (result: any) => {
          this.submittedCode = result.code;
          this.loadingSubmission = SubmissionState.COMPLETE;
        },
        error: (error: any) => {
          this.loadingSubmission = SubmissionState.ERROR;
        },
        complete: () => {},
      });
  }

  onBack() {
    this.onBackEvent.emit(true);
  }
}
