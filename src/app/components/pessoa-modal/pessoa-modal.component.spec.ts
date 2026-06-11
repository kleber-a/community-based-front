import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PessoaModalComponent } from './pessoa-modal.component';

describe('PessoaModalComponent', () => {
  let component: PessoaModalComponent;
  let fixture: ComponentFixture<PessoaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PessoaModalComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
