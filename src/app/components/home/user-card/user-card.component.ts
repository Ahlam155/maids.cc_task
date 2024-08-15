import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/users';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input()
  userData: User ={
    first_name:'',
    last_name:'',
    id:0,
    avatar:'',
    email:''
  };
  constructor(private router:Router) { }

  ngOnInit() {
  }
  navigateToUserDetails(id:number){
    this.router.navigateByUrl(`user/${id}`)
  }

}
