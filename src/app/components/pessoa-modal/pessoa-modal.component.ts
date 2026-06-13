import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  name: string;
  cpf: string;
  birthDate?: string;
  phone?: string;
  facebook?: string;
  instagram?: string;

  address?: string;
  reference?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
  cep?: string;
  community?: string;

  pollingPlace?: string;
  voterTitle?: string;
  zone?: string;
  section?: string;
  coordinator?: string;

  activities: string[];

  obs?: string;
};

@Component({
  selector: 'app-pessoa-modal',
  templateUrl: './pessoa-modal.component.html',
  styleUrl: './pessoa-modal.component.scss'
})
export class PessoaModalComponent implements OnInit {

 constructor(
    public dialogRef: MatDialogRef<PessoaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonDetail
  ) {}

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }



}
