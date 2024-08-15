import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
apiUrl:string="https://reqres.in/api/users"
constructor(private http:HttpClient) {
 
 }
 getAllUsers(pageNum: number): Observable<Users> {
  return this.http.get<Users>(`${this.apiUrl}?page=${pageNum}`)
}

 getUserById(id:number):Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/${id}`)
 }
}
