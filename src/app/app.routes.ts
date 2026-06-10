import { Routes } from '@angular/router';
import { PainelPageComponent } from './pages/painel/painel-page.component';
import { PessoasPageComponent } from './pages/pessoas/pessoas-page.component';
import { DemandasPageComponent } from './pages/demandas/demandas-page.component';
import { MapaApoioPageComponent } from './pages/mapa-apoio/mapa-apoio-page.component';
import { AgendaPageComponent } from './pages/agenda/agenda-page.component';
import { InsightsPageComponent } from './pages/insights/insights-page.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'painel' },
	{ path: 'painel', component: PainelPageComponent },
	{ path: 'pessoas', component: PessoasPageComponent },
	{ path: 'demandas', component: DemandasPageComponent },
	{ path: 'mapa', component: MapaApoioPageComponent },
	{ path: 'agenda', component: AgendaPageComponent },
	{ path: 'insights', component: InsightsPageComponent },
	{ path: '**', redirectTo: 'painel' },
];
