import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApplicationPayload,
  BookmarkPayload,
} from 'src/app/interfaces/payload.interface';
import { ApplicationState } from 'src/app/interfaces/problem-loading-state.interface';
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
  routerLink: string;
  value: number;
}[] = [
  {
    icon: 'pi-globe',
    iconStyleClass: 'text-primary',
    label: 'All Problems',
    routerLink: '/problems',
    value: QuestionLevel.ALL,
  },
  {
    icon: 'pi-bolt',
    iconStyleClass: 'text-warning',
    label: 'Top <strong>10</strong> Problems',
    routerLink: '/problems/top-10',
    value: QuestionLevel.TOP_10,
  },
  {
    icon: 'pi-box',
    iconStyleClass: 'text-success',
    label: 'Top <strong>25</strong> Problems',
    routerLink: '/problems/top-25',
    value: QuestionLevel.TOP_25,
  },
];

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss'],
})
export class ProblemsComponent {
  loadingArray = new Array(5);
  difficultyLevelProperties: any = difficultyLevelProperties;
  userQuestionStatusPropeties: any = userQuestionStatusPropeties;
  mainActionButtons = mainActionButtons;
  //selectedMainButton: QuestionLevel = QuestionLevel.ALL;
  applicationState = ApplicationState;

  constructor(
    public dataService: DataService,
    private applicationService: ApplicationService,
    private bookmarkService: BookmarkService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.url.subscribe((params) => {
      switch (params[0]?.path) {
        case 'top-10': {
          this.dataService.updatefilterQuestionLevel(QuestionLevel.TOP_10);
          break;
        }
        case 'top-25': {
          this.dataService.updatefilterQuestionLevel(QuestionLevel.TOP_25);
          break;
        }
        default: {
          this.dataService.updatefilterQuestionLevel(QuestionLevel.ALL);
          break;
        }
      }
    });

    this.dataService.applicationStateEvent.subscribe(
      (applicationState: ApplicationState) => {
        if (applicationState === ApplicationState.COMPLETE) {
          this.dataService.updateCurrQuestion();
        }
      }
    );
  }

  ngOnInit(): void {
    //this.getApplicationData();
  }

  onMainButtonSelect(mainButtonValue: QuestionLevel) {
    this.dataService.updatefilterQuestionLevel(mainButtonValue);
    //this.dataService.filterQuestions(this.selectedMainButton);
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

  reloadPage() {
    window.location.reload();
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
