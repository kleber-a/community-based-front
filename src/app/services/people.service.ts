import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
  atividades: string[];
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
    name?: string,
    cpf?: string
  ): Observable<PaginatedResponse<Person>> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (name) {
      params = params.set('name', name);
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


}
