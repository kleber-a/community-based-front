import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  standalone: true,
  selector: 'app-agenda-page',
	imports: [PageHeaderComponent],
  template: `
		<app-page-header
			kicker="Agenda"
			title="Compromissos e visitas"
			subtitle="Centralize reuniões, agendas públicas e compromissos internos."
		/>
  `,
	styles: [],
})
export class AgendaPageComponent {}
