import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { PessoaModalComponent, PersonDetail } from '../../components/pessoa-modal/pessoa-modal.component'
import { CreatePersonComponent } from '../../components/create-person/create-person.component';
import { FormsModule } from '@angular/forms';
import { PaginatedResponse, PeopleService, Person } from '../../services/people.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

// type PeopleRow = {
// 	name: string;
// 	phone: string;
// 	neighborhood: string;
// 	support: string;
// 	supportClass: 'tag--supporter' | 'tag--indeciso' | 'tag--muted';
// 	activities: string[];
// };

type PeopleRow = PersonDetail & {
  // colunas visíveis na tabela
  neighborhood: string;
  activities: string[];
};


@Component({
  standalone: true,
  selector: 'app-pessoas-page',
  imports: [PageHeaderComponent, FormsModule, AsyncPipe],
  templateUrl: './pessoas-page.component.html',
  styleUrl: './pessoas-page.component.scss',
})
export class PessoasPageComponent {

  private peopleService = inject(PeopleService);

  private dialog = inject(MatDialog);

  nameFilter = '';
  cpfFilter = '';
  people$!: Observable<PaginatedResponse<Person>>;
  // people: PersonDetail[] = [];

  page = 1;
  limit = 5;
  totalPages = 0;
  total = 0;

  ngOnInit(): void {
    this.loadPeople();
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


  // pessoas-page.component.ts
  // openCadastro() {
  //   const ref = this.dialog.open(CreatePersonComponent, {
  //     maxWidth: '100vw',
  //     width: '680px',
  //   });

  //   ref.afterClosed().subscribe((pessoa) => {
  //     if (pessoa) {
  //       // this.peopleMock.push(pessoa); // ou envie para o seu serviço/API
  //     }
  //   });
  // }

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



