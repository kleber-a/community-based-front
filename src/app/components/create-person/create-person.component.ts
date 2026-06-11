import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonDetail } from '../pessoa-modal/pessoa-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-person',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {

  readonly availableActivities = [
    'Funcional',
    'Boxe',
    'Curso de Costura'
  ];

  activityInput = '';

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePersonComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Dados pessoais
      name: ['', Validators.required],
      birthDate: [''],
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

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload =
      this.form.getRawValue() as PersonDetail;

    this.dialogRef.close(payload);
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

}
