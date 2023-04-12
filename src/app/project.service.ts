import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  

  result = {}
 
  baseUrl = 'http://localhost:3000'
  constructor(private http:HttpClient) { }
  public signupUser(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/signup`,data);
  }
  
  public loginUser(data:any):Observable<any>{
    return this.http.post(` ${this.baseUrl}/login`,data)
  }
  public listSurvey():Observable<any>{
    return this.http.get(`${this.baseUrl}/getsurvey`)
  }
  public getProfile():Observable<any>{
    return this.http.get(`${this.baseUrl}/profile`)
  }
  public updatePoints(data:any):Observable<any>{
  
    return this.http.post(`${this.baseUrl}/points`,data)
  }
  public redemPoints(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/redem`,data)
  }
  public updateAnswers(answer: any, id: any):Observable<any>{
    
    return this.http.put(`${this.baseUrl}/answer/${id}`, answer);
  }
  public questions(survey:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/questionget/${survey}`)
  }
 

  public storeAnswer(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/answer`,data)
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



