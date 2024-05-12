import { Injectable, Inject, EventEmitter } from '@angular/core';

export const enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

@Injectable()
export class ThemeService {
  private localStorageThemeKey = 'theme';

  constructor() {
    const curTheme = this.theme;
    this.theme = curTheme;
  }

  private get theme(): string {
    const curTheme = localStorage.getItem(this.localStorageThemeKey);
    return curTheme ? curTheme : THEME.DARK;
  }

  private set theme(newTheme: string) {
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    document.documentElement.setAttribute('theme', newTheme);

    localStorage.setItem(this.localStorageThemeKey, newTheme);
  }

  toggleTheme(): void {
    const newTheme = this.theme == THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    this.theme = newTheme;
  }
}
