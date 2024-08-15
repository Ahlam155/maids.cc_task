import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../models/users';
import { selectAllUsers, selectLoading, selectTotalPerPage, selectTotalUsers } from '../../../store/users.selector';
import { LoadOneUser, loadUsers, loadUsersList } from '../../../store/users.action';
import { UserState } from '../../../store/users.state';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],  
  
  animations: [
    trigger('currentAnimation', [
      state('slideInLeft', style({ transform: 'translateX(0)', opacity: 1 })),
      state('slideInRight', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('* => slideInLeft', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('0.5s ease-out')
      ]),
      transition('* => slideInRight', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('0.5s ease-out')
      ]),
    ]),
  ]
})
export class UsersListComponent implements OnInit {
  users$!: Observable<User[]>;
  loading$!: Observable<boolean>;
  currentPage$!: Observable<number>;
  totalUsers$!: Observable<number>;
  totalUsersPerPage$!:Observable<number>

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  currentAnimation = 'slideInRight'; 
  currentPage = 0;
  constructor(private store: Store<UserState>) {}

  ngOnInit() {
    this.loadUsers(1); // Initial load of users
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectLoading);
    this.totalUsers$ = this.store.select(selectTotalUsers);
    this.totalUsersPerPage$ = this.store.select(selectTotalPerPage);

  }

 
  loadUsers(page: number) {
    this.store.dispatch(loadUsers({ page }));
  }

  onPageChange(event: any) {
    this.loadUsers(event.pageIndex + 1); // Handling paginator changes
    if (event.pageIndex > this.currentPage) {
      this.currentAnimation = 'slideInRight'; // Slide in from right to left
    } else if (event.pageIndex < this.currentPage) {
      this.currentAnimation = 'slideInLeft'; // Slide in from left to right
    }
    this.currentPage = event.pageIndex;
  }

  onSelectUser(userId: number) {
  }
}
