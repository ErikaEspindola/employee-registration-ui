import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list = [
    {
      id: 1,
      name: 'Érika',
      charge: 'Desenvolvedor',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Front-end',
      picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
    },
    {
      id: 2,
      name: 'Giovanni',
      charge: 'Cientista de Dados',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Data Science',
      picture: 'https://http2.mlstatic.com/bernese-mountain-dog-filhotes-D_NQ_NP_972818-MLB27708880509_072018-O.webp'
    },
    {
      id: 3,
      name: 'Érika',
      charge: 'Desenvolvedor',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Front-end',
      picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
    },
    {
      id: 4,
      name: 'Giovanni',
      charge: 'Cientista de Dados',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Data Science',
      picture: 'https://http2.mlstatic.com/bernese-mountain-dog-filhotes-D_NQ_NP_972818-MLB27708880509_072018-O.webp'
    },
    {
      id: 5,
      name: 'Érika',
      charge: 'Desenvolvedor',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Front-end',
      picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
    },
    {
      id: 6,
      name: 'Giovanni',
      charge: 'Cientista de Dados',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Data Science',
      picture: 'https://http2.mlstatic.com/bernese-mountain-dog-filhotes-D_NQ_NP_972818-MLB27708880509_072018-O.webp'
    },
    {
      id: 7,
      name: 'Érika',
      charge: 'Desenvolvedor',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Front-end',
      picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
    },
    {
      id: 8,
      name: 'Giovanni',
      charge: 'Cientista de Dados',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Data Science',
      picture: 'https://http2.mlstatic.com/bernese-mountain-dog-filhotes-D_NQ_NP_972818-MLB27708880509_072018-O.webp'
    },
    {
      id: 9,
      name: 'Érika',
      charge: 'Desenvolvedor',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Front-end',
      picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
    }
  ];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  detail(id: number) {
    this.router.navigate(['/detail-employees'], { queryParams: { id } });
  }
}
