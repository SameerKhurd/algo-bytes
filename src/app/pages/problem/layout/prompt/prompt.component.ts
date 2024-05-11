import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { BookmarkPayload } from 'src/app/interfaces/payload.interface';
import {
  ProblemLoadingState,
  QuestionState,
} from 'src/app/interfaces/problem-loading-state.interface';
import {
  Question,
  difficultyLevelProperties,
  userQuestionStatusPropeties,
} from 'src/app/interfaces/question.interface';
import { DataService } from 'src/app/services/data.service';
import { BookmarkService } from 'src/app/services/http-services/bookmark.service';
import { SubmissionsComponent } from '../submissions/submissions.component';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
})
export class PromptComponent {
  @ViewChild('submissionsChildComponent', { static: false })
  submissionsChildComponent!: SubmissionsComponent;
  @Output() onRetryEvent = new EventEmitter<any>();

  @Input() loadingState!: ProblemLoadingState;
  currQuestion!: Question;
  questionState = QuestionState;
  userQuestionStatusPropeties = userQuestionStatusPropeties;
  difficultyLevelProperties: any = difficultyLevelProperties;

  @Input()
  set question(question: Question) {
    if (question !== undefined) {
      this.currQuestion = question;
      this.processPrompt();
    }
  }

  constructor(
    public dataService: DataService,
    public bookmarkService: BookmarkService
  ) {}

  private processPrompt(): void {
    this.currQuestion.prompt = this.currQuestion.prompt.map(
      (description: string) => {
        description = description.replaceAll(
          '<h>',
          '<small class="bg-highlight border rounded-3 px-1 font-monospace">'
        );
        description = description.replaceAll('</h>', '</small>');
        return description;
      }
    );
  }

  onBookmark() {
    if (this.dataService.questionTable) {
      this.dataService.questionTable.bookmark =
        !this.dataService.questionTable.bookmark;

      const payload: BookmarkPayload = {
        uid: this.dataService.user.uid,
        qid: this.dataService.qid,
        bookmark: this.dataService.questionTable.bookmark,
      };

      this.bookmarkService.updateBookmark(payload).subscribe({
        next: (result: any) => {},
        error: (error: any) => {},
        complete: () => {},
      });
    }
  }

  showSubmissionTab(visisble: boolean) {
    this.loadingState.isSubmissionTab = visisble;
  }

  invokeGetUserQuestionSubmissions() {
    this.submissionsChildComponent.getUserQuestionSubmissions();
  }

  onRetry() {
    this.onRetryEvent.emit(true);
  }
}
