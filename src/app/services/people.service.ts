import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
  categorias: Category[];
}

export interface Category {
  id: string;
  nome: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/people';

  getAll(
    page = 1,
    limit = 5,
    nome?: string,
    cpf?: string
  ): Observable<PaginatedResponse<Person>> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (nome) {
      params = params.set('nome', nome);
    }

    if (cpf) {
      params = params.set('cpf', cpf);
    }

    return this.http.get<PaginatedResponse<Person>>(
      this.apiUrl,
      { params }
    );
  }


  create(data: any): Observable<Person> {
    return this.http.post<Person>(
      this.apiUrl,
      data
    );
  }

  importarPlanilha(arquivo: File) {

    const formData = new FormData();

    formData.append(
      'arquivo',
      arquivo
    );


    return this.http.post(
      `${this.apiUrl}/importar`,
      formData
    );

  }

}
