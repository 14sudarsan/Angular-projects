import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

import { FormserviceService } from '../formservice.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  constructor(public auth:AuthService,private sharename:FormserviceService ){}

  receivedname:string|null=null;

  ngOnInit(): void {


    this.sharename.nameAdded$.subscribe((name)=>{
      this.receivedname = name
      
      console.log('name received by service form service',this.receivedname)
    })
      
  }

  logout(){
    this.auth.logout()
  }

  adminlogout(){
    this.auth.adminlogut()
    
  }

}
