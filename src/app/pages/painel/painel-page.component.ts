import {
  Component,
  OnInit,
  inject,
} from '@angular/core';

import {
  DecimalPipe,
} from '@angular/common';

import {
  PageHeaderComponent,
} from '../../components/page-header/page-header.component';

import {
  DashboardResponse,
  DashboardService,
  PessoaPorBairro,
} from '../../services/dashboard.service';


type SummaryCard = {
  icon: string;
  value: string;
  label: string;
  description: string;
  variant:
  | 'mint'
  | 'cyan'
  | 'amber'
  | 'green';
};


type DemandItem = {
  id: string;
  title: string;
  meta: string;

  status:
  | 'Aberta'
  | 'Em andamento'
  | 'Resolvida';

  statusClass:
  | 'status--open'
  | 'status--progress'
  | 'status--done';
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

  imports: [
    PageHeaderComponent,
    DecimalPipe,
  ],

  templateUrl:
    './painel-page.component.html',

  styleUrl:
    './painel-page.component.scss',
})
export class PainelPageComponent
  implements OnInit {

  private dashboardService =
    inject(DashboardService);


  loading = true;

  error = false;

  evolucao = [];

  maxEvolucao = 0;

  evolucaoPoints = '';


  summaryCards:
    SummaryCard[] = [];


  supportBars:
    PessoaPorBairro[] = [];


  recentDemands:
    DemandItem[] = [];


  opportunities:
    OpportunityItem[] = [];


  aniversariantes:
    DashboardResponse['aniversariantes']
    = [];


  maxBairro = 1;


  ngOnInit(): void {

    this.carregarDashboard();

  }


  carregarDashboard(): void {

    this.loading = true;

    this.error = false;


    this.dashboardService
      .getDashboard()
      .subscribe({

        next: (
          dashboard:
            DashboardResponse,
        ) => {

          this.preencherDashboard(
            dashboard,
          );

          this.loading = false;

        },


        error: (
          error: unknown,
        ) => {

          console.error(
            'Erro ao carregar dashboard:',
            error,
          );

          this.error = true;

          this.loading = false;

        },

      });

  }


  private preencherDashboard(
    dashboard:
      DashboardResponse,
  ): void {


    /*
     * Cards do resumo.
     */
    this.summaryCards = [

      {
        icon: '👥',

        value:
          dashboard
            .resumo
            .totalPessoas
            .toLocaleString(
              'pt-BR',
            ),

        label:
          'Pessoas',

        description:
          `${dashboard.resumo.totalBairros} bairros cadastrados`,

        variant:
          'mint',
      },


      {
        icon: '📋',

        value:
          dashboard
            .resumo
            .demandasPendentes
            .toLocaleString(
              'pt-BR',
            ),

        label:
          'Demandas abertas',

        description:
          `${dashboard.resumo.totalDemandas} demandas no total`,

        variant:
          'cyan',
      },


      {
        icon: '🎂',

        value:
          dashboard
            .resumo
            .totalAniversariantes
            .toLocaleString(
              'pt-BR',
            ),

        label:
          'Aniversariantes',

        description:
          'Pessoas que fazem aniversário hoje',

        variant:
          'amber',
      },


      {
        icon: '✅',

        value:
          dashboard
            .resumo
            .demandasResolvidas
            .toLocaleString(
              'pt-BR',
            ),

        label:
          'Demandas resolvidas',

        description:
          'Demandas concluídas',

        variant:
          'green',
      },

    ];


    /*
     * Pessoas por bairro.
     */
    this.supportBars =
      dashboard
        .pessoasPorBairro;


    this.maxBairro =
      Math.max(

        ...this
          .supportBars
          .map(
            (bairro) =>
              bairro.quantidade,
          ),

        1,

      );


    /*
     * Demandas recentes.
     */
    this.recentDemands =

      dashboard
        .demandasRecentes
        .map(
          (demanda) => {

            const status =
              this.formatarStatus(
                demanda.status,
              );


            return {

              id:
                demanda.id,

              title:
                demanda.titulo,

              meta:

                [
                  demanda.bairro,

                  demanda.rua,

                  demanda.orgaoResponsavel,

                ]

                  .filter(
                    Boolean,
                  )

                  .join(
                    ' · ',
                  ),

              status:
                status.texto,

              statusClass:
                status.classe,

            };

          },
        );


    /*
     * Aniversariantes.
     */
    this.aniversariantes =

      dashboard
        .aniversariantes;


    /*
     * Bairros em destaque.
     */
    this.opportunities =

      dashboard
        .pessoasPorBairro

        .slice(
          0,
          5,
        )

        .map(
          (
            bairro,
            index,
          ) => ({

            position:
              index + 1,

            name:
              bairro.bairro,

            description:

              `${bairro.quantidade} pessoas cadastradas`,

            badge:

              index < 2

                ? 'Destaque'

                : 'Acompanhar',

          }),
        );

  }


  getLarguraBarra(
    quantidade:
      number,
  ): number {

    return (

      quantidade

      /

      this.maxBairro

    ) * 100;

  }


  private formatarStatus(

    status:
      | 'PENDENTE'
      | 'EM_ANDAMENTO'
      | 'RESOLVIDO',

  ): {

    texto:
    | 'Aberta'
    | 'Em andamento'
    | 'Resolvida';

    classe:
    | 'status--open'
    | 'status--progress'
    | 'status--done';

  } {


    switch (
    status
    ) {


      case 'EM_ANDAMENTO':

        return {

          texto:
            'Em andamento',

          classe:
            'status--progress',

        };


      case 'RESOLVIDO':

        return {

          texto:
            'Resolvida',

          classe:
            'status--done',

        };


      case 'PENDENTE':

      default:

        return {

          texto:
            'Aberta',

          classe:
            'status--open',

        };

    }

  }

}
