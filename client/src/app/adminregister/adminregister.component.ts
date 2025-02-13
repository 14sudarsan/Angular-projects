import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-adminregister',
  standalone: false,
  
  templateUrl: './adminregister.component.html',
  styleUrl: './adminregister.component.css'
})
export class AdminregisterComponent implements OnInit{

  adminData = {username:"", email:"",password:''};
  submit=false;

  errorMessage="";
  loading="false";

  constructor(private auth:AuthService , private route:Router){}

  ngOnInit(): void {
      
  }

  onSubmit(){


       

    this.auth.registeruseradmin(this.adminData.username,this.adminData.email,this.adminData.password).subscribe({
      next:data=>{
        //store token

      

        console.log(data.idToken)

        this.route.navigate(['/adminlogin'])

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
