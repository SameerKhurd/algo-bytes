import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blitz-code-100';

  constructor(private themeService: ThemeService) {}

  changeTheme() {
    this.themeService.toggleTheme();
  }
}
