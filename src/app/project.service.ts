import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  noAuthHeader = {
    headers: new Headers({
      'NoAuth': 'True'
    })
  };
  result = {}
  // points = 0
  
  constructor(private http:HttpClient) { }
  public signupUser(data:any):Observable<any>{
    return this.http.post(' http://localhost:3000/signup',data);
  }
  
  public loginUser(data:any):Observable<any>{
    return this.http.post(' http://localhost:3000/login',data)
  }
  public listSurvey():Observable<any>{
    return this.http.get('  http://localhost:3000/get')
  }
  public getProfile():Observable<any>{
    return this.http.get('http://localhost:3000/profile')
  }
  public updatePoints(data:any):Observable<any>{
  
    return this.http.post('http://localhost:3000/points',data)
  }
  public redemPoints(data:any):Observable<any>{
    return this.http.post('http://localhost:3000/redem',data)
  }
 
  public updateAnswers(answer: any, id: any):Observable<any>{
    return this.http.put(`http://localhost:3000/answer/${id}`, answer);
  }
  public questions(survey:any):Observable<any>{
    return this.http.get(`http://localhost:3000/qget/${survey}`)
  }
 

  public storeAnswer(data:any):Observable<any>{
    return this.http.post('http://localhost:3000/ans',data)
  }
  
  setToken(token:string){
    localStorage.setItem('token',token);
  }
  getToken(){
    return localStorage.getItem('token')
  }
  deleteToken(){
    localStorage.removeItem('token')
  }
  getUserPayload(){
    var token=this.getToken()
    if(token){
      var userPayload=atob(token.split('.')[1])
      return JSON.parse(
        userPayload
      )
    }
    else
    return null;
  }
  isLoggedIn(){
    var userPayload=this.getUserPayload();
    if(userPayload)
    return userPayload.exp>Date.now()/1000
    else
    return false;
  }
 
}



