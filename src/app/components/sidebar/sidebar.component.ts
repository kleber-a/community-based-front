import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type NavigationItem = {
  id: string;
  label: string;
  route: string;
  icon: string;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly appName = 'Base Comunitária';
  readonly appSubtitle = 'Gestão de Campanha';

  readonly navigationItems: NavigationItem[] = [
    { id: 'painel', label: 'Painel', route: '/painel', icon: 'M4 4h6v6H4V4Zm10 0h6v10h-6V4ZM4 14h6v6H4v-6Zm10 4h6v2h-6v-2Z' },
    { id: 'pessoas', label: 'Pessoas', route: '/pessoas', icon: 'M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2 20c0-3.314 2.239-6 5-6h2c2.761 0 5 2.686 5 6H2Zm10.5-1.5c.355-2.625 2.188-4.5 4.5-4.5h1c2.485 0 4.5 2.239 4.5 5H12.5Z' },
    { id: 'demandas', label: 'Demandas', route: '/demandas', icon: 'M4 4h16v16H4V4Zm3 3v2h10V7H7Zm0 4v2h10v-2H7Zm0 4v2h6v-2H7Z' },
    { id: 'mapa', label: 'Mapa de Apoio', route: '/mapa', icon: 'M4 5.5 9 4l6 2.5 5-1.5V18l-5 1.5-6-2.5-5 1.5V5.5Zm5 0v11l4 1.666V7.166L9 5.5Zm6 1.666v11l4-1.166v-11L15 7.166Z' },
    { id: 'agenda', label: 'Agenda', route: '/agenda', icon: 'M7 2v2H5a2 2 0 0 0-2 2v1h18V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm14 7H3v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9ZM7 12h4v4H7v-4Z' },
    { id: 'insights', label: 'Insights', route: '/insights', icon: 'M11 2h2v20h-2V2ZM5.5 8.5 7 7l3 3-1.5 1.5-3-3Zm13 0L17 10l-3-3 1.5-1.5 3 3Z' },
  ];
}
