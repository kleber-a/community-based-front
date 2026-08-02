// export interface DemandStreet {
//   // id: string;
//   // titulo: string;
//   // descricao: string;
//   // status: 'PENDENTE' | 'EM_ANDAMENTO' | 'RESOLVIDO';
//   // prioridade: 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
//   // rua: string;
//   // numero: string | null;
//   // bairro: string;
//   // cidade: string;
//   // uf: string;
//   // protocolo: string | null;
//   // orgaoResponsavel: string | null;
//   // dataSolicitacao: string;
//   // dataFinalizacao: string | null;
//   // criadoEm: string;
//   // solicitantes: any[];

// }


export type StatusDemanda =
  | 'PENDENTE'
  | 'EM_ANDAMENTO'
  | 'RESOLVIDO';

export type PrioridadeDemanda =
  | 'BAIXA'
  | 'MEDIA'
  | 'ALTA'
  | 'URGENTE';

export interface Solicitante {

  pessoaId: string;

  demandaId: string;

  pessoa?: {

    id: string;

    nome: string;

    cpf?: string;

    telefone?: string;

  };

}

export interface DemandStreet {

  id: string;

  titulo: string;

  descricao: string | null;

  status: StatusDemanda;

  prioridade: PrioridadeDemanda;

  // Endereço

  rua: string | null;

  numero: string | null;

  complemento: string | null;

  bairro: string | null;

  cidade: string | null;

  uf: string | null;

  cep: string | null;

  referencia: string | null;

  // Acompanhamento

  protocolo: string | null;

  orgaoResponsavel: string | null;

  descricaoStatus: string | null;

  observacaoInterna: string | null;

  // Datas

  dataSolicitacao: string | null;

  dataPrevisao: string | null;

  dataFinalizacao: string | null;

  // Outros

  fotos: string[];

  criadoEm: string;

  atualizadoEm: string;

  solicitantes: Solicitante[];

}



export interface PaginatedResponse<T> {
  data: T[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
