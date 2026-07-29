import { Component, inject } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { DemandStreetService } from '../../services/demand-street.service';
import { DemandStreet } from '../../../models/demand-street.model';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [PageHeaderComponent, DatePipe, FormsModule],
  templateUrl: './demandas-page.component.html',
  styleUrl: './demandas-page.component.scss',
})
export class DemandasPageComponent {

  private service = inject(DemandStreetService);

  demandas: DemandStreet[] = [];

  page = 1;
  limit = 9;

  totalPages = 0;
  total = 0;

  filtro = {
    titulo: '',
    bairro: '',
    status: '',
    prioridade: '',
  };



  ngOnInit(): void {
    this.buscarDemandas();
  }

  buscarDemandas() {

    this.service
      .getAll(
        this.page,
        this.limit,
        this.filtro
      )
      .subscribe(res => {

        this.demandas = res.data;

        this.totalPages = res.meta.totalPages;
        this.total = res.meta.total;
      });

  }

  getIcon(orgao?: string | null): string {

    switch (orgao?.toUpperCase()) {

      case 'EMLURB':
        return '🌳';

      case 'SANEAR':
        return '💧';

      case 'COMPESA':
        return '🚰';

      case 'DEFESA CIVIL':
        return '🛡️';

      default:
        return '📌';
    }

  }

  aplicarFiltros() {
    this.page = 1;
    this.buscarDemandas();
  }

  limparFiltros() {

    this.filtro = {
      titulo: '',
      bairro: '',
      status: '',
      prioridade: '',
    };

    this.page = 1;

    this.buscarDemandas();
  }





  // readonly statusTabs = ['Todas', 'Pendentes', 'Resolvidas'];

  // readonly statusFilterOptions = ['todas', 'abertas', 'em andamento', 'resolvidas'];

  // readonly activeTab = 'Todas';

  // readonly demands: DemandCard[] = [
  //   {
  //     title: 'Falta d\'água há 5 dias na rua principal',
  //     area: 'Água/Compesa',
  //     neighborhood: 'Ibura',
  //     department: 'Compesa',
  //     deadline: '09/06/2026',
  //     status: 'Em andamento',
  //     statusClass: 'status--progress',
  //     icon: '💧',
  //   },
  //   {
  //     title: 'Risco de deslizamento de barreira',
  //     area: 'Defesa Civil',
  //     neighborhood: 'Nova Descoberta',
  //     department: 'Defesa Civil',
  //     deadline: '07/06/2026',
  //     status: 'Aberta',
  //     statusClass: 'status--open',
  //     icon: '🛡️',
  //   },
  //   {
  //     title: 'Poste sem iluminação há semanas',
  //     area: 'Iluminação',
  //     neighborhood: 'Cohab',
  //     department: 'Prefeitura',
  //     deadline: '24/05/2026',
  //     status: 'Resolvida',
  //     statusClass: 'status--done',
  //     icon: '💡',
  //   },
  //   {
  //     title: 'Esgoto a céu aberto',
  //     area: 'Saneamento',
  //     neighborhood: 'Várzea',
  //     department: 'Compesa',
  //     deadline: '19/06/2026',
  //     status: 'Aberta',
  //     statusClass: 'status--open',
  //     icon: '🗑️',
  //   },
  //   {
  //     title: 'Buraco na via dificulta passagem',
  //     area: 'Pavimentação',
  //     neighborhood: 'San Martin',
  //     department: 'Prefeitura',
  //     deadline: '14/06/2026',
  //     status: 'Em andamento',
  //     statusClass: 'status--progress',
  //     icon: '🛣️',
  //   },
  //   {
  //     title: 'Posto de saúde sem médico',
  //     area: 'Saúde',
  //     neighborhood: 'Ibura',
  //     department: 'Secretaria de Saúde',
  //     deadline: '17/06/2026',
  //     status: 'Aberta',
  //     statusClass: 'status--open',
  //     icon: '❤️',
  //   },
  //   {
  //     title: 'Limpeza de barreira após chuva',
  //     area: 'Defesa Civil',
  //     neighborhood: 'Alto José do Pinho',
  //     department: 'Defesa Civil',
  //     deadline: '19/05/2026',
  //     status: 'Resolvida',
  //     statusClass: 'status--done',
  //     icon: '🛡️',
  //   },
  //   {
  //     title: 'Vazamento de água na calçada',
  //     area: 'Água/Compesa',
  //     neighborhood: 'Casa Amarela',
  //     department: 'Compesa',
  //     deadline: '11/06/2026',
  //     status: 'Em andamento',
  //     statusClass: 'status--progress',
  //     icon: '💧',
  //   },
  //   {
  //     title: 'Falta de vagas em creche',
  //     area: 'Educação',
  //     neighborhood: 'Dois Unidos',
  //     department: 'Secretaria de Educação',
  //     deadline: '30/06/2026',
  //     status: 'Aberta',
  //     statusClass: 'status--open',
  //     icon: '🎓',
  //   },
  // ];

  // get filteredDemands(): DemandCard[] {
  //   return this.demands;
  // }
}
