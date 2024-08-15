// src/app/store/user.effects.ts
import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/users';
import { loadUsersSuccess, loadUsersFailure, loadUsersList, loadUsers, loadUserDetails, loadUserDetailsSuccess, loadUserDetailsFailure, searchForUserById, searchForUserSuccess, searchForUserFailure } from './users.action';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UsersService) {}
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(action =>
        this.userService.getAllUsers(action.page).pipe(
          shareReplay(),
          map(response => loadUsersSuccess({ users: response.data, total: response.total ,totalPerPage:response.per_page})),
          catchError(error => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  loadUserDetails$ = createEffect(()=>
    this.actions$.pipe(
      ofType(loadUserDetails),
      mergeMap((action)=> this.userService.getUserById(action.userId).pipe(
        shareReplay(),
        map((user)=>loadUserDetailsSuccess({user:user.data})),
        catchError((error)=>of(loadUserDetailsFailure({error})))
      ))
    )
  )
  searchUsers$ = createEffect(()=>
    this.actions$.pipe(
      ofType(searchForUserById),
      mergeMap((action)=>this.userService.getUserById(action.userId).pipe(
        shareReplay(),
        map((user)=>searchForUserSuccess({user:user.data})),
        catchError((error)=>of(searchForUserFailure({error})))
      ))
    )

  )

}
