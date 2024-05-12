import { Injectable } from '@angular/core';
import { DataService } from './data.service';

const authUrl = '';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private dataService: DataService) {
    this.getUser();
  }

  getUser() {
    const uid = localStorage.getItem('uid');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    this.dataService.user = {
      uid: uid ? uid : '',
      username: username ? username : '',
      email: email ? email : '',
    };
  }
}
