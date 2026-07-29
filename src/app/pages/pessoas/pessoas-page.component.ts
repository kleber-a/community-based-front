import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { PessoaModalComponent, PersonDetail } from '../../components/pessoa-modal/pessoa-modal.component'
import { CreatePersonComponent } from '../../components/create-person/create-person.component';
import { FormsModule } from '@angular/forms';
import { PaginatedResponse, PeopleService, Person } from '../../services/people.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { CategoryService } from '../../services/category.service';


type PeopleRow = PersonDetail & {
  // colunas visíveis na tabela
  neighborhood: string;
  activities: string[];
};


@Component({
  standalone: true,
  selector: 'app-pessoas-page',
  imports: [PageHeaderComponent, FormsModule, AsyncPipe, JsonPipe],
  templateUrl: './pessoas-page.component.html',
  styleUrl: './pessoas-page.component.scss',
})
export class PessoasPageComponent {

  private peopleService = inject(PeopleService);
  private categoryService = inject(CategoryService);
  private dialog = inject(MatDialog);

  nameFilter = '';
  cpfFilter = '';
  people$!: Observable<PaginatedResponse<Person>>;
  // people: PersonDetail[] = [];

  page = 1;
  limit = 10;
  totalPages = 0;
  total = 0;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadPeople();
    this.peopleService.mensagem$
      .pipe(takeUntil(this.destroy$))
      .subscribe(mensagem => {
        this.loadPeople();
      });
  }
  loadPeople(): void {
    this.people$ = this.peopleService
      .getAll(
        this.page,
        this.limit,
        this.nameFilter,
        this.cpfFilter
      )
      .pipe(
        tap(response => {
          console.log('response', response);
          this.total = response.meta.total;
          this.totalPages = response.meta.totalPages;
        })
      );
  }


  clearFilters(): void {
    this.nameFilter = '';
    this.cpfFilter = '';
    this.search();
  }

  search(): void {
    this.page = 1;
    this.loadPeople();
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPeople();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadPeople();
    }
  }


  openModal(person: Person) {
    this.dialog.open(PessoaModalComponent, {
      data: person,
      panelClass: 'pessoa-dialog-panel',
      maxWidth: '100vw',
      width: '680px',
    });
  }


  openCadastro() {
    const ref = this.dialog.open(CreatePersonComponent, {
      maxWidth: '100vw',
      width: '680px',
    });

    ref.afterClosed().subscribe((person) => {
      if (person) {
        this.loadPeople();
      }
    });
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



