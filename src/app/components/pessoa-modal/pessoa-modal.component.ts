import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CepPipe } from '../../pipes/cep.pipe';
import { Category, PeopleService } from '../../services/people.service';
import { FormsModule } from '@angular/forms';

// export type PersonDetail = {
//   // Dados pessoais
//   name: string;
//   birthDate?: string;
//   phone?: string;
//   facebook?: string;
//   instagram?: string;

//   // Endereço
//   address?: string;
//   reference?: string;
//   neighborhood?: string;
//   city?: string;
//   uf?: string;
//   cep?: string;
//   community?: string;

//   // Dados eleitorais
//   pollingPlace?: string;
//   voterTitle?: string;
//   zone?: string;
//   section?: string;
//   coordinator?: string;

//   // Atividades
//   activities: string[];
//   completedActivities?: string[];

//   // Obs
//   obs?: string;
// };

// export type PersonDetail = {
//   nome: string;
//   cpf: string;
//   dataNascimento?: string;
//   telefone?: string;
//   facebook?: string;
//   instagram?: string;

//   endereco?: string;
//   pontoReferencia?: string;
//   bairro?: string;
//   cidade?: string;
//   uf?: string;
//   cep?: string;
//   comunidade?: string;

//   localVotacao?: string;
//   tituloEleitor?: string;
//   zona?: string;
//   secao?: string;
//   coordenador?: string;

//   categorias: Category[];

//   obs?: string;
// };

export type PersonDetail = {
  id: string;

  nome: string;
  cpf: string;
  dataNascimento?: string;
  telefone?: string;
  facebook?: string;
  instagram?: string;

  endereco?: string;
  pontoReferencia?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  comunidade?: string;

  localVotacao?: string;
  tituloEleitor?: string;
  zona?: string;
  secao?: string;
  coordenador?: string;

  categorias: Category[];

  obs?: string;
};


@Component({
  selector: 'app-pessoa-modal',
  standalone: true,
  imports: [CommonModule, CepPipe, FormsModule],
  templateUrl: './pessoa-modal.component.html',
  styleUrl: './pessoa-modal.component.scss'
})
export class PessoaModalComponent implements OnInit {

  editando = false;
  form!: PersonDetail;


  constructor(
    public dialogRef: MatDialogRef<PessoaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonDetail,
    private peopleService: PeopleService
  ) { }

  ngOnInit() {
    this.form = structuredClone(this.data);
  }

  editar() {
    this.editando = true;
  }

  salvar() {
    const { id, ...dados } = structuredClone(this.form);


    const payload = {
      nome: this.form.nome,
      cpf: this.form.cpf,
      // dataNascimento: this.form.birthDate,
      dataNascimento: this.form.dataNascimento
        ? new Date(this.form.dataNascimento).toISOString()
        : null,
      telefone: this.form.telefone,
      facebook: this.form.facebook,
      instagram: this.form.instagram,

      endereco: this.form.endereco,
      pontoReferencia: this.form.pontoReferencia,
      bairro: this.form.bairro,
      cidade: this.form.cidade,
      uf: this.form.uf,
      cep: this.form.cep,
      comunidade: this.form.comunidade,

      localVotacao: this.form.localVotacao,
      tituloEleitor: this.form.tituloEleitor,
      zona: this.form.zona,
      secao: this.form.secao,
      coordenador: this.form.coordenador,

      // categoriasIds: this.form.categorias.map(categoria => categoria.id),
      obs: this.form.obs,
    };


    this.peopleService.update(
      this.data.id,
      payload
    )
      .subscribe({
        next: (res) => {

          this.dialogRef.close(res);

        },

        error: (err) => {
          console.error(err);
        }

      });

  }

  close() {
    this.dialogRef.close();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  formatCpf(cpf: string): string {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  formatPhone(phone: string): string {
    return phone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  }


}
