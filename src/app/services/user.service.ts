import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  public store(data:any) :Observable<any>{
    return this.http.post<any[]>('http://localhost:3000/user',data);
  }

  public getall() :Observable<any>{
    return this.http.get<any[]>('http://localhost:3000/user');
  }

  public update(id:any,data:any):Observable<any>{
    return this.http.put<any[]>('http://localhost:3000/user/'+id,data);
  }

  public delete(id:any):Observable<any>{
    return this.http.delete<any[]>('http://localhost:3000/user/'+id);
  }
}
