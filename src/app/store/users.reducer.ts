// src/app/store/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { User } from '../models/users';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadUserDetails, loadUserDetailsSuccess, loadUserDetailsFailure, searchForUserById, searchForUserSuccess, searchForUserFailure } from './users.action';
import { initialState } from './users.state';


  export const userReducer = createReducer(
    initialState,
    on(loadUsers, (state, { page }) => ({
      ...state,
      loading: true,
      currentPage: page,
    })),
    on(loadUsersSuccess, (state, { users, total , totalPerPage }) => ({
      ...state,
      users,
      totalUsers: total,
      loading: false,
      totalPerPage
    })),
    on(loadUsersFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
  on(loadUserDetails,
    (state,{userId})=>(
      {
        ...state,
        selectedUser: null, 
        loading:true
      }
    )
  ),
  on(loadUserDetailsSuccess , 
    (state , {user})=>(
      {
        ...state,
        selectedUser:user,
        loading:false,
      }
    )
  ),
  on(loadUserDetailsFailure , 
    (state , {error})=>(
      {
        ...state,
        loading:false,
        error
      }
    )
  ),
  on(searchForUserById,
    (state,{userId})=>(
      {
        ...state,
        searchedUser:null,

      }
    )
  ),
  on(searchForUserSuccess , 
    (state , {user})=>(
      {
        ...state,
        searchedUser:user,
      }
    )
  ),
  on(searchForUserFailure , 
    (state)=>(
      {
        ...state,
        searchedUser:null,
        isUserExist:true

      }
    )
  )  );
