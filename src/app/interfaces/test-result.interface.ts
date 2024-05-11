export enum TestcaseStatus {
  PASSED = 'passed',
  FAILED = 'failed',
  TLE = 'tle',
  ERROR = 'error',
}

export interface TestResult {
  finalStatus: boolean;
  passedCases: number;
  totalCases: number;
  results: {
    tid: string;
    input: any[];
    expected: number;
    output: number;
    status: TestcaseStatus;
    stdout: string;
    stderr: string;
    executionTime: number;
  }[];
  error: boolean;
  errorText: string;
  isSubmit: boolean;
}
