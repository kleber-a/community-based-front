import {
  Component,
  Inject,
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  FormsModule,
} from '@angular/forms';

import {
  DemandStreet,
} from '../../../models/demand-street.model';

import {
  DemandStreetService,
} from '../../services/demand-street.service';
import { PeopleService } from '../../services/people.service';


type DemandStreetForm = {

  titulo: string;

  descricao:
  string | null;

  status: string;

  prioridade: string;

  rua:
  string | null;

  numero:
  string | null;

  complemento:
  string | null;

  bairro:
  string | null;

  cidade:
  string | null;

  uf:
  string | null;

  cep:
  string | null;

  referencia:
  string | null;

  protocolo:
  string | null;

  orgaoResponsavel:
  string | null;

  descricaoStatus:
  string | null;

  observacaoInterna:
  string | null;

  dataSolicitacao:
  string | null;

  dataPrevisao:
  string | null;

  dataFinalizacao:
  string | null;

};

@Component({

  selector:
    'app-demand-street-modal',

  standalone: true,

  imports: [

    FormsModule,

    MatDialogModule,

  ],

  templateUrl:
    './demand-street-modal.component.html',

  styleUrl:
    './demand-street-modal.component.scss',

})
export class DemandStreetModalComponent {

  salvando = false;

  form: DemandStreetForm;

  cpfSolicitante = '';

  buscandoSolicitante = false;

  mensagemSolicitante = '';

  tipoMensagemSolicitante:
    'success'
    | 'error'
    | '' = '';

  solicitantes:
    DemandStreet['solicitantes'] = [];

  constructor(

    @Inject(
      MAT_DIALOG_DATA,
    )
    public data:
      DemandStreet,

    private dialogRef:
      MatDialogRef<
        DemandStreetModalComponent
      >,

    private service:
      DemandStreetService,

    private peopleService:
      PeopleService,

  ) {

    this.solicitantes =
      [
        ...(
          data.solicitantes
          || []
        ),
      ];

    this.form = {

      titulo:
        data.titulo,

      descricao:
        data.descricao,

      status:
        data.status,

      prioridade:
        data.prioridade,

      rua:
        data.rua,

      numero:
        data.numero,

      complemento:
        data.complemento,

      bairro:
        data.bairro,

      cidade:
        data.cidade,

      uf:
        data.uf,

      cep:
        data.cep,

      referencia:
        data.referencia,

      protocolo:
        data.protocolo,

      orgaoResponsavel:
        data.orgaoResponsavel,

      descricaoStatus:
        data.descricaoStatus,

      observacaoInterna:
        data.observacaoInterna,

      dataSolicitacao:
        this.formatarDataParaInput(
          data.dataSolicitacao,
        ),

      dataPrevisao:
        this.formatarDataParaInput(
          data.dataPrevisao,
        ),

      dataFinalizacao:
        this.formatarDataParaInput(
          data.dataFinalizacao,
        ),

    };

  }

  salvar() {

    this.salvando = true;

    const payload = {

      ...this.form,

      dataSolicitacao:
        this.formatarDataParaApi(
          this.form.dataSolicitacao,
        ),

      dataPrevisao:
        this.formatarDataParaApi(
          this.form.dataPrevisao,
        ),

      dataFinalizacao:
        this.formatarDataParaApi(
          this.form.dataFinalizacao,
        ),


    };

    this.service
      .update(
        this.data.id,
        payload,
      )
      .subscribe({

        next: resultado => {

          this.salvando = false;

          this.dialogRef.close(
            resultado,
          );

        },

        error: err => {

          this.salvando = false;

          console.error(
            'Erro ao atualizar demanda:',
            err,
          );

        },

      });

  }

  adicionarSolicitante() {

    const cpfLimpo =
      this.cpfSolicitante
        .replace(
          /\D/g,
          '',
        );

    if (
      cpfLimpo.length !== 11
    ) {

      this.mensagemSolicitante =
        'Informe um CPF válido.';

      this.tipoMensagemSolicitante =
        'error';

      return;

    }

    this.buscandoSolicitante =
      true;

    this.mensagemSolicitante =
      '';

    this.peopleService
      .getAll(
        1,
        1,
        '',
        cpfLimpo,
      )
      .subscribe({

        next: resposta => {

          const pessoa =
            resposta.data?.[0];

          if (
            !pessoa
          ) {

            this.buscandoSolicitante =
              false;

            this.mensagemSolicitante =
              'Nenhuma pessoa foi encontrada com este CPF.';

            this.tipoMensagemSolicitante =
              'error';

            return;

          }

          const jaExiste =
            this.solicitantes.some(

              solicitante =>

                solicitante.pessoaId
                === pessoa.id,

            );

          if (
            jaExiste
          ) {

            this.buscandoSolicitante =
              false;

            this.mensagemSolicitante =
              'Esta pessoa já está vinculada à demanda.';

            this.tipoMensagemSolicitante =
              'error';

            return;

          }

          this.vincularSolicitante(
            pessoa.id,
          );

        },

        error: err => {

          this.buscandoSolicitante =
            false;

          this.mensagemSolicitante =
            'Não foi possível buscar a pessoa pelo CPF.';

          this.tipoMensagemSolicitante =
            'error';

          console.error(
            err,
          );

        },

      });

  }

  private vincularSolicitante(
    pessoaId: string,
  ) {

    this.service
      .adicionarSolicitante(

        this.data.id,

        [
          pessoaId,
        ],

      )
      .subscribe({

        next: demandaAtualizada => {

          this.buscandoSolicitante =
            false;

          this.solicitantes =
            demandaAtualizada
              .solicitantes;

          this.data.solicitantes =
            demandaAtualizada
              .solicitantes;

          this.cpfSolicitante =
            '';

          this.mensagemSolicitante =
            'Solicitante adicionado com sucesso.';

          this.tipoMensagemSolicitante =
            'success';

        },

        error: err => {

          this.buscandoSolicitante =
            false;

          this.mensagemSolicitante =
            'Não foi possível adicionar o solicitante.';

          this.tipoMensagemSolicitante =
            'error';

          console.error(
            err,
          );

        },

      });

  }



  fechar() {

    this.dialogRef.close();

  }

  private formatarDataParaInput(
    data:
      string
      | Date
      | null
      | undefined,
  ): string | null {

    if (!data) {

      return null;

    }

    return new Date(data)
      .toISOString()
      .split('T')[0];

  }

  private formatarDataParaApi(
    data: string | null | undefined,
  ): string | null {

    if (!data) {
      return null;
    }

    return new Date(
      `${data}T00:00:00.000Z`,
    ).toISOString();

  }

}
