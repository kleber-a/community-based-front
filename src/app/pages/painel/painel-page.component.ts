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
  templateUrl: './painel-page.component.html',
  styleUrl: './painel-page.component.scss',
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
