import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

type PeopleRow = {
	name: string;
	phone: string;
	neighborhood: string;
	support: string;
	supportClass: 'tag--supporter' | 'tag--indeciso' | 'tag--muted';
	activities: string[];
};

@Component({
  standalone: true,
  selector: 'app-pessoas-page',
  imports: [PageHeaderComponent],
  template: `
  <div class="pessoas-page">

        <!-- <app-page-header
          kicker="Pessoas da Comunidade"
          title="Pessoas da Comunidade"
          subtitle="Cadastro e classificação do eleitorado"
          actionLabel="Cadastrar"
          actionIcon="+"
        /> -->

        <section class="page-filters">
          <label class="search-field">
            <span class="search-field__icon" aria-hidden="true">⌕</span>
            <input type="search" placeholder="Buscar por nome ou telefone..." />
          </label>

          <select aria-label="Filtro de apoio">
            @for (option of supportFilterOptions; track option) {
              <option>{{ option }}</option>
            }
          </select>

          <select aria-label="Filtro de atividades">
            @for (option of activityFilterOptions; track option) {
              <option>{{ option }}</option>
            }
          </select>
        </section>

        <section class="table-card">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Bairro</th>
                <th>Apoio</th>
                <th>Atividades</th>
              </tr>
            </thead>
            <tbody>
              @for (person of peopleMock; track person.name) {
                <tr>
                  <td>{{ person.name }}</td>
                  <td>{{ person.phone }}</td>
                  <td>{{ person.neighborhood }}</td>
                  <td><span class="tag" [class.tag--supporter]="person.supportClass === 'tag--supporter'" [class.tag--indeciso]="person.supportClass === 'tag--indeciso'" [class.tag--muted]="person.supportClass === 'tag--muted'">{{ person.support }}</span></td>
                  <td>
                    @for (activity of person.activities; track activity) {
                      <span class="tag">{{ activity }}</span>
                    }
                    @if (!person.activities.length) {
                      <span class="tag tag--muted">—</span>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </section>

  </div>
  `,
  styles: [`

  .pessoas-page {}

	.page-filters {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 170px 170px;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.search-field,
	select,
	.table-card {
		border: 1px solid var(--border-color);
		border-radius: 1rem;
		background: var(--surface);
		box-shadow: var(--shadow-soft);
	}

	.search-field {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0 0.9rem;
		min-height: 2.8rem;
	}

	.search-field__icon {
		color: var(--text-muted);
		font-size: 1rem;
	}

	input,
	select {
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--text-primary);
		font: inherit;
	}

	input {
		width: 100%;
	}

	select {
		padding: 0 0.9rem;
		min-height: 2.8rem;
	}

	.table-card {
		overflow: hidden;
		margin-top: 1rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead th {
		padding: 1rem 0.85rem;
		text-align: left;
		color: var(--text-primary);
		font-size: 0.85rem;
		font-weight: 700;
	}

	tbody td {
		padding: 0.9rem 0.85rem;
		border-top: 1px solid var(--border-color);
		color: var(--text-primary);
		font-size: 0.95rem;
	}

	tbody tr:hover {
		background: rgba(255, 255, 255, 0.02);
	}

	.tag {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.55rem;
		border-radius: 999px;
		margin-right: 0.35rem;
		background: rgba(31, 95, 191, 0.08);
		color: var(--text-primary);
		font-size: 0.8rem;
		font-weight: 600;
	}

	.tag--supporter {
		background: rgba(19, 169, 104, 0.16);
		color: #0b7a4a;
	}

	.tag--indeciso {
		background: rgba(224, 180, 0, 0.18);
		color: #8c6700;
	}

	.tag--muted {
		background: rgba(16, 36, 72, 0.08);
		color: var(--text-muted);
	}

	@media (max-width: 960px) {
		.page-filters {
			grid-template-columns: 1fr;
		}

		table {
			display: block;
			overflow-x: auto;
		}
	}
  `],
})
export class PessoasPageComponent {
	readonly supportFilterOptions = ['todos', 'Apoiador', 'Indeciso', 'Contrário'];

	readonly activityFilterOptions = ['todos', 'Funcional', 'Boxe', 'Curso de Costura'];

	readonly peopleMock: PeopleRow[] = [
		{
			name: 'Maria das Graças Silva',
			phone: '(81) 99999-1001',
			neighborhood: 'Ibura',
			support: 'Apoiador',
			supportClass: 'tag--supporter',
			activities: ['Funcional'],
		},
		{
			name: 'José Carlos Pereira',
			phone: '(81) 99999-1002',
			neighborhood: 'Cohab',
			support: 'Apoiador',
			supportClass: 'tag--supporter',
			activities: ['Boxe'],
		},
		{
			name: 'Ana Beatriz Lima',
			phone: '(81) 99999-1003',
			neighborhood: 'Boa Viagem',
			support: 'Indeciso',
			supportClass: 'tag--indeciso',
			activities: [],
		},
		{
			name: 'Severino Ramos',
			phone: '(81) 99999-1004',
			neighborhood: 'Nova Descoberta',
			support: 'Apoiador',
			supportClass: 'tag--supporter',
			activities: [],
		},
		{
			name: 'Juliana Santos',
			phone: '(81) 99999-1005',
			neighborhood: 'Casa Amarela',
			support: 'Indeciso',
			supportClass: 'tag--indeciso',
			activities: ['Funcional', 'Curso de Costura'],
		},
    		{
			name: 'Juliana Santos',
			phone: '(81) 99999-1005',
			neighborhood: 'Casa Amarela',
			support: 'Indeciso',
			supportClass: 'tag--indeciso',
			activities: ['Funcional', 'Curso de Costura'],
		},
    		{
			name: 'Juliana Santos',
			phone: '(81) 99999-1005',
			neighborhood: 'Casa Amarela',
			support: 'Indeciso',
			supportClass: 'tag--indeciso',
			activities: ['Funcional', 'Curso de Costura'],
		},
    		{
			name: 'Juliana Santos',
			phone: '(81) 99999-1005',
			neighborhood: 'Casa Amarela',
			support: 'Indeciso',
			supportClass: 'tag--indeciso',
			activities: ['Funcional', 'Curso de Costura'],
		},
    		{
			name: 'Juliana Santos',
			phone: '(81) 99999-1005',
			neighborhood: 'Casa Amarela',
			support: 'Indeciso',
			supportClass: 'tag--indeciso',
			activities: ['Funcional', 'Curso de Costura'],
		},
    		{
			name: 'Juliana Santos',
			phone: '(81) 99999-1005',
			neighborhood: 'Casa Amarela',
			support: 'Indeciso',
			supportClass: 'tag--indeciso',
			activities: ['Funcional', 'Curso de Costura'],
		},
    		{
			name: 'Juliana Santos',
			phone: '(81) 99999-1005',
			neighborhood: 'Casa Amarela',
			support: 'Indeciso',
			supportClass: 'tag--indeciso',
			activities: ['Funcional', 'Curso de Costura'],
		},
		{
			name: 'Juliana Santos',
			phone: '(81) 99999-1005',
			neighborhood: 'Casa Amarela',
			support: 'Indeciso',
			supportClass: 'tag--indeciso',
			activities: ['Funcional', 'Curso de Costura'],
		},

	];
}



