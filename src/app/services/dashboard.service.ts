import {
  Injectable,
  inject,
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import {
  Observable,
} from 'rxjs';


export interface PessoaPorBairro {
  bairro: string;
  quantidade: number;
}


export interface DashboardResponse {

  resumo: {

    totalPessoas:
    number;

    totalBairros:
    number;

    totalDemandas:
    number;

    demandasPendentes:
    number;

    demandasResolvidas:
    number;

    totalAniversariantes:
    number;

  };


  pessoasPorBairro:
  PessoaPorBairro[];


  demandasRecentes: {

    id:
    string;

    titulo:
    string;

    bairro:
    string | null;

    rua:
    string | null;

    orgaoResponsavel:
    string | null;

    status:
    | 'PENDENTE'
    | 'EM_ANDAMENTO'
    | 'RESOLVIDO';

  }[];


  aniversariantes: {

    nome:
    string;

    dataNascimento:
    string;

    bairro:
    string | null;

    telefone:
    string | null;

  }[];

}


@Injectable({
  providedIn:
    'root',
})
export class DashboardService {

  private http =
    inject(
      HttpClient,
    );


  private apiUrl =
    'http://localhost:3000/dashboard';


  getDashboard():
    Observable<DashboardResponse> {

    return this.http.get<
      DashboardResponse
    >(

      this.apiUrl,

    );

  }

}
// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';


// export type DashboardResponse = {

//   resumo: {
//     totalPessoas: number;
//     totalDemandas: number;
//     demandasPendentes: number;
//     demandasEmAndamento: number;
//     demandasResolvidas: number;
//     totalAniversariantes: number;
//     totalBairros: number;
//   };

//   aniversariantes: Aniversariante[];

//   proximosAniversariantes: ProximoAniversariante[];

//   ultimosCadastros: UltimoCadastro[];

//   demandasRecentes: DemandaRecente[];

//   demandasUrgentes: DemandaUrgente[];

//   pessoasPorBairro: PessoaPorBairro[];

//   pessoasPorCategoria: PessoaPorCategoria[];

//   demandasPorStatus: DemandaPorStatus[];

//   evolucao: EvolucaoMensal[];

// };


// export type Aniversariante = {

//   id: string;

//   nome: string;

//   dataNascimento: string;

//   bairro: string | null;

//   telefone: string | null;

//   idade: number;

// };


// export type ProximoAniversariante = {

//   id: string;

//   nome: string;

//   dataNascimento: string;

//   bairro: string | null;

//   telefone: string | null;

//   idadeQueFara: number;

//   diasRestantes: number;

//   proximoAniversario: string;

// };


// export type UltimoCadastro = {

//   id: string;

//   nome: string;

//   bairro: string | null;

//   cidade: string | null;

//   criadoEm: string;

//   categorias: {
//     id: string;
//     nome: string;
//   }[];

// };


// export type DemandaRecente = {

//   id: string;

//   titulo: string;

//   bairro: string | null;

//   rua: string | null;

//   status:
//   | 'PENDENTE'
//   | 'EM_ANDAMENTO'
//   | 'RESOLVIDO';

//   prioridade:
//   | 'BAIXA'
//   | 'MEDIA'
//   | 'ALTA'
//   | 'URGENTE';

//   orgaoResponsavel: string | null;

//   criadoEm: string;

// };


// export type DemandaUrgente = {

//   id: string;

//   titulo: string;

//   descricao: string | null;

//   bairro: string | null;

//   rua: string | null;

//   status:
//   | 'PENDENTE'
//   | 'EM_ANDAMENTO'
//   | 'RESOLVIDO';

//   prioridade:
//   | 'BAIXA'
//   | 'MEDIA'
//   | 'ALTA'
//   | 'URGENTE';

//   criadoEm: string;

// };


// export type PessoaPorBairro = {

//   bairro: string;

//   quantidade: number;

// };


// export type PessoaPorCategoria = {

//   id: string;

//   nome: string;

//   quantidade: number;

// };


// export type DemandaPorStatus = {

//   status:
//   | 'PENDENTE'
//   | 'EM_ANDAMENTO'
//   | 'RESOLVIDO';

//   quantidade: number;

// };


// export type EvolucaoMensal = {

//   mes: string;

//   pessoas: number;

//   demandas: number;

// };


// @Injectable({
//   providedIn: 'root',
// })
// export class DashboardService {

//   private http = inject(HttpClient);

//   private apiUrl =
//     'http://localhost:3000/dashboard';


//   getDashboard():
//     Observable<DashboardResponse> {

//     return this.http.get<DashboardResponse>(
//       this.apiUrl,
//     );

//   }

// }
