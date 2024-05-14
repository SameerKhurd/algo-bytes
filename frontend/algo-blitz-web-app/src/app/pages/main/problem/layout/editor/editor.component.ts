import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import {
  ExecutionState,
  QuestionState,
  ProblemLoadingState,
} from 'src/app/interfaces/problem-loading-state.interface';
import {
  ProgrammingLanguage,
  programmingLanguages,
} from 'src/app/interfaces/question.interface';

const availableLanguages: {
  value: ProgrammingLanguage;
  disabled: boolean;
  label: string;
}[] = [
  {
    value: ProgrammingLanguage.PYTHON3,
    disabled: false,
    label: programmingLanguages[ProgrammingLanguage.PYTHON3].label,
  },
  {
    value: ProgrammingLanguage.JAVA,
    disabled: true,
    label: programmingLanguages[ProgrammingLanguage.JAVA].label,
  },
  {
    value: ProgrammingLanguage.C,
    disabled: true,
    label: programmingLanguages[ProgrammingLanguage.C].label,
  },
  {
    value: ProgrammingLanguage.CPP,
    disabled: true,
    label: programmingLanguages[ProgrammingLanguage.CPP].label,
  },
  {
    value: ProgrammingLanguage.JAVASCRIPT,
    disabled: true,
    label: programmingLanguages[ProgrammingLanguage.JAVASCRIPT].label,
  },
  {
    value: ProgrammingLanguage.TYPESCRIPT,
    disabled: true,
    label: programmingLanguages[ProgrammingLanguage.TYPESCRIPT].label,
  },
];

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @Input() loadingState!: ProblemLoadingState;
  @Output() onRunEvent = new EventEmitter<any>();
  executionState = ExecutionState;
  questionState = QuestionState;

  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'python',
    minimap: { enabled: false },
  };
  userCode: string = '';
  availableLanguages = availableLanguages;
  selectedLanguage = this.availableLanguages[0].value;
  currfunctionArguments: string[] = [];

  @Input()
  set functionArguments(functionArguments: string[] | undefined) {
    if (functionArguments !== undefined && functionArguments !== null) {
      this.currfunctionArguments = functionArguments;
      this.onResetCode();
    }
  }

  onResetCode() {
    this.userCode = `def solve(${this.currfunctionArguments.join(
      ', '
    )}):\n    # Write your code here.\n    \n    pass\n    `;
  }

  onRun() {
    this.emitExecutionEvent(false);
  }

  onSubmit() {
    this.emitExecutionEvent(true);
  }

  private emitExecutionEvent(submit: boolean) {
    this.onRunEvent.emit({
      code: this.userCode,
      submit: submit,
      language: this.selectedLanguage,
    });
  }
}
