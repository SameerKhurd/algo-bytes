import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookmarkPayload } from '../../interfaces/payload.interface';
import { environment } from '../../../environments/environment';

const bookmarkUrl = environment.bookmarkUrl;

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  constructor(private http: HttpClient) {}

  updateBookmark(payload: BookmarkPayload): Observable<any> {
    return this.http.put(`${bookmarkUrl}`, payload);
  }
}
