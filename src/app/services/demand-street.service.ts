import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse, Person } from './people.service';
import { DemandStreet } from '../../models/demand-street.model';

@Injectable({
  providedIn: 'root',
})
export class DemandStreetService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/demand-street';

  getAll(
    page = 1,
    limit = 9,
    filtro?: {
      titulo?: string;
      bairro?: string;
      status?: string;
      prioridade?: string;
    }
  ): Observable<PaginatedResponse<DemandStreet>> {

    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (filtro?.titulo) {
      params = params.set('titulo', filtro.titulo);
    }
    if (filtro?.prioridade) {
      params = params.set(
        'prioridade',
        filtro.prioridade
      );
    }

    if (filtro?.bairro) {
      params = params.set('bairro', filtro.bairro);
    }

    if (filtro?.status) {
      params = params.set('status', filtro.status);
    }

    if (filtro?.prioridade) {
      params = params.set('prioridade', filtro.prioridade);
    }

    return this.http.get<PaginatedResponse<DemandStreet>>(
      this.apiUrl,
      { params }
    );
  }

  update(

    id:
      string,

    payload:
      Record<
        string,
        unknown
      >,

  ): Observable<
    DemandStreet
  > {

    return this.http.patch<
      DemandStreet
    >(

      `${this.apiUrl}/${id}`,

      payload,

    );

  }

  adicionarSolicitante(
    demandaId: string,
    pessoasIds: string[],
  ) {

    return this.http.patch<DemandStreet>(

      `${this.apiUrl}/${demandaId}/solicitantes`,

      {
        pessoasIds,
      },

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
