export interface ExecutePayload {
  uid: string;
  qid: string;
  submit: boolean;
  code: string;
  language: number;
}

export interface BookmarkPayload {
  uid: string;
  qid: string;
  bookmark: boolean;
}

export interface ApplicationPayload {
  uid: string;
}

export interface UserQuestionSubmissionsPayload {
  uid: string;
  qid: string;
}
