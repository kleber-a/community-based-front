import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { DemandStreetService } from '../../services/demand-street.service';

@Component({
  selector: 'app-page-header',
  standalone: true,
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  @Input() kicker = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() actionLabel = '';
  @Input() actionIcon = '';

  @Output() actionClick = new EventEmitter<void>();

  arquivo!: File;

  private peopleService = inject(PeopleService);
  private demandStreetService = inject(DemandStreetService);

  selecionarArquivo(event: any) {

    this.arquivo = event.target.files[0];

  }

  enviar() {

    this.peopleService
      .importarPlanilha(this.arquivo)
      .subscribe({

        next: (res) => {

          console.log('Importado', res);

        },

        error: (err) => {

          console.error(err);

        }

      });

  }



  selecionarArquivoD(event: any) {

    this.arquivo = event.target.files[0];

  }

  enviarD() {

    this.demandStreetService
      .importarPlanilha(this.arquivo)
      .subscribe({

        next: (res) => {

          console.log('Importado', res);

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

}
