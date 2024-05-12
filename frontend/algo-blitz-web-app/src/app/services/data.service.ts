import { Injectable } from '@angular/core';
import {
  QuestionTable,
  UserQuestionStatus,
} from '../interfaces/question.interface';

export interface User {
  uid: string;
  username: string;
  email: string;
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
  questions: QuestionTable[] = [];
  questionTable?: QuestionTable;
  private currQid = '';

  constructor() {}

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
    this.questions = allQuestions.map((question: any) => {
      console.log(
        userQuestions[question.qid],
        userQuestions[question.qid]?.bookmark
      );
      return {
        accepted: question.accepted,
        qid: question.qid,
        diff: question.diff,
        submitted: question.submitted,
        title: question.title,
        status:
          userQuestions[question.qid]! && userQuestions[question.qid]?.status
            ? userQuestions[question.qid].status
            : UserQuestionStatus.UNSOLVED,
        bookmark:
          userQuestions[question.qid]! && userQuestions[question.qid]?.bookmark
            ? userQuestions[question.qid].bookmark
            : false,
      };
    });
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
      },
    ];
  }

  set qid(qid: string) {
    if (qid !== this.currQid) {
      this.questionTable = undefined;
    }
    this.currQid = qid;
    this.check();
  }

  check() {
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
}
