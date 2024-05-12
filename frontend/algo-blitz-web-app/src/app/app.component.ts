import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'algo-blitz-web-app';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.authService.getUser();
  }

  changeTheme() {
    this.themeService.toggleTheme();
  }
}
