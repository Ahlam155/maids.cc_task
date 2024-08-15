import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../models/users';
import { debounceTime, Observable, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/users.state';
import { loadUserDetails, loadUsers, searchForUserById } from '../../store/users.action';
import { selectIsUserExist, selectSearchedUser, selectUserDetails } from '../../store/users.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchControl = new FormControl();
  user$!: Observable<User |null>;
  isTyping:boolean=false;
  userNotFound$!: Observable<boolean>;
  constructor(private store:Store<UserState>,
              private router:Router
  ) { 
    
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap((value: string) => {
        this.isTyping= value?true:false;
        const userId = parseInt(value, 10);
        if (!isNaN(userId)) {
          this.store.dispatch(searchForUserById({ userId }));
          this.userNotFound$ = this.store.select(selectIsUserExist)
        }
        return this.store.select(selectSearchedUser);
      })
    ).subscribe(user => this.user$ = of(user));
    
  }
  navigateToUserDetails(id:any){
    this.isTyping=false;
    this.router.navigateByUrl(`user/${id}`);

  }
}
