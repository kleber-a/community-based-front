import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  standalone: true,
  selector: 'app-insights-page',
	imports: [PageHeaderComponent],
  template: `
		<app-page-header
			kicker="Insights"
			title="Indicadores e leitura da campanha"
			subtitle="Resumo de desempenho, tendência e alertas estratégicos."
		/>
  `,
	styles: [],
})
export class InsightsPageComponent {}
