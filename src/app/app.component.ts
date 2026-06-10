import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly themeStorageKey = 'community-based-front-theme';

  readonly themes = {
    dark: 'dark',
    light: 'light',
  } as const;

  theme: 'dark' | 'light' = 'light';

  constructor() {
    this.initializeTheme();
  }

  get isLightTheme(): boolean {
    return this.theme === this.themes.light;
  }

  get themeToggleLabel(): string {
    return this.isLightTheme ? 'Modo noturno' : 'Modo claro';
  }

  toggleTheme(): void {
    this.theme = this.isLightTheme ? this.themes.dark : this.themes.light;
    this.applyTheme();
  }

  private initializeTheme(): void {
    const savedTheme = this.document.defaultView?.localStorage.getItem(this.themeStorageKey);

    if (savedTheme === this.themes.light || savedTheme === this.themes.dark) {
      this.theme = savedTheme;
    } else {
      this.theme = this.themes.light;
    }

    this.applyTheme();
  }

  private applyTheme(): void {
    this.document.documentElement.setAttribute('data-theme', this.theme);
    this.document.defaultView?.localStorage.setItem(this.themeStorageKey, this.theme);
  }
}
