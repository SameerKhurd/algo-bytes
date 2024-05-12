import { Component, OnInit } from '@angular/core';
import {
  ApplicationPayload,
  BookmarkPayload,
} from 'src/app/interfaces/payload.interface';
import {
  difficultyLevelProperties,
  userQuestionStatusPropeties,
} from 'src/app/interfaces/question.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ApplicationService } from 'src/app/services/http-services/application.service';
import { BookmarkService } from 'src/app/services/http-services/bookmark.service';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss'],
})
export class ProblemsComponent {
  loading = true;
  loadingArray = new Array(5);
  difficultyLevelProperties: any = difficultyLevelProperties;
  userQuestionStatusPropeties: any = userQuestionStatusPropeties;

  constructor(
    public dataService: DataService,
    private applicationService: ApplicationService,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    console.log(this.dataService.questions);
    this.getApplicationData();
  }

  private getApplicationData(): void {
    this.loading = true;
    const payload: ApplicationPayload = {
      uid: this.dataService.user.uid,
    };
    this.dataService.addLoadingQuestion();
    this.applicationService.getApplicationData(payload).subscribe({
      next: (result: any) => {
        this.dataService.user = {
          uid: result.uid,
          username: result.username,
          email: result.email,
        };
        this.dataService.processQuestions(
          result.questions,
          result.userQuestions
        );
        this.dataService.check();
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
      },
      complete: () => {},
    });
  }

  onBookmark(questionIndex: number) {
    const question = this.dataService.questions[questionIndex];
    question.bookmark = !question.bookmark;
    const payload: BookmarkPayload = {
      uid: this.dataService.user.uid,
      qid: question.qid,
      bookmark: question.bookmark,
    };
    this.bookmarkService.updateBookmark(payload).subscribe({
      next: (result: any) => {},
      error: (error: any) => {},
      complete: () => {},
    });
  }
}
