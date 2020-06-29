import { ContactList } from './entities';

export default class Constants {
  public static skillsList: string[] = [
    'HTML',
    'CSS',
    'Javascript',
    'Angular',
    'Java',
    'Spring Boot',
    'MongoDB'
  ];

  public static chargeList: string[] = [
    'Assessor',
    'CEO',
    'Cientista de dados',
    'Desenvolvedor',
    'Engenheiro de Software',
    'Estagiário',
    'Gerente',
  ];

  public static teamList: string[] = [
    'Squad Inovação',
    'Squad Engenharia',
    'Squad IA'
  ];

  public static contactList: ContactList[] = [
    {
      icon: 'phone',
      text: ''
    },
    {
      icon: 'mobile',
      text: ''
    },
    {
      icon: 'building',
      text: ''
    },
    {
      icon: 'envelope-o',
      text: ''
    },
    {
      icon: 'facebook',
      text: ''
    },
    {
      icon: 'linkedin',
      text: ''
    }
  ];

  public static chips = [
    { name: 'Nome', state: false },
    { name: 'Cargo', state: false },
    { name: 'Competências', state: false },
    { name: 'Time', state: false }
  ];
}