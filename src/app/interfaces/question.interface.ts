export const enum Difficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
}

export interface Question {
  qid: string;
  diff: Difficulty;
  tags: string[];
  title: string;
  prompt: string[];
  examples: { input: string; output: string; explanations: string[] }[];
  constraints: string[];
  functionArguments: string[];
}

export enum UserQuestionStatus {
  UNSOLVED = 0,
  ATTEMPTED = 1,
  SOLVED = 2,
}

export enum ProgrammingLanguage {
  PYTHON3 = 0,
  JAVA = 1,
  C = 2,
  CPP = 3,
  JAVASCRIPT = 4,
  TYPESCRIPT = 5,
}

export const programmingLanguages = {
  0: { label: 'Python3' },
  1: { label: 'Java' },
  2: { label: 'C' },
  3: { label: 'C++' },
  4: { label: 'JavaScript' },
  5: { label: 'Typescript' },
};

export interface QuestionTable {
  accepted: number;
  diff: Difficulty;
  qid: string;
  submitted: number;
  tags: string[];
  title: string;
  status: UserQuestionStatus;
  bookmark: boolean;
}

export const difficultyLevelProperties = {
  1: { cssClass: 'text-success fw-bold', label: 'Easy' },
  2: { cssClass: 'text-warning', label: 'Medium' },
  3: { cssClass: 'text-danger', label: 'Hard' },
  4: { cssClass: 'text-secondary', label: 'Expert' },
};

export const userQuestionStatusPropeties = {
  0: {
    icon: '',
    label: '',
    cssClass: 'text-success',
  },
  1: {
    icon: 'pi-minus-circle',
    label: 'Attempted',
    cssClass: 'text-warning',
  },
  2: {
    icon: 'pi-check-circle',
    label: 'Solved',
    cssClass: 'text-success',
  },
};

export interface Question {
  question: {
    qid: string;
    diff: Difficulty;
    tags: string[];
    title: string;
    prompt: string[];
    examples: { input: string; output: string; explanations: string[] }[];
    constraints: string[];
    functionArguments: string[];
  };
  testcases: { tid: string; input: any[]; expected: any }[];
}
