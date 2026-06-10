import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

type SummaryCard = {
	icon: string;
	value: string;
	label: string;
	description: string;
	variant: 'mint' | 'cyan' | 'amber' | 'green';
};

type DemandItem = {
	title: string;
	meta: string;
	status: 'Aberta' | 'Em andamento' | 'Resolvida';
	statusClass: 'status--open' | 'status--progress' | 'status--done';
};

type OpportunityItem = {
	position: number;
	name: string;
	description: string;
	badge: string;
};

@Component({
  standalone: true,
  selector: 'app-painel-page',
	imports: [PageHeaderComponent],
  template: `
		<!-- <app-page-header
			kicker="Painel"
			title="Visão geral da campanha"
			subtitle="Acompanhe os principais números, prioridades e movimentos do dia."
			actionLabel="Nova ação"
			actionIcon="+"
		/> -->

    <section class="summary-grid">
			@for (card of summaryCards; track card.label) {
				<article class="summary-card" [class.summary-card--mint]="card.variant === 'mint'" [class.summary-card--cyan]="card.variant === 'cyan'" [class.summary-card--amber]="card.variant === 'amber'" [class.summary-card--green]="card.variant === 'green'">
					<div class="summary-card__icon" aria-hidden="true">{{ card.icon }}</div>
					<div>
						<strong>{{ card.value }}</strong>
						<span class="summary-label">{{ card.label }}</span>
						<p>{{ card.description }}</p>
					</div>
				</article>
			}
    </section>

		<section class="dashboard-grid">
			<article class="chart-card chart-card--wide">
				<header class="section-header">
					<div>
						<h2>Evolução do cadastro</h2>
						<p>Pessoas e demandas registradas por mês</p>
					</div>
				</header>

				<div class="line-chart" aria-label="Evolução do cadastro">
					<div class="line-chart__axis line-chart__axis--y">
						<span>1200</span>
						<span>900</span>
						<span>600</span>
						<span>300</span>
						<span>0</span>
					</div>
					<div class="line-chart__plot">
						<div class="line-chart__grid"></div>
						<div class="line-chart__area"></div>
						<svg viewBox="0 0 1000 340" preserveAspectRatio="none" aria-hidden="true">
							<path d="M 0 292 C 90 282, 150 260, 200 248 C 280 228, 340 196, 420 172 C 500 148, 570 120, 640 92 C 720 60, 820 28, 1000 18" />
							<path d="M 0 312 C 110 310, 180 308, 250 306 C 360 304, 470 300, 560 295 C 690 290, 810 284, 1000 276" class="line-chart__secondary" />
						</svg>
						<div class="line-chart__months">
							<span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
						</div>
					</div>
				</div>
			</article>

			<article class="chart-card chart-card--side">
				<header class="section-header">
					<div>
						<h2>Apoio por bairro</h2>
						<p>Apoiadores cadastrados (amostra)</p>
					</div>
				</header>

				<div class="bar-chart">
					@for (bairro of supportBars; track bairro.name) {
						<div class="bar-chart__row">
							<span class="bar-chart__label">{{ bairro.name }}</span>
							<div class="bar-chart__track">
								<div class="bar-chart__bar" [style.width.%]="bairro.value * 25"></div>
							</div>
							<span class="bar-chart__value">{{ bairro.value }}</span>
						</div>
					}
				</div>
			</article>

			<article class="list-card">
				<header class="section-header">
					<div>
						<h2>Demandas recentes</h2>
						<p>Últimos pedidos da comunidade</p>
					</div>
				</header>

				<div class="demand-list">
					@for (demand of recentDemands; track demand.title) {
						<div class="demand-item">
							<div>
								<strong>{{ demand.title }}</strong>
								<p>{{ demand.meta }}</p>
							</div>
							<span class="demand-pill" [class.status--open]="demand.statusClass === 'status--open'" [class.status--progress]="demand.statusClass === 'status--progress'" [class.status--done]="demand.statusClass === 'status--done'">{{ demand.status }}</span>
						</div>
					}
				</div>
			</article>

			<article class="list-card">
				<header class="section-header">
					<div>
						<h2>Onde investir agora</h2>
						<p>Bairros com maior oportunidade</p>
					</div>
				</header>

				<div class="opportunity-list">
					@for (item of opportunities; track item.name) {
						<div class="opportunity-item">
							<div class="opportunity-item__rank">{{ item.position }}</div>
							<div class="opportunity-item__content">
								<strong>{{ item.name }}</strong>
								<span>{{ item.description }}</span>
							</div>
							<span class="opportunity-item__badge">{{ item.badge }}</span>
						</div>
					}
				</div>
			</article>
		</section>
  `,
  styles: [`
		:host {
			display: block;
		}

		.summary-grid {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1rem;
		}

		.summary-card,
		.chart-card,
		.list-card {
			border: 1px solid var(--border-color);
			border-radius: 1.35rem;
			background: var(--surface);
			box-shadow: var(--shadow-soft);
		}

		.summary-card {
			display: flex;
			align-items: center;
			gap: 0.95rem;
			padding: 1rem;
		}

		.summary-card__icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 3rem;
			height: 3rem;
			border-radius: 0.85rem;
			font-size: 1.25rem;
		}

		.summary-card strong {
			display: block;
			color: var(--text-primary);
			font-size: clamp(1.45rem, 2vw, 2rem);
			line-height: 1;
		}

		.summary-label {
			display: block;
			margin-top: 0.15rem;
			color: var(--text-primary);
			font-size: 0.95rem;
			font-weight: 600;
		}

		.summary-card p {
			margin: 0.25rem 0 0;
			color: var(--text-muted);
			font-size: 0.84rem;
		}

		.summary-card--mint .summary-card__icon { background: rgba(70, 192, 150, 0.12); color: #2e9f67; }
		.summary-card--cyan .summary-card__icon { background: rgba(39, 181, 215, 0.14); color: #1f9fc6; }
		.summary-card--amber .summary-card__icon { background: rgba(219, 181, 94, 0.16); color: #b88a1f; }
		.summary-card--green .summary-card__icon { background: rgba(70, 192, 150, 0.12); color: #2e9f67; }

		.dashboard-grid {
			display: grid;
			grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
			gap: 1rem;
			margin-top: 1rem;
		}

		.chart-card,
		.list-card {
			padding: 1rem;
		}

		.chart-card--wide {
			min-height: 22rem;
		}

		.section-header h2 {
			margin: 0;
			color: var(--text-primary);
			font-size: 1.05rem;
		}

		.section-header p {
			margin: 0.35rem 0 0;
			color: var(--text-muted);
			font-size: 0.92rem;
		}

		.line-chart {
			display: grid;
			grid-template-columns: 44px minmax(0, 1fr);
			gap: 0.75rem;
			margin-top: 1rem;
		}

		.line-chart__axis {
			display: grid;
			align-content: space-between;
			padding: 0.1rem 0;
			color: var(--text-muted);
			font-size: 0.8rem;
		}

		.line-chart__plot {
			position: relative;
			min-height: 18rem;
			padding: 0 0.25rem 1.2rem;
		}

		.line-chart__grid {
			position: absolute;
			inset: 0 0 1.2rem 0;
			background-image: linear-gradient(to bottom, rgba(16, 36, 72, 0.1) 1px, transparent 1px);
			background-size: 100% calc(100% / 4);
			opacity: 0.55;
			pointer-events: none;
		}

		.line-chart__area {
			position: absolute;
			inset: 2rem 0 2.4rem 0;
			background: linear-gradient(180deg, rgba(52, 160, 107, 0.35) 0%, rgba(52, 160, 107, 0.08) 68%, transparent 100%);
			clip-path: polygon(0% 78%, 12% 74%, 24% 67%, 36% 58%, 48% 47%, 60% 35%, 72% 23%, 84% 12%, 100% 4%, 100% 100%, 0 100%);
			opacity: 0.85;
		}

		.line-chart svg {
			position: relative;
			z-index: 1;
			width: 100%;
			height: 18rem;
			overflow: visible;
		}

		.line-chart path {
			fill: none;
			stroke: #1f8f63;
			stroke-width: 4;
			stroke-linecap: round;
			stroke-linejoin: round;
		}

		.line-chart__secondary {
			stroke: #d99623;
			stroke-width: 3;
		}

		.line-chart__months {
			display: grid;
			grid-template-columns: repeat(6, minmax(0, 1fr));
			margin-top: 0.25rem;
			color: var(--text-muted);
			font-size: 0.82rem;
		}

		.bar-chart {
			display: grid;
			gap: 0.75rem;
			margin-top: 1rem;
		}

		.bar-chart__row {
			display: grid;
			grid-template-columns: 92px minmax(0, 1fr) 24px;
			align-items: center;
			gap: 0.7rem;
		}

		.bar-chart__label {
			color: var(--text-muted);
			font-size: 0.88rem;
			text-align: right;
		}

		.bar-chart__track {
			height: 1.9rem;
			border-radius: 0.45rem;
			background: rgba(16, 36, 72, 0.05);
			overflow: hidden;
		}

		.bar-chart__bar {
			height: 100%;
			border-radius: inherit;
			background: linear-gradient(90deg, #159160 0%, #0f8b55 100%);
		}

		.bar-chart__value {
			color: #159160;
			font-weight: 700;
			text-align: right;
		}

		.demand-list,
		.opportunity-list {
			display: grid;
			gap: 0.7rem;
			margin-top: 1rem;
		}

		.demand-item,
		.opportunity-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.75rem;
			padding: 0.75rem 0.85rem;
			border: 1px solid var(--border-color);
			border-radius: 0.9rem;
			background: var(--surface-elevated);
		}

		.demand-item strong,
		.opportunity-item strong {
			display: block;
			color: var(--text-primary);
			font-size: 0.93rem;
		}

		.demand-item p,
		.opportunity-item span {
			margin: 0.2rem 0 0;
			color: var(--text-muted);
			font-size: 0.84rem;
		}

		.demand-pill,
		.opportunity-item__badge {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			border-radius: 999px;
			padding: 0.25rem 0.55rem;
			font-size: 0.75rem;
			font-weight: 700;
		}

		.demand-pill.status--open {
			background: rgba(255, 77, 77, 0.1);
			color: #ff4d4d;
		}

		.demand-pill.status--progress {
			background: rgba(218, 161, 66, 0.16);
			color: #9e6b13;
		}

		.demand-pill.status--done {
			background: rgba(22, 159, 122, 0.14);
			color: #138a67;
		}

		.opportunity-item {
			align-items: flex-start;
		}

		.opportunity-item__rank {
			display: grid;
			place-items: center;
			width: 2rem;
			height: 2rem;
			flex: 0 0 auto;
			border-radius: 999px;
			background: rgba(218, 161, 66, 0.18);
			color: #7f5f15;
			font-weight: 700;
		}

		.opportunity-item__content {
			flex: 1;
			min-width: 0;
		}

		.opportunity-item__badge {
			background: rgba(218, 161, 66, 0.16);
			color: #7f5f15;
		}

		@media (max-width: 1120px) {
			.summary-grid {
				grid-template-columns: repeat(2, minmax(0, 1fr));
			}

			.dashboard-grid {
				grid-template-columns: 1fr;
			}
		}

		@media (max-width: 720px) {
			.summary-grid {
				grid-template-columns: 1fr;
			}

			.line-chart {
				grid-template-columns: 32px minmax(0, 1fr);
			}

			.bar-chart__row {
				grid-template-columns: 1fr;
			}

			.bar-chart__label {
				text-align: left;
			}
		}
  `],
})
export class PainelPageComponent {
	readonly summaryCards: SummaryCard[] = [
		{ icon: '👥', value: '1.042', label: 'Pessoas', description: 'Cadastro e relacionamento', variant: 'mint' },
		{ icon: '🧾', value: '24', label: 'Demandas', description: 'Casos em andamento', variant: 'cyan' },
		{ icon: '📅', value: '8', label: 'Agenda', description: 'Compromissos desta semana', variant: 'amber' },
	];

	readonly supportBars = [
		{ name: 'Ibura', value: 4 },
		{ name: 'Nova Descoberta', value: 2 },
		{ name: 'Casa Amarela', value: 1 },
		{ name: 'Cohab', value: 1 },
		{ name: 'Alto José do Pinho', value: 1 },
		{ name: 'San Martin', value: 1 },
		{ name: 'Boa Viagem', value: 0 },
		{ name: 'Várzea', value: 0 },
	];

	readonly recentDemands: DemandItem[] = [
		{ title: 'Coleta de lixo irregular', meta: 'Ibura · Saneamento · Prefeitura', status: 'Aberta', statusClass: 'status--open' },
		{ title: 'Falta de vagas em creche', meta: 'Dois Unidos · Educação · Prefeitura', status: 'Aberta', statusClass: 'status--open' },
		{ title: 'Risco de deslizamento', meta: 'Nova Descoberta · Defesa Civil · Estado', status: 'Em andamento', statusClass: 'status--progress' },
		{ title: 'Poste sem iluminação', meta: 'Cohab · Iluminação · Prefeitura', status: 'Resolvida', statusClass: 'status--done' },
	];

	readonly opportunities: OpportunityItem[] = [
		{ position: 1, name: 'Ibura', description: '3 demandas abertas · 4 cadastrados', badge: 'Alvo' },
		{ position: 2, name: 'Casa Amarela', description: '2 demandas abertas · 2 cadastrados', badge: 'Alvo' },
		{ position: 3, name: 'Nova Descoberta', description: '1 demanda aberta · 2 cadastrados', badge: 'Atenção' },
		{ position: 4, name: 'Cohab', description: '1 demanda aberta · 2 cadastrados', badge: 'Atenção' },
	];
}
