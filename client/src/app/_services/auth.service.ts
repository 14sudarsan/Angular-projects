import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormserviceService } from '../formservice.service';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
       

 
  constructor(private router:Router , private http:HttpClient , private sharename:FormserviceService) {  }

  private nameSubject= new BehaviorSubject <String[]>([])

  Name$ = this.nameSubject.asObservable()

  isAuthenticated():boolean{

    if(sessionStorage.getItem('token')==null){

        return false
    }
    return true
  }
  adminAuthenticated():boolean{

    if(sessionStorage.getItem('admintoken')==null){

      return false
  }
  return true

  }

  UserName(UserName:string){

    const username = this.nameSubject.getValue()

    this.nameSubject.next(username)

    console.log("service activated")
  }

  registeruser(name:string,email:string,password:string){
    return this.http.post<{idToken:string}>('http://localhost:8000/api/auth/register',{

      username:name,
      
      email:email,
      password:password
    })
  }
  loginuser(email:string,password:string){



    return this.http.post<{email:string,token:string}>("http://localhost:8000/api/auth/login",{


     

      

      email:email,
      password:password
      
    })

  }

  registeruseradmin(name:string,email:string,password:string){
    return this.http.post<{idToken:string}>('http://localhost:8000/api/adminauth/registeradmin',{

      username:name,
      
      email:email,
      password:password
    })

  }

  loginuseradmin(name:string,email:string,password:string){

    return this.http.post<{email:string,token:string}>('http://localhost:8000/api/adminauth/loginadmin',{

      username:name,
      
      email:email,
      password:password
    })


  }
  

  // Retrieve the logged-in user's email
  getLoggedInUserEmail(): string {
    return localStorage.getItem('userEmail') || ''; // Return empty string if not found
  }

  // Clear the logged-in user's email (e.g., on logout)


  
  

  logout(){
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('usertoken')
    sessionStorage.removeItem('token')

    this.router.navigate(['login'])
  }

  adminlogut(){
    
    sessionStorage.removeItem('adminEmail')
    sessionStorage.removeItem('admintoken')

    this.router.navigate(['login'])


  }

  storetoken(token:string){

    sessionStorage.setItem('token',token);

  }
  canAccess(){
    if(!this.isAuthenticated()){

      this.router.navigate(['/login'])

    }
  }
 
  
  
}


  
