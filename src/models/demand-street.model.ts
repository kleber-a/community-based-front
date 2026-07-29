export interface DemandStreet {
  id: string;
  titulo: string;
  descricao: string;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'RESOLVIDO';
  prioridade: 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  rua: string;
  numero: string | null;
  bairro: string;
  cidade: string;
  uf: string;
  protocolo: string | null;
  orgaoResponsavel: string | null;
  dataSolicitacao: string;
  dataFinalizacao: string | null;
  criadoEm: string;
  solicitantes: any[];
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
