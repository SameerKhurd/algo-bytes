import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from './symbols';
import { ThemeService } from '../services/theme.service';

@Directive({
  selector: '[app-theme]',
})
export class ThemeDirective implements OnInit {
  private unsubscribe = new Subject();
  constructor(
    private _elementRef: ElementRef,
    private _themeService: ThemeService
  ) {}

  ngOnInit() {
    const active = this._themeService.getActiveCustomTheme();
    if (active) {
      this.updateTheme(active);
    }
    this._themeService.themeChange
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((theme: Theme) => this.updateTheme(theme));
  }

  updateTheme(theme: Theme) {
    for (const key in theme.properties) {
      this._elementRef.nativeElement.style.setProperty(
        key,
        theme.properties[key]
      );
    }
  }
}
