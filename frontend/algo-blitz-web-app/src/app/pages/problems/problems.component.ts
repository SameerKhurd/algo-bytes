import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApplicationPayload,
  BookmarkPayload,
} from 'src/app/interfaces/payload.interface';
import {
  difficultyLevelProperties,
  userQuestionStatusPropeties,
  QuestionLevel,
} from 'src/app/interfaces/question.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ApplicationService } from 'src/app/services/http-services/application.service';
import { BookmarkService } from 'src/app/services/http-services/bookmark.service';

const mainActionButtons: {
  icon: string;
  iconStyleClass: string;
  label: string;
  value: number;
}[] = [
  {
    icon: 'pi-globe',
    iconStyleClass: 'text-primary',
    label: 'All Problems',
    value: QuestionLevel.ALL,
  },
  {
    icon: 'pi-bolt',
    iconStyleClass: 'text-warning',
    label: 'Top <strong>10</strong> Problems',
    value: QuestionLevel.TOP_10,
  },
  {
    icon: 'pi-box',
    iconStyleClass: 'text-success',
    label: 'Top <strong>25</strong> Problems',
    value: QuestionLevel.TOP_25,
  },
];

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
  mainActionButtons = mainActionButtons;
  selectedMainButton: QuestionLevel = QuestionLevel.ALL;

  constructor(
    public dataService: DataService,
    private applicationService: ApplicationService,
    private bookmarkService: BookmarkService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.dataService.questions);
    this.getApplicationData();
  }

  onMainButtonSelect(mainButtonValue: QuestionLevel) {
    this.selectedMainButton = mainButtonValue;
    this.dataService.filterQuestions(this.selectedMainButton);
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
        this.dataService.filterQuestions(this.selectedMainButton);
        this.dataService.check();
        this.loading = false;
      },
      error: (error: any) => {
        this.dataService.processQuestions([], []);
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

  onPickAny() {
    if (this.dataService.filteredQuestions.length) {
      const randomQuestionIndex = Math.floor(
        Math.random() * this.dataService.filteredQuestions.length
      );
      this.router.navigate(
        [this.dataService.filteredQuestions[randomQuestionIndex].qid],
        {
          relativeTo: this.activatedRoute,
        }
      );
    }
  }
}
