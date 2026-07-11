import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonDetail } from '../pessoa-modal/pessoa-modal.component';
import { CommonModule } from '@angular/common';
import { PeopleService } from '../../services/people.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-person',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {

  private peopleService = inject(PeopleService);

  readonly availableActivities = [
    'Funcional',
    'Boxe',
    'Curso de Costura'
  ];

  activityInput = '';

  form!: FormGroup;

  isSaving = false;


  private snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePersonComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      // Dados pessoais
      name: ['', Validators.required],
      birthDate: [''],
      cpf: [''],
      phone: [''],
      facebook: [''],
      instagram: [''],

      // Endereço
      address: [''],
      reference: [''],
      neighborhood: [''],
      city: [''],
      uf: [''],
      cep: [''],
      community: [''],

      // Dados eleitorais
      pollingPlace: [''],
      voterTitle: [''],
      zone: [''],
      section: [''],
      coordinator: [''],

      // Atividades
      activities: [[]],
      completedActivities: [[]],

      // Observações
      obs: ['']
    });
  }

  get nameControl() {
    return this.form.get('name');
  }

  isActivitySelected(activity: string): boolean {
    const activities =
      this.form.get('activities')?.value || [];

    return activities.includes(activity);
  }

  isCompletedSelected(activity: string): boolean {
    const activities =
      this.form.get('completedActivities')?.value || [];

    return activities.includes(activity);
  }

  toggleActivity(activity: string): void {
    const control = this.form.get('activities');

    const current = [...(control?.value || [])];

    const index = current.indexOf(activity);

    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(activity);
    }

    control?.setValue(current);
  }

  toggleCompleted(activity: string): void {
    const control =
      this.form.get('completedActivities');

    const current = [...(control?.value || [])];

    const index = current.indexOf(activity);

    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(activity);
    }

    control?.setValue(current);
  }

  // submit(): void {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     return;
  //   }

  //   const payload =
  //     this.form.getRawValue() as PersonDetail;

  //   this.dialogRef.close(payload);
  // }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // const payload = this.form.getRawValue();
    const formValue = this.form.getRawValue();

    const payload = {
      nome: formValue.name,
      cpf: formValue.cpf,
      dataNascimento: formValue.birthDate,
      telefone: formValue.phone,
      facebook: formValue.facebook,
      instagram: formValue.instagram,

      endereco: formValue.address,
      pontoReferencia: formValue.reference,
      bairro: formValue.neighborhood,
      cidade: formValue.city,
      uf: formValue.uf,
      cep: formValue.cep,
      comunidade: formValue.community,

      localVotacao: formValue.pollingPlace,
      tituloEleitor: formValue.voterTitle,
      zona: formValue.zone,
      secao: formValue.section,
      coordenador: formValue.coordinator,

      atividades: formValue.activities,
      obs: formValue.obs,
    };
    console.log('Payload to submit:', payload);
    this.isSaving = true;

    this.peopleService.create(payload)
      .subscribe({
        next: (person) => {
          this.isSaving = false;
          this.showToast('Pessoa cadastrada com sucesso!', 'success');
          this.dialogRef.close(person);
        },
        error: (error) => {
          this.isSaving = false;
          this.showToast('Erro ao cadastrar pessoa!', 'error');
          console.error(error);
        }
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  onOverlayClick(event: MouseEvent): void {
    if (
      (event.target as HTMLElement)
        .classList.contains('modal-overlay')
    ) {
      this.close();
    }
  }

  addActivity(input: HTMLInputElement): void {
    const activity = input.value.trim();

    if (!activity) {
      return;
    }

    const activities = [
      ...(this.form.get('activities')?.value || [])
    ];

    if (!activities.includes(activity)) {
      activities.push(activity);

      this.form.get('activities')?.setValue(activities);
    }

    input.value = '';
  }
  removeActivity(activity: string): void {
    const activities = (
      this.form.get('activities')?.value || []
    ).filter((item: string) => item !== activity);

    this.form.get('activities')?.setValue(activities);
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success'
        ? 'toast-success'
        : 'toast-error'
    });
  }

}
