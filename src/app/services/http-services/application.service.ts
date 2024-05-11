import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationPayload } from '../../interfaces/payload.interface';
import { environment } from '../../../environments/environment';

const applicationUrl = environment.applicationUrl;
const questionUrl = environment.questionUrl;

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private http: HttpClient) {}

  getApplicationData(payload: ApplicationPayload): Observable<any> {
    return this.http.post(`${applicationUrl}`, payload);
  }

  getQuestion(qid: string): Observable<any> {
    return this.http.get(`${questionUrl}?qid=${qid}`);
  }
}
