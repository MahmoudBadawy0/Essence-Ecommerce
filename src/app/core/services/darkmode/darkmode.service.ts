import { isPlatformBrowser } from '@angular/common';
import {
  effect,
  Injectable,
  signal,
  WritableSignal,
  PLATFORM_ID,
  inject,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkmodeService {
  darkModeSignal: WritableSignal<string> = signal(
    localStorage.getItem('theme') ?? 'light'
  );
  private readonly id = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.id)) {
      effect(() => {
        window.localStorage.setItem('theme', this.darkModeSignal());
      });
      document.documentElement.classList.toggle(
        'dark',
        localStorage.getItem('theme') === 'dark' ||
          (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
  }

  updateDarkMode() {
    this.darkModeSignal.update((mode) => (mode === 'light' ? 'dark' : 'light'));
    document.documentElement.classList.toggle('dark');
  }
}
