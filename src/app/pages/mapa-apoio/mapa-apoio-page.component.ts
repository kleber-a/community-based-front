import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

type MapaTab = 'Apoio' | 'Demandas' | 'Oportunidade';

type BairroRanking = {
	position: number;
	name: string;
	registered: number;
	demandas: number;
	score: number;
};

@Component({
  standalone: true,
  selector: 'app-mapa-apoio-page',
	imports: [PageHeaderComponent],
  template: `
		<!-- <app-page-header
			kicker="Mapa de Apoio"
			title="Território e presença"
			subtitle="Visualize regiões, lideranças e pontos de apoio."
			actionLabel="Nova marcação"
			actionIcon="+"
		/> -->

		<section class="map-toolbar" aria-label="Camadas do mapa">
			<div class="map-tabs" role="tablist" aria-label="Visões do mapa">
				@for (tab of mapTabs; track tab) {
					<button type="button" class="map-tab" [class.is-active]="tab === activeTab">{{ tab }}</button>
				}
			</div>
		</section>

		<section class="map-layout">
			<article class="map-card">
				<div class="map-frame" aria-label="Mapa de apoio com bolhas de concentração">
					<div class="map-control map-control--top">+</div>
					<div class="map-control map-control--bottom">−</div>

					<span class="map-label map-label--left">A&ccedil;O LOUREN&Ccedil;O DA MATA</span>
					<span class="map-label map-label--center">CAMARAGIBE</span>
					<span class="map-label map-label--right">OLINDA</span>
					<span class="map-label map-label--recife">RECIFE</span>

					<div class="map-bubble bubble--xl" style="top: 74%; left: 34%;"></div>
					<div class="map-bubble bubble--lg" style="top: 81%; left: 32%;"></div>
					<div class="map-bubble bubble--lg" style="top: 18%; left: 61%;"></div>
					<div class="map-bubble bubble--md" style="top: 36%; left: 58%;"></div>
					<div class="map-bubble bubble--md" style="top: 39%; left: 51%;"></div>
					<div class="map-bubble bubble--md" style="top: 53%; left: 41%;"></div>
					<div class="map-bubble bubble--sm" style="top: 29%; left: 59%;"></div>
					<div class="map-bubble bubble--sm" style="top: 22%; left: 59%;"></div>
					<div class="map-bubble bubble--sm" style="top: 54%; left: 18%;"></div>
					<div class="map-bubble bubble--sm" style="top: 85%; left: 59%;"></div>
					<div class="map-bubble bubble--sm" style="top: 92%; left: 52%;"></div>
				</div>

				<p class="map-legend">
					<span class="legend-dot"></span>
					<span><strong>Concentração de apoio</strong> — Bairros onde a base já é forte</span>
				</p>
			</article>

			<aside class="ranking-card">
				<header class="ranking-header">
					<h2>Ranking de bairros</h2>
					<p>Ordenado por concentração de apoio</p>
				</header>

				<div class="ranking-list">
					@for (bairro of ranking; track bairro.name) {
						<article class="ranking-item">
							<div class="ranking-item__position">{{ bairro.position }}</div>
							<div class="ranking-item__content">
								<strong>{{ bairro.name }}</strong>
								<span>{{ bairro.registered }} cadastrados · {{ bairro.demandas }} demandas</span>
							</div>
							<div class="ranking-item__score">{{ bairro.score }}</div>
						</article>
					}
				</div>
			</aside>
		</section>
  `,
	styles: [`
		:host {
			display: block;
		}

		.map-toolbar {
			margin-top: 1rem;
		}

		.map-tabs {
			display: inline-flex;
			gap: 0.35rem;
			padding: 0.25rem;
			border: 1px solid var(--border-color);
			border-radius: 999px;
			background: var(--surface);
			box-shadow: var(--shadow-soft);
		}

		.map-tab {
			border: 0;
			border-radius: 999px;
			padding: 0.45rem 0.8rem;
			background: transparent;
			color: var(--text-muted);
			font: inherit;
			font-weight: 700;
			cursor: pointer;
		}

		.map-tab.is-active {
			background: var(--surface-elevated);
			color: var(--text-primary);
			box-shadow: inset 0 0 0 1px var(--border-color);
		}

		.map-layout {
			display: grid;
			grid-template-columns: minmax(0, 1.6fr) minmax(320px, 0.8fr);
			gap: 1rem;
			margin-top: 1rem;
		}

		.map-card,
		.ranking-card {
			border: 1px solid var(--border-color);
			border-radius: 1.5rem;
			background: var(--surface);
			box-shadow: var(--shadow-soft);
		}

		.map-card {
			padding: 1rem;
		}

		.map-frame {
			position: relative;
			min-height: 34rem;
			border-radius: 1.15rem;
			overflow: hidden;
			background:
				linear-gradient(90deg, rgba(255, 255, 255, 0.68), rgba(245, 247, 249, 0.92)),
				linear-gradient(135deg, rgba(206, 214, 219, 0.7) 0%, rgba(230, 236, 239, 0.95) 45%, rgba(209, 218, 223, 0.95) 100%);
		}

		.map-frame::before {
			content: '';
			position: absolute;
			inset: 0;
			background-image:
				radial-gradient(circle at 8% 15%, rgba(255, 255, 255, 0.65) 0 8%, transparent 8.5%),
				radial-gradient(circle at 34% 58%, rgba(255, 255, 255, 0.45) 0 5%, transparent 5.5%),
				radial-gradient(circle at 67% 30%, rgba(255, 255, 255, 0.35) 0 6%, transparent 6.5%),
				radial-gradient(circle at 83% 76%, rgba(255, 255, 255, 0.4) 0 5%, transparent 5.5%);
			opacity: 0.85;
		}

		.map-control {
			position: absolute;
			left: 0.8rem;
			z-index: 2;
			display: grid;
			place-items: center;
			width: 2.05rem;
			height: 2.05rem;
			border: 1px solid var(--border-color);
			background: rgba(255, 255, 255, 0.96);
			color: #1d2530;
			font-size: 1.2rem;
			font-weight: 700;
			box-shadow: 0 8px 20px rgba(16, 36, 72, 0.08);
		}

		.map-control--top {
			top: 0.9rem;
			border-radius: 0.45rem 0.45rem 0 0;
		}

		.map-control--bottom {
			top: 2.95rem;
			border-radius: 0 0 0.45rem 0.45rem;
		}

		.map-label {
			position: absolute;
			z-index: 1;
			color: rgba(79, 96, 118, 0.75);
			font-size: 0.8rem;
			font-weight: 700;
			letter-spacing: 0.04em;
			text-transform: uppercase;
		}

		.map-label--left { top: 9%; left: 1.2rem; }
		.map-label--center { top: 20%; left: 24%; }
		.map-label--right { top: 17%; right: 16%; }
		.map-label--recife { top: 50%; right: 28%; font-size: 1.15rem; }

		.map-bubble {
			position: absolute;
			z-index: 1;
			transform: translate(-50%, -50%);
			border-radius: 999px;
			border: 2px solid rgba(45, 160, 98, 0.65);
			background: rgba(61, 187, 122, 0.48);
			box-shadow: 0 0 0 2px rgba(61, 187, 122, 0.08) inset;
		}

		.bubble--sm { width: 2rem; height: 2rem; }
		.bubble--md { width: 2.9rem; height: 2.9rem; }
		.bubble--lg { width: 4rem; height: 4rem; }
		.bubble--xl { width: 5.6rem; height: 5.6rem; }

		.map-legend {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin: 0.9rem 0 0;
			color: var(--text-muted);
			font-size: 0.92rem;
		}

		.legend-dot {
			width: 0.85rem;
			height: 0.85rem;
			border-radius: 999px;
			background: #2e9f67;
			box-shadow: 0 0 0 4px rgba(46, 159, 103, 0.15);
		}

		.ranking-card {
			padding: 1rem;
		}

		.ranking-header h2 {
			margin: 0;
			color: var(--text-primary);
			font-size: 1.08rem;
		}

		.ranking-header p {
			margin: 0.35rem 0 0;
			color: var(--text-muted);
			font-size: 0.92rem;
		}

		.ranking-list {
			display: grid;
			gap: 0.75rem;
			margin-top: 1rem;
		}

		.ranking-item {
			display: grid;
			grid-template-columns: auto minmax(0, 1fr) auto;
			align-items: center;
			gap: 0.8rem;
			padding: 0.8rem 0.9rem;
			border: 1px solid var(--border-color);
			border-radius: 0.85rem;
			background: var(--surface-elevated);
		}

		.ranking-item__position,
		.ranking-item__score {
			color: var(--text-primary);
			font-size: 0.92rem;
			font-weight: 700;
		}

		.ranking-item__content {
			display: grid;
			gap: 0.15rem;
		}

		.ranking-item__content strong {
			color: var(--text-primary);
			font-size: 0.95rem;
		}

		.ranking-item__content span {
			color: var(--text-muted);
			font-size: 0.85rem;
		}

		.ranking-item__score {
			color: #2e9f67;
			font-size: 1rem;
		}

		@media (max-width: 1120px) {
			.map-layout {
				grid-template-columns: 1fr;
			}
		}

		@media (max-width: 720px) {
			.map-tabs {
				width: 100%;
				justify-content: stretch;
			}

			.map-tab {
				flex: 1;
			}

			.map-frame {
				min-height: 28rem;
			}

			.map-label--recife {
				top: 48%;
				right: 22%;
			}
		}
	`],
})
export class MapaApoioPageComponent {
	readonly mapTabs: MapaTab[] = ['Apoio', 'Demandas', 'Oportunidade'];

	readonly activeTab: MapaTab = 'Apoio';

	readonly ranking: BairroRanking[] = [
		{ position: 1, name: 'Ibura', registered: 4, demandas: 3, score: 4 },
		{ position: 2, name: 'Nova Descoberta', registered: 2, demandas: 1, score: 2 },
		{ position: 3, name: 'Casa Amarela', registered: 2, demandas: 1, score: 1 },
		{ position: 4, name: 'Cohab', registered: 2, demandas: 1, score: 1 },
		{ position: 5, name: 'Alto José do Pinho', registered: 1, demandas: 0, score: 1 },
		{ position: 6, name: 'San Martin', registered: 2, demandas: 1, score: 1 },
		{ position: 7, name: 'Boa Viagem', registered: 2, demandas: 0, score: 0 },
		{ position: 8, name: 'Várzea', registered: 2, demandas: 1, score: 0 },
		{ position: 9, name: 'Dois Unidos', registered: 2, demandas: 1, score: 0 },
		{ position: 10, name: 'Beberibe', registered: 1, demandas: 0, score: 0 },
	];
}
