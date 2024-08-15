import { User } from "../models/users";

export interface UserState {
    users: User[];
    selectedUser: User | null;
    searchedUser:User | null
    loading: boolean;
    error: any;
    isUserExist:boolean;
    totalUsers: number;
    totalPerPage: number;
  }
  
  export const initialState: UserState = {
    users: [],
    selectedUser: null,
    searchedUser:null,
    loading: false,
    error: null,
    isUserExist:false,
    totalUsers: 0,
    totalPerPage: 0,
  };
  