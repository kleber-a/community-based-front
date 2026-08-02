import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { DemandStreetService } from '../../services/demand-street.service';
import { DemandStreet } from '../../../models/demand-street.model';
import { DemandStreetModalComponent } from '../../components/demand-street-modal/demand-street-modal.component';


@Component({
  standalone: true,
  selector: 'app-demandas-page',

  imports: [
    PageHeaderComponent,
    DatePipe,
    FormsModule,
  ],

  templateUrl: './demandas-page.component.html',
  styleUrl: './demandas-page.component.scss',
})
export class DemandasPageComponent {

  private service = inject(DemandStreetService);

  private dialog = inject(MatDialog);

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
        this.filtro,
      )
      .subscribe({

        next: (res) => {

          this.demandas = res.data;

          this.totalPages =
            res.meta.totalPages;

          this.total =
            res.meta.total;

        },

        error: (err) => {

          console.error(
            'Erro ao buscar demandas:',
            err,
          );

        },

      });

  }

  openModal(demand: DemandStreet) {

    const dialogRef =
      this.dialog.open(
        DemandStreetModalComponent,
        {

          data: demand,

          panelClass:
            'demanda-dialog-panel',

          maxWidth: '100vw',

          width: '850px',

        },
      );

    dialogRef
      .afterClosed()
      .subscribe(resultado => {

        if (resultado) {

          this.buscarDemandas();

        }

      });

  }

  getIcon(
    orgao?: string | null,
  ): string {

    switch (
    orgao?.toUpperCase()
    ) {

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

}
