import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { PessoaModalComponent, PersonDetail } from '../../components/pessoa-modal/pessoa-modal.component'
import { CreatePersonComponent } from '../../components/create-person/create-person.component';

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
  imports: [PageHeaderComponent],
  templateUrl: './pessoas-page.component.html',
  styleUrl: './pessoas-page.component.scss',
})
export class PessoasPageComponent {
	// readonly supportFilterOptions = ['todos', 'Apoiador', 'Indeciso', 'Contrário'];

	// readonly activityFilterOptions = ['todos', 'Funcional', 'Boxe', 'Curso de Costura'];

	// readonly peopleMock: PeopleRow[] = [
	// 	{
	// 		name: 'Maria das Graças Silva',
	// 		phone: '(81) 99999-1001',
	// 		neighborhood: 'Ibura',
	// 		support: 'Apoiador',
	// 		supportClass: 'tag--supporter',
	// 		activities: ['Funcional'],
	// 	},
	// 	{
	// 		name: 'José Carlos Pereira',
	// 		phone: '(81) 99999-1002',
	// 		neighborhood: 'Cohab',
	// 		support: 'Apoiador',
	// 		supportClass: 'tag--supporter',
	// 		activities: ['Boxe'],
	// 	},
	// 	{
	// 		name: 'Ana Beatriz Lima',
	// 		phone: '(81) 99999-1003',
	// 		neighborhood: 'Boa Viagem',
	// 		support: 'Indeciso',
	// 		supportClass: 'tag--indeciso',
	// 		activities: [],
	// 	},
	// 	{
	// 		name: 'Severino Ramos',
	// 		phone: '(81) 99999-1004',
	// 		neighborhood: 'Nova Descoberta',
	// 		support: 'Apoiador',
	// 		supportClass: 'tag--supporter',
	// 		activities: [],
	// 	},
	// 	{
	// 		name: 'Juliana Santos',
	// 		phone: '(81) 99999-1005',
	// 		neighborhood: 'Casa Amarela',
	// 		support: 'Indeciso',
	// 		supportClass: 'tag--indeciso',
	// 		activities: ['Funcional', 'Curso de Costura'],
	// 	},
  //   		{
	// 		name: 'Juliana Santos',
	// 		phone: '(81) 99999-1005',
	// 		neighborhood: 'Casa Amarela',
	// 		support: 'Indeciso',
	// 		supportClass: 'tag--indeciso',
	// 		activities: ['Funcional', 'Curso de Costura'],
	// 	},
  //   		{
	// 		name: 'Juliana Santos',
	// 		phone: '(81) 99999-1005',
	// 		neighborhood: 'Casa Amarela',
	// 		support: 'Indeciso',
	// 		supportClass: 'tag--indeciso',
	// 		activities: ['Funcional', 'Curso de Costura'],
	// 	},
  //   		{
	// 		name: 'Juliana Santos',
	// 		phone: '(81) 99999-1005',
	// 		neighborhood: 'Casa Amarela',
	// 		support: 'Indeciso',
	// 		supportClass: 'tag--indeciso',
	// 		activities: ['Funcional', 'Curso de Costura'],
	// 	},
  //   		{
	// 		name: 'Juliana Santos',
	// 		phone: '(81) 99999-1005',
	// 		neighborhood: 'Casa Amarela',
	// 		support: 'Indeciso',
	// 		supportClass: 'tag--indeciso',
	// 		activities: ['Funcional', 'Curso de Costura'],
	// 	},
  //   		{
	// 		name: 'Juliana Santos',
	// 		phone: '(81) 99999-1005',
	// 		neighborhood: 'Casa Amarela',
	// 		support: 'Indeciso',
	// 		supportClass: 'tag--indeciso',
	// 		activities: ['Funcional', 'Curso de Costura'],
	// 	},
  //   		{
	// 		name: 'Juliana Santos',
	// 		phone: '(81) 99999-1005',
	// 		neighborhood: 'Casa Amarela',
	// 		support: 'Indeciso',
	// 		supportClass: 'tag--indeciso',
	// 		activities: ['Funcional', 'Curso de Costura'],
	// 	},
	// 	{
	// 		name: 'Juliana Santos',
	// 		phone: '(81) 99999-1005',
	// 		neighborhood: 'Casa Amarela',
	// 		support: 'Indeciso',
	// 		supportClass: 'tag--indeciso',
	// 		activities: ['Funcional', 'Curso de Costura'],
	// 	},

	// ];

    private dialog = inject(MatDialog);

  readonly activityFilterOptions = ['todos', 'Funcional', 'Boxe', 'Curso de Costura'];

  readonly peopleMock: PeopleRow[] = [
    {
      name: 'Maria das Graças Silva',
      birthDate: '12/03/1985',
      phone: '(81) 99999-1001',
      address: 'Rua das Palmeiras, 45',
      reference: 'Próximo à padaria São José',
      neighborhood: 'Ibura',
      city: 'Recife',
      uf: 'PE',
      cep: '51220-010',
      community: 'Comunidade do Ibura',
      pollingPlace: 'Escola Municipal Ibura',
      voterTitle: '1234 5678 9012',
      zone: '42',
      section: '0123',
      coordinator: 'João da Silva',
      facebook: 'maria.gracas.silva',
      instagram: '@mariagracas',
      obs: 'Muito ativa na comunidade. Participa de todas as reuniões de bairro.',
      activities: ['Funcional'],
      // completedActivities: ['Yoga', 'Caminhada'],
    },
    {
      name: 'José Carlos Pereira',
      birthDate: '07/11/1978',
      phone: '(81) 99999-1002',
      address: 'Av. Principal, 200',
      reference: 'Em frente à praça central',
      neighborhood: 'Cohab',
      city: 'Recife',
      uf: 'PE',
      cep: '50870-000',
      community: 'Cohab',
      pollingPlace: 'EMEF Cohab',
      voterTitle: '9876 5432 1098',
      zone: '15',
      section: '0456',
      coordinator: 'Maria Lima',
      facebook: '',
      instagram: '@josecarlosboxe',
      obs: '',
      activities: ['Boxe'],
      // completedActivities: [],
    },
    {
      name: 'Ana Beatriz Lima',
      birthDate: '22/06/1995',
      phone: '(81) 99999-1003',
      address: 'Rua do Mar, 10, Apto 301',
      reference: '',
      neighborhood: 'Boa Viagem',
      city: 'Recife',
      uf: 'PE',
      cep: '51030-060',
      community: '',
      pollingPlace: 'Escola Estadual Boa Viagem',
      voterTitle: '1122 3344 5566',
      zone: '08',
      section: '0789',
      coordinator: '',
      facebook: 'anabeatrizlima95',
      instagram: '',
      obs: 'Tem interesse em ser voluntária no próximo evento.',
      activities: [],
      // completedActivities: ['Funcional'],
    },
    {
      name: 'Severino Ramos',
      birthDate: '15/01/1960',
      phone: '(81) 99999-1004',
      address: 'Rua Nova, 88',
      reference: 'Perto do posto de saúde',
      neighborhood: 'Nova Descoberta',
      city: 'Recife',
      uf: 'PE',
      cep: '52061-350',
      community: 'Nova Descoberta',
      pollingPlace: 'UE Nova Descoberta',
      voterTitle: '7788 9900 1122',
      zone: '31',
      section: '0234',
      coordinator: 'Luciana Andrade',
      facebook: '',
      instagram: '',
      obs: '',
      activities: [],
      // completedActivities: [],
    },
    {
      name: 'Juliana Santos',
      birthDate: '30/09/2000',
      phone: '(81) 99999-1005',
      address: 'Rua Amarela, 55, Casa 2',
      reference: 'Atrás da Igreja Nossa Senhora',
      neighborhood: 'Casa Amarela',
      city: 'Recife',
      uf: 'PE',
      cep: '52070-230',
      community: 'Casa Amarela',
      pollingPlace: 'EMEF Casa Amarela',
      voterTitle: '3344 5566 7788',
      zone: '22',
      section: '0567',
      coordinator: 'Pedro Costa',
      facebook: 'julianasantos2000',
      instagram: '@ju.santos',
      obs: 'Está cursando ensino superior e tem disponibilidade nos fins de semana.',
      activities: ['Funcional', 'Curso de Costura'],
      // completedActivities: ['Boxe'],
    },
  ];

  openModal(person: PeopleRow) {
    this.dialog.open(PessoaModalComponent, {
      data: person,
      panelClass: 'pessoa-dialog-panel',
      maxWidth: '100vw',
      width: '680px',
    });
  }


  // pessoas-page.component.ts
  openCadastro() {
    const ref = this.dialog.open(CreatePersonComponent, {
      maxWidth: '100vw',
      width: '680px',
    });

    ref.afterClosed().subscribe((pessoa) => {
      if (pessoa) {
        this.peopleMock.push(pessoa); // ou envie para o seu serviço/API
      }
    });
  }

}



