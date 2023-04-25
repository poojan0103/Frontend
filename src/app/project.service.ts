import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  

  result = {}
 
  baseUrl = 'https://survey-app-mxek.onrender.com' 
  constructor(private http:HttpClient) { }
  public signupUser(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/signup`,data);
  }
  
  public loginUser(data:any):Observable<any>{
    return this.http.post(` ${this.baseUrl}/login`,data )
  }
  public listSurvey():Observable<any>{
    return this.http.get(`${this.baseUrl}/survey`)
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
    return this.http.get(`${this.baseUrl}/question/${survey}`)
  }
  public isSurveyTaken(user:any,survey:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/survey/${user}/${survey}`)
  }
  public storeAnswer(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/answer`,data)
  }
  public surveyUser(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/add`,data)
  }
  public SurveyUserId(user:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/get/${user}`)
  }
  public User(user:any):Observable<any>{
    return this.http.get(` ${this.baseUrl}/survey/${user}`)
  }
  public addtouser(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/update`,data)
  }
  public find(_id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/get/${_id}`)
  }
 
  setToken(token:string){
    const expirestime = new Date(Date.now()+2*60*60*1000).toUTCString();
    // localStorage.setItem('token',token);
    document.cookie = `token=${token}; path=/;expries=${expirestime};secure`;
    
  }
  getToken(){
    // return localStorage.getItem('token')
    const name = 'token=';

    const cookieArr = document.cookie.split(';');
    
    
    for (let i = 0; i < cookieArr.length; i++) {
    
      let cookie = cookieArr[i];
      
      
      while (cookie.charAt(0) == ' ') {
      
        cookie = cookie.substring(1);
       
        
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }
 
  deleteToken(){
    document.cookie = "token=; expires=thu,  20 Apr 2023 10:26:00 UTC; path=/;";
    //localStorage.removeItem('token')
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



