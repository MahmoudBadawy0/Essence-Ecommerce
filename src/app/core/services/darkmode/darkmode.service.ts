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


  // darkModeSignal: WritableSignal<string> = signal(
  //   localStorage.getItem('theme') ?? 'light'
  // );

  // constructor() {
  //   if (isPlatformBrowser(this.id)) {
  //     effect(() => {
  //       window.localStorage.setItem('theme', this.darkModeSignal());
  //     });
  //     document.documentElement.classList.toggle(
  //       'dark',
  //       localStorage.getItem('theme') === 'dark' ||
  //         (!('theme' in localStorage) &&
  //           window.matchMedia('(prefers-color-scheme: dark)').matches)
  //     );
  //   }
  // }
  constructor() {
    if (isPlatformBrowser(this.id)) {
      // Determine initial theme based on localStorage and OS preference
      const storedTheme = localStorage.getItem('theme');
      const osPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const initialTheme = storedTheme ?? (osPrefersDark ? 'dark' : 'light');

      // Set initial values
      this.darkModeSignal.set(initialTheme);
      document.documentElement.classList.toggle(
        'dark',
        initialTheme === 'dark'
      );

      // Persist changes to localStorage
      effect(() => {
        localStorage.setItem('theme', this.darkModeSignal());
      });
    }
  }

  updateDarkMode() {
    this.darkModeSignal.update((mode) => (mode === 'light' ? 'dark' : 'light'));
    document.documentElement.classList.toggle('dark');
  }
}
