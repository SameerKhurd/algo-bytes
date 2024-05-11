import { ProgrammingLanguage } from './question.interface';

export const enum Difficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
}

export interface UserQuestionSubmission {
  language: ProgrammingLanguage;
  runtime: number;
  sid: string;
  status: boolean;
  time: string;
}
