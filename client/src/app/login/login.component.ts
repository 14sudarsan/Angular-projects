import { Component } from '@angular/core';

import { AuthService } from '../_services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formdata = {name:"",email:"",password:''};

  submit=false;

  errorMessage=""

 
  

  constructor(private auth:AuthService ,private route:Router)  {}
  
    
  
    ngOnInit(): void {
       
  
     
  
  
        }

        onSubmit(){

        

          this.auth.loginuser(this.formdata.email,this.formdata.password).subscribe({
            next:data=>{
              //store token
  
              this.auth.storetoken(data.email)
  
              console.log(data.email)

              this.route.navigate(['/dashboard'])

              sessionStorage.setItem('userEmail',data.email);
              sessionStorage.setItem('usertoken',data.token)


            },


            error:data=>{
              if(data.error.error.message=='INVALID_EMAIL'){
                this.errorMessage="INVALID EMAIL!!!!"
              } else if(data.error.error.message=="EMAIL_EXISTS"){
  
                this.errorMessage="Already email exists"
  
              }
            }
          })

         


       

          
  
        
        }

       
        

       


  
  


}
