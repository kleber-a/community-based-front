import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { DemandStreetService } from '../../services/demand-street.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-page-header',
  standalone: true,
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  imports: [CommonModule],
})
export class PageHeaderComponent {
  @Input() kicker = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() actionLabel = '';
  @Input() actionIcon = '';
  @Input() importButtonLabel = '';

  @Output() actionClick = new EventEmitter<void>();

  arquivo!: File;

  arquivoSelecionado: File | null = null;

  private peopleService = inject(PeopleService);
  private demandStreetService = inject(DemandStreetService);

  // selecionarArquivo(event: any) {

  //   this.arquivo = event.target.files[0];

  // }

  selecionarArquivo(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.arquivo = input.files[0];
      this.arquivoSelecionado = input.files[0];
    }
  }



  enviar() {

    this.peopleService
      .importarPlanilha(this.arquivo)
      .subscribe({

        next: (res) => {
          this.peopleService.enviarMensagem(true);
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
