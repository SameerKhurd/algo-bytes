import { Component, OnInit } from '@angular/core';
import { ApplicationPayload } from 'src/app/interfaces/payload.interface';
import { ApplicationState } from 'src/app/interfaces/problem-loading-state.interface';
import { DataService } from 'src/app/services/data.service';
import { ApplicationService } from 'src/app/services/http-services/application.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    public dataService: DataService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.getApplicationData();
  }

  private getApplicationData(): void {
    this.dataService.setApplicationState(ApplicationState.LOADING);
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
        this.dataService.setApplicationState(ApplicationState.COMPLETE);
      },
      error: (error: any) => {
        this.dataService.processQuestions([], []);
        this.dataService.setApplicationState(ApplicationState.ERROR);
      },
      complete: () => {},
    });
  }
}
