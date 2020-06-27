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
      name: 'Érika',
      charge: 'Desenvolvedor',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Front-end',
      picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
    },
    {
      name: 'Giovanni',
      charge: 'Cientista de Dados',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Data Science',
      picture: 'https://http2.mlstatic.com/bernese-mountain-dog-filhotes-D_NQ_NP_972818-MLB27708880509_072018-O.webp'
    },
    {
      name: 'Érika',
      charge: 'Desenvolvedor',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Front-end',
      picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
    },
    {
      name: 'Giovanni',
      charge: 'Cientista de Dados',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Data Science',
      picture: 'https://http2.mlstatic.com/bernese-mountain-dog-filhotes-D_NQ_NP_972818-MLB27708880509_072018-O.webp'
    },
    {
      name: 'Érika',
      charge: 'Desenvolvedor',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Front-end',
      picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
    },
    {
      name: 'Giovanni',
      charge: 'Cientista de Dados',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Data Science',
      picture: 'https://http2.mlstatic.com/bernese-mountain-dog-filhotes-D_NQ_NP_972818-MLB27708880509_072018-O.webp'
    },
    {
      name: 'Érika',
      charge: 'Desenvolvedor',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Front-end',
      picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
    },
    {
      name: 'Giovanni',
      charge: 'Cientista de Dados',
      icon: 'fa fa-lightbulb-o',
      team: 'Chapter Data Science',
      picture: 'https://http2.mlstatic.com/bernese-mountain-dog-filhotes-D_NQ_NP_972818-MLB27708880509_072018-O.webp'
    },
    {
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

  constructor() { }

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

}
