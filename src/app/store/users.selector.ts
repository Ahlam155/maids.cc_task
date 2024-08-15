import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './users.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state?.users || []  // Provide a fallback to an empty array
);

export const selectUserDetails = createSelector(
  selectUserState,
  (state: UserState) => state?.selectedUser || null // Provide a fallback to null
);

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state?.loading || false // Fallback to false if undefined
);

export const selectTotalPerPage = createSelector(
  selectUserState,
  (state: UserState) => state?.totalPerPage // Fallback to page 1
);

export const selectTotalUsers = createSelector(
  selectUserState,
  (state: UserState) => state?.totalUsers || 0 // Fallback to 0 total users
);
export const selectSearchedUser = createSelector(
  selectUserState,
  (state:UserState) => state?.searchedUser || null
 
);

export const selectIsUserExist= createSelector(
  selectUserState,
  (state:UserState) => state?.isUserExist 
 
);
