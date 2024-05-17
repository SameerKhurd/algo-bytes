import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ExecutePayload,
  UserQuestionSubmissionsPayload,
} from '../../interfaces/payload.interface';
import { environment } from '../../../environments/environment';

const submissionUrl = environment.submissionUrl;
const userQuestionSubmissionsUrl = environment.userQuestionSubmissionsUrl;

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(private http: HttpClient) {}

  execute(payload: ExecutePayload): Observable<any> {
    return this.http.post(`${submissionUrl}`, payload);
  }

  getSubmission(sid: string): Observable<any> {
    return this.http.get(`${submissionUrl}?sid=${sid}`);
  }

  getUserQuestionSubmissions(
    payload: UserQuestionSubmissionsPayload
  ): Observable<any> {
    return this.http.post(`${userQuestionSubmissionsUrl}`, payload);
  }
}
