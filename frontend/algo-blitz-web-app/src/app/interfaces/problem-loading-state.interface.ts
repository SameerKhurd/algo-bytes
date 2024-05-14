export enum ApplicationState {
  COMPLETE = 0,
  LOADING = 1,
  ERROR = 2,
}

export enum QuestionState {
  COMPLETE = 0,
  LOADING = 1,
  ERROR = 2,
}

export enum UserQuestionSubmissionsState {
  COMPLETE = 0,
  LOADING = 1,
  ERROR = 2,
}

export enum SubmissionState {
  COMPLETE = 0,
  LOADING = 1,
  ERROR = 2,
}

export enum ExecutionState {
  COMPLETE = 0,
  RUN_LOADING = 1,
  SUBMIT_LOADING = 6,
  NORUN = 2,
  CLIENT_ERROR = 3,
  SERVER_ERROR = 4,
  TIMEOUT_ERROR = 5,
}

export interface ProblemLoadingState {
  question: QuestionState;
  execution: ExecutionState;
  isSubmissionTab: boolean;
}
