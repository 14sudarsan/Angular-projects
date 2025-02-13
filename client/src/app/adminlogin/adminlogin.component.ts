import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-adminlogin',
  standalone: false,
  
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent implements OnInit {

  adminData = {name:"",email:"",password:''};

  submit=false;

  errorMessage=""

  constructor(private auth:AuthService,private route:Router){}

  ngOnInit(): void {
      
  }

  OnSubmit(){


    this.auth.loginuseradmin(this.adminData.name,this.adminData.email,this.adminData.password).subscribe({
      next:data=>{
        //store token

        console.log(data.email)

     
        sessionStorage.setItem('adminEmail',data.email);
        sessionStorage.setItem('admintoken',data.token)

        this.route.navigate(['/createproduct'])


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
