import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { map,tap } from 'rxjs/operators';
import { ProjectService } from './project.service';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth implements HttpInterceptor{
    constructor(private service:ProjectService,private router:Router ){}
    intercept(req:HttpRequest<any>, next:HttpHandler) {
       
        
            const clonedreq = req.clone({
                headers:req.headers.set("Authorization","Bearer "+this.service.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        if(err.error.auth==false) {
                            this.router.navigateByUrl('/login')
                            
                            }
                    })
                );
            }
        
    }

            
            
    
