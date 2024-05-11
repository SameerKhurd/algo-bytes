import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blitz-code-100';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.authService.getUser();
  }

  changeTheme() {
    //this.projectService.onRun();
    this.themeService.toggleTheme();
  }
}
