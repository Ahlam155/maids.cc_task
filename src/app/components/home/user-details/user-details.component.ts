import { Component, Input, input, OnInit } from '@angular/core';
import { User } from '../../../models/users';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/users.state';
import { loadUserDetails } from '../../../store/users.action';
import { selectUserDetails } from '../../../store/users.selector';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ transform: 'scale(0.5)', opacity: 0 })),
      transition(':enter', [
        animate('0.7s 0.1s cubic-bezier(.25,.8,.25,1)')
      ]),
    ]),
  ],
})
export class UserDetailsComponent implements OnInit {
 userDetails$!: Observable<User | null>;
 userId:any=0;
 userData!: User;
  constructor(private router:Router ,
      private store:Store<UserState>,
      private route:ActivatedRoute


  ) { 

  }

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.userId = parseInt(param.get('id')!);
      this.store.dispatch(loadUserDetails({ userId: this.userId }));
    });
  
    this.userDetails$ = this.store.select(selectUserDetails)
    this.userDetails$.subscribe((data) => this.userData = data!);
  }
  contact(){

  }
  backToList(){
    this.router.navigateByUrl("/")
  }
}
