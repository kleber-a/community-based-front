import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <header class="page-header">
      <div class="page-header__title">
        <span class="page-kicker">{{ kicker }}</span>
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
      </div>

      <div class="page-header__actions">
        @if (actionLabel) {
          <button type="button" class="primary-action" (click)="actionClick.emit()">
            @if (actionIcon) {
              <span class="primary-action__icon" aria-hidden="true">{{ actionIcon }}</span>
            }
            <span>{{ actionLabel }}</span>
          </button>
        }
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border: 1px solid var(--border-color);
      border-radius: 1.25rem;
      background: var(--surface);
      box-shadow: var(--shadow-soft);
    }

    .page-header__title {
      display: grid;
      gap: 0.25rem;
    }

    .page-kicker {
      color: var(--brand);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      color: var(--text-primary);
      font-size: clamp(1.35rem, 1.8vw, 1.8rem);
      line-height: 1.1;
    }

    p {
      margin: 0;
      color: var(--text-muted);
      line-height: 1.45;
    }

    .page-header__actions {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .primary-action {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      border: 0;
      border-radius: 999px;
      padding: 0.85rem 1rem;
      background: linear-gradient(180deg, var(--brand) 0%, var(--brand-strong) 100%);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 18px 30px rgba(31, 95, 191, 0.22);
    }

    .primary-action__icon {
      font-size: 1rem;
      line-height: 1;
    }

    @media (max-width: 720px) {
      .page-header {
        align-items: flex-start;
        flex-direction: column;
      }

      .page-header__actions {
        justify-content: flex-start;
      }
    }
  `],
})
export class PageHeaderComponent {
  @Input() kicker = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() actionLabel = '';
  @Input() actionIcon = '';

  @Output() actionClick = new EventEmitter<void>();
}
