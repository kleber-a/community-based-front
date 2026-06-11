import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

type DemandStatus = 'Aberta' | 'Em andamento' | 'Resolvida';

type DemandCard = {
	title: string;
	area: string;
	neighborhood: string;
	department: string;
	deadline: string;
	status: DemandStatus;
	statusClass: 'status--open' | 'status--progress' | 'status--done';
	icon: string;
};

@Component({
  standalone: true,
  selector: 'app-demandas-page',
	imports: [PageHeaderComponent],
  template: `
		<!-- <app-page-header
			kicker="Demandas"
			title="Fila de atendimentos"
			subtitle="Acompanhe solicitações, prioridades e encaminhamentos."
			actionLabel="Nova demanda"
			actionIcon="+"
		/> -->

    <div class="page-content">

      <section class="demand-toolbar" aria-label="Filtros de demandas">
        <div class="demand-tabs" role="tablist" aria-label="Status das demandas">
          @for (tab of statusTabs; track tab) {
            <button type="button" class="demand-tab" [class.is-active]="tab === activeTab">
              {{ tab }}
            </button>
          }
        </div>

        <label class="status-select">
          <select aria-label="Filtrar por status">
            @for (option of statusFilterOptions; track option) {
              <option>{{ option }}</option>
            }
          </select>
        </label>
      </section>

      <section class="demand-grid">
        @for (demand of filteredDemands; track demand.title) {
          <article class="demand-card">
            <div class="demand-card__top">
              <div class="demand-card__icon" aria-hidden="true">{{ demand.icon }}</div>
              <span class="demand-status" [class.status--open]="demand.statusClass === 'status--open'" [class.status--progress]="demand.statusClass === 'status--progress'" [class.status--done]="demand.statusClass === 'status--done'">{{ demand.status }}</span>
            </div>

            <h2>{{ demand.title }}</h2>
            <p class="demand-meta">{{ demand.neighborhood }} · {{ demand.area }}</p>

            <div class="demand-tags">
              <span class="tag">{{ demand.department }}</span>
              <span class="tag tag--deadline">Prazo: {{ demand.deadline }}</span>
            </div>

            <button type="button" class="advance-button">Avançar status</button>
          </article>
        }
      </section>
    </div>
  `,
	styles: [`
		:host {
			display: block;
		}

		.demand-toolbar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			margin-top: 1rem;
		}

		.demand-tabs {
			display: inline-flex;
			flex-wrap: wrap;
			gap: 0.35rem;
			padding: 0.25rem;
			border: 1px solid var(--border-color);
			border-radius: 999px;
			background: var(--surface);
			box-shadow: var(--shadow-soft);
		}

		.demand-tab {
			border: 0;
			border-radius: 999px;
			padding: 0.45rem 0.8rem;
			background: transparent;
			color: var(--text-muted);
			font: inherit;
			font-weight: 700;
			cursor: pointer;
		}

		.demand-tab.is-active {
			background: var(--surface-elevated);
			color: var(--text-primary);
			box-shadow: inset 0 0 0 1px var(--border-color);
		}

		.status-select {
			min-width: 180px;
			padding: 0.35rem 0.4rem;
			border: 1px solid var(--border-color);
			border-radius: 0.95rem;
			background: var(--surface);
			box-shadow: var(--shadow-soft);
		}

		select {
			width: 100%;
			border: 0;
			outline: 0;
			background: transparent;
			color: var(--text-primary);
			font: inherit;
		}

		.demand-grid {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1rem;
			margin-top: 1rem;
		}

		.demand-card {
			display: grid;
			gap: 0.75rem;
			padding: 1rem;
			min-height: 14.5rem;
			border: 1px solid var(--border-color);
			border-radius: 1.25rem;
			background: var(--surface);
			box-shadow: var(--shadow-soft);
		}

		.demand-card__top {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 1rem;
		}

		.demand-card__icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 2.5rem;
			height: 2.5rem;
			border-radius: 0.9rem;
			background: rgba(13, 179, 137, 0.12);
			color: #15916f;
			font-size: 1.1rem;
		}

		h2 {
			margin: 0;
			color: var(--text-primary);
			font-size: 1rem;
			line-height: 1.35;
		}

		.demand-meta {
			margin: 0;
			color: var(--text-muted);
			font-size: 0.9rem;
		}

		.demand-tags {
			display: flex;
			flex-wrap: wrap;
			gap: 0.45rem;
			align-items: center;
		}

		.tag,
		.demand-status {
			display: inline-flex;
			align-items: center;
			border-radius: 999px;
			padding: 0.28rem 0.6rem;
			font-size: 0.78rem;
			font-weight: 700;
		}

		.tag {
			background: rgba(31, 95, 191, 0.08);
			color: var(--text-primary);
		}

		.tag--deadline {
			background: transparent;
			padding-left: 0;
			color: var(--text-muted);
		}

		.demand-status.status--open {
			background: rgba(255, 77, 77, 0.1);
			color: #ff4d4d;
		}

		.demand-status.status--progress {
			background: rgba(218, 161, 66, 0.16);
			color: #9e6b13;
		}

		.demand-status.status--done {
			background: rgba(22, 159, 122, 0.14);
			color: #138a67;
		}

		.advance-button {
			margin-top: auto;
			width: 100%;
			border: 1px solid var(--border-color);
			border-radius: 0.75rem;
			padding: 0.6rem 0.85rem;
			background: transparent;
			color: var(--text-primary);
			font: inherit;
			font-weight: 700;
			cursor: pointer;
		}

		@media (max-width: 1080px) {
			.demand-grid {
				grid-template-columns: repeat(2, minmax(0, 1fr));
			}
		}

		@media (max-width: 720px) {
			.demand-toolbar {
				align-items: stretch;
				flex-direction: column;
			}

			.demand-tabs,
			.status-select {
				width: 100%;
			}

			.demand-grid {
				grid-template-columns: 1fr;
			}
		}
	`],
})
export class DemandasPageComponent {
	readonly statusTabs = ['Todas', 'Pendentes', 'Resolvidas'];

	readonly statusFilterOptions = ['todas', 'abertas', 'em andamento', 'resolvidas'];

	readonly activeTab = 'Todas';

	readonly demands: DemandCard[] = [
		{
			title: 'Falta d\'água há 5 dias na rua principal',
			area: 'Água/Compesa',
			neighborhood: 'Ibura',
			department: 'Compesa',
			deadline: '09/06/2026',
			status: 'Em andamento',
			statusClass: 'status--progress',
			icon: '💧',
		},
		{
			title: 'Risco de deslizamento de barreira',
			area: 'Defesa Civil',
			neighborhood: 'Nova Descoberta',
			department: 'Defesa Civil',
			deadline: '07/06/2026',
			status: 'Aberta',
			statusClass: 'status--open',
			icon: '🛡️',
		},
		{
			title: 'Poste sem iluminação há semanas',
			area: 'Iluminação',
			neighborhood: 'Cohab',
			department: 'Prefeitura',
			deadline: '24/05/2026',
			status: 'Resolvida',
			statusClass: 'status--done',
			icon: '💡',
		},
		{
			title: 'Esgoto a céu aberto',
			area: 'Saneamento',
			neighborhood: 'Várzea',
			department: 'Compesa',
			deadline: '19/06/2026',
			status: 'Aberta',
			statusClass: 'status--open',
			icon: '🗑️',
		},
		{
			title: 'Buraco na via dificulta passagem',
			area: 'Pavimentação',
			neighborhood: 'San Martin',
			department: 'Prefeitura',
			deadline: '14/06/2026',
			status: 'Em andamento',
			statusClass: 'status--progress',
			icon: '🛣️',
		},
		{
			title: 'Posto de saúde sem médico',
			area: 'Saúde',
			neighborhood: 'Ibura',
			department: 'Secretaria de Saúde',
			deadline: '17/06/2026',
			status: 'Aberta',
			statusClass: 'status--open',
			icon: '❤️',
		},
		{
			title: 'Limpeza de barreira após chuva',
			area: 'Defesa Civil',
			neighborhood: 'Alto José do Pinho',
			department: 'Defesa Civil',
			deadline: '19/05/2026',
			status: 'Resolvida',
			statusClass: 'status--done',
			icon: '🛡️',
		},
		{
			title: 'Vazamento de água na calçada',
			area: 'Água/Compesa',
			neighborhood: 'Casa Amarela',
			department: 'Compesa',
			deadline: '11/06/2026',
			status: 'Em andamento',
			statusClass: 'status--progress',
			icon: '💧',
		},
		{
			title: 'Falta de vagas em creche',
			area: 'Educação',
			neighborhood: 'Dois Unidos',
			department: 'Secretaria de Educação',
			deadline: '30/06/2026',
			status: 'Aberta',
			statusClass: 'status--open',
			icon: '🎓',
		},
	];

	get filteredDemands(): DemandCard[] {
		return this.demands;
	}
}
