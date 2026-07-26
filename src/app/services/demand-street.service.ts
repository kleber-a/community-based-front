import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse, Person } from './people.service';

@Injectable({
  providedIn: 'root',
})
export class DemandStreetService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/demand-street';

  // getAll(
  //   page = 1,
  //   limit = 5,
  //   nome?: string,
  //   cpf?: string
  // ): Observable<PaginatedResponse<Person>> {
  //   let params = new HttpParams()
  //     .set('page', page)
  //     .set('limit', limit);

  //   if (nome) {
  //     params = params.set('nome', nome);
  //   }

  //   if (cpf) {
  //     params = params.set('cpf', cpf);
  //   }

  //   return this.http.get<PaginatedResponse<Person>>(
  //     this.apiUrl,
  //     { params }
  //   );
  // }


  // create(data: any): Observable<Person> {
  //   return this.http.post<Person>(
  //     this.apiUrl,
  //     data
  //   );
  // }

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
