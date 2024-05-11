import { Injectable, Inject, EventEmitter } from '@angular/core';
import { THEMES, ACTIVE_THEME, Theme } from 'src/app/theme/symbols';

export const enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

@Injectable()
export class ThemeService {
  themeChange = new EventEmitter<Theme>();

  private localStorageThemeKey = 'theme';

  constructor(
    @Inject(THEMES) public themes: Theme[],
    @Inject(ACTIVE_THEME) public customTheme: string
  ) {
    const curTheme = this.theme;
    this.theme = curTheme;
  }

  private get theme(): string {
    const curTheme = localStorage.getItem(this.localStorageThemeKey);
    return curTheme ? curTheme : THEME.DARK;
  }

  getActiveCustomTheme() {
    const theme = this.themes.find((t) => t.name === this.theme);
    if (!theme) {
      throw new Error(`Theme not found: '${this.theme}'`);
    }
    return theme;
  }

  private set theme(newTheme: string) {
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    document.documentElement.setAttribute('theme', newTheme);

    this.customTheme = newTheme;
    this.themeChange.emit(this.getActiveCustomTheme());

    localStorage.setItem(this.localStorageThemeKey, newTheme);
  }

  toggleTheme(): void {
    const newTheme = this.theme == THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    this.theme = newTheme;
  }
}
