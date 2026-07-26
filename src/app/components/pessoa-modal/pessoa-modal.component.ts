import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CepPipe } from '../../pipes/cep.pipe';
import { Category } from '../../services/people.service';

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

export type PersonDetail = {
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
  imports: [CommonModule, CepPipe],
  templateUrl: './pessoa-modal.component.html',
  styleUrl: './pessoa-modal.component.scss'
})
export class PessoaModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PessoaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonDetail
  ) { }

  ngOnInit() {
    console.log(this.data);
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
