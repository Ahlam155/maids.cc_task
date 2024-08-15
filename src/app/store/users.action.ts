import { createAction, props } from "@ngrx/store";
import { User } from "../models/users";

export const loadUsersList = createAction("Load Users List");

export const LoadOneUser = createAction ("Load One User" , props<{userId:number}>())


export const loadUsers = createAction(
    '[User List] Load Users',
    props<{ page: number }>() // Action for loading users with pagination
  );
  
  export const loadUsersSuccess = createAction(
    '[User List] Load Users Success',
    props<{ users: User[], total: number , totalPerPage:number}>() // Success action with users and total count
  );
  
  export const loadUsersFailure = createAction(
    '[User List] Load Users Failure',
    props<{ error: any }>()
  );
  
  export const loadUserDetails = createAction(
    '[User] load user details' , 
    props<{userId:number}>()
  )

  export const loadUserDetailsSuccess = createAction(
    '[User] load user details success',
    props<{user:User}>()
  )

  export const loadUserDetailsFailure = createAction(
    '[User] load user details failure',
    props<{error:any}>()
  )
  export const searchForUserById = createAction(
    '[Search] search for user',
    props<{userId:number}>()
  );
  export const searchForUserSuccess = createAction(
    '[Search] search for user success',
    props<{user:User}>()

  )
  export const searchForUserFailure = createAction(
    '[Search] search for user Failure',
    props<{ error: any }>()
  )
 