import { Injectable } from '@angular/core';
import {
  Difficulty,
  QuestionLevel,
  QuestionTable,
  UserQuestionStatus,
} from '../interfaces/question.interface';
import { Subject } from 'rxjs';
import { ApplicationState } from '../interfaces/problem-loading-state.interface';

export interface User {
  uid: string;
  username: string;
  email: string;
}
const DifficultySolvedMap = {
  1: { solved: 'easySolved', total: 'totalEasy' },
  2: { solved: 'mediumSolved', total: 'totalMedium' },
  3: { solved: 'hardSolved', total: 'totalHard' },
};
const UserQuestionStatusMap = {
  2: 'solved',
  0: 'unsolved',
  1: 'attempted',
};

export interface ProfileProblemStats {
  solved: number;
  unsolved: number;
  total: number;
  attempted: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private currUser: User = {
    uid: '',
    username: '',
    email: '',
  };
  profileProblemStats!: ProfileProblemStats | any;
  statsChartData = [0, 0, 0, 1];
  questions: QuestionTable[] = [];
  filteredQuestions: QuestionTable[] = [];
  questionTable?: QuestionTable;
  private currQid = '';
  statsUpdateEvent = new Subject<boolean>();
  applicationStateEvent = new Subject<ApplicationState>();
  applicationState: ApplicationState = ApplicationState.LOADING;

  constructor() {
    this.initialiseProfileProblemStats();
  }

  set user(user: User) {
    this.currUser.uid = user.uid;
    this.currUser.username = user.username;
    this.currUser.email = user.email;

    localStorage.setItem('uid', user.uid);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
  }

  get user() {
    return this.currUser;
  }

  processQuestions(allQuestions: any, userQuestions: any) {
    this.filteredQuestions = [];
    this.questions = allQuestions.map((question: any): QuestionTable => {
      return {
        accepted: question.accepted,
        qid: question.qid,
        diff: question.diff,
        submitted: question.submitted,
        acceptance: (question.submitted > 0
          ? (question.accepted / question.submitted) * 100
          : 0
        ).toFixed(1),
        title: question.title,
        tags: question.tags,
        status:
          userQuestions[question.qid]! && userQuestions[question.qid]?.status
            ? userQuestions[question.qid].status
            : UserQuestionStatus.UNSOLVED,
        bookmark:
          userQuestions[question.qid]! && userQuestions[question.qid]?.bookmark
            ? userQuestions[question.qid].bookmark
            : false,
        questionLevel: question.questionLevel,
      };
    });

    this.updateProfileProblemStats();
  }

  updateProfileProblemStats() {
    this.initialiseProfileProblemStats();
    this.profileProblemStats.total = this.questions.length;
    for (let question of this.questions) {
      this.profileProblemStats[DifficultySolvedMap[question.diff].total]++;
      this.profileProblemStats[UserQuestionStatusMap[question.status]]++;
      if (question.status === UserQuestionStatus.SOLVED) {
        this.profileProblemStats[DifficultySolvedMap[question.diff].solved]++;
      }
    }
    this.profileProblemStats.unsolved =
      this.profileProblemStats.total - this.profileProblemStats.solved;
    this.statsChartData = [
      this.profileProblemStats.easySolved,
      this.profileProblemStats.mediumSolved,
      this.profileProblemStats.hardSolved,
      this.profileProblemStats.unsolved || 1,
    ];

    this.statsUpdateEvent.next(true);
  }

  private initialiseProfileProblemStats() {
    this.statsChartData = [0, 0, 0, 1];
    this.profileProblemStats = {
      solved: 0,
      unsolved: 0,
      total: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      attempted: 0,
      totalEasy: 0,
      totalMedium: 0,
      totalHard: 0,
    };
  }

  addLoadingQuestion() {
    this.questions = [
      {
        accepted: 0,
        diff: 1,
        qid: '',
        submitted: 0,
        tags: [],
        title: '',
        status: UserQuestionStatus.UNSOLVED,
        bookmark: false,
        questionLevel: QuestionLevel.ALL,
      },
    ];
    this.filteredQuestions = this.questions;
  }

  set qid(qid: string) {
    if (qid !== this.currQid) {
      this.questionTable = undefined;
    }
    this.currQid = qid;
    this.updateCurrQuestion();
  }

  updateCurrQuestion() {
    setTimeout(() => {
      this.checkQuestionTable();
    }, 3000);
    this.checkQuestionTable();
  }

  private checkQuestionTable() {
    this.questionTable = this.questions.find(
      (question: QuestionTable) => question.qid === this.currQid
    );
  }

  get qid() {
    return this.currQid;
  }

  filterQuestions(filterQuestionLevel: QuestionLevel) {
    this.filteredQuestions = this.questions.filter(
      (question: QuestionTable): boolean =>
        question.questionLevel <= filterQuestionLevel
    );
  }

  setApplicationState(applicationState: ApplicationState) {
    this.applicationState = applicationState;
    this.applicationStateEvent.next(applicationState);
  }
}
