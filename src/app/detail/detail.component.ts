import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id: number;
  experienceChips = [
    'UX', 'HTML5', 'CSS', 'Web Design', 'PHP', 'Java', 'AngularJS', 'jQuery', 'Kotlin',
    'Swift', 'JEE', 'Angular', 'React Native', 'Spring Cloud'
  ];

  contactList = [
    {
      icon: 'phone',
      text: '(61) 5555-5555'
    },
    {
      icon: 'mobile',
      text: '(61) 5555-5555'
    },
    {
      icon: 'building',
      text: '(61) 5555-5555'
    },
    {
      icon: 'envelope-o',
      text: 'brendan@gmail.com'
    },
    {
      icon: 'facebook',
      text: 'facebook.com/brendan'
    },
    {
      icon: 'linkedin',
      text: 'linkedin/brendan'
    }
  ];

  experienceList = [1, 2];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.queryParams['_value'].id;
  }

}
