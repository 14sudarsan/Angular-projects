import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { FormserviceService } from '../formservice.service';



@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit{


  formdata = {name:"", email:"",password:''};
  submit=false;

  errorMessage="";
  loading="false";

 
  constructor(private auth:AuthService , private sharename:FormserviceService , private route:Router)  {}

  

  ngOnInit(): void {
     

   


      }

      onSubmit(){


       

        this.auth.registeruser(this.formdata.name,this.formdata.email,this.formdata.password).subscribe({
          next:data=>{
            //store token

           
            console.log(data.idToken)

            this.route.navigate(['/login'])

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

