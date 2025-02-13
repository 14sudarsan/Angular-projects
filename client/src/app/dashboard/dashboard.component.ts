import { Component, OnInit } from '@angular/core';

import { FormserviceService } from '../formservice.service';

import { AuthService } from '../_services/auth.service';




import { ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

  standalone:false,      
})
export class DashboardComponent implements OnInit {

  searchQuery:string =''
  totalprice=0


  

  search(){

    
    this.api.singleproducts(this.searchQuery).subscribe((data)=>{
      this.products=data.products
    })
    

  }
  clearsearch(){
    this.api.singleproducts(this.searchQuery).subscribe((data)=>{ 
      this.products=data.products
    })

  }


  receivedname:string|null=null;
  products:any = [
   
  ];

  carts:any=[

  ]

 

  constructor(private sharename:FormserviceService ,  private cdr: ChangeDetectorRef , private auth:AuthService,private api:ApiService) {}

  ngOnInit(): void {

    this.auth.isAuthenticated()


    this.auth.getLoggedInUserEmail()

    this.api.getproducts().subscribe((data)=>{

      this.products=data.products




    })



    

    this.sharename.nameAdded$.subscribe((name)=>{
      this.receivedname = name
      this.cdr.detectChanges(); 
      console.log('name received by service form service',this.receivedname)
    })
  }

  addtocart(productId:string){

    const email = sessionStorage.getItem('userEmail')

    this.api.addtocart(email,productId,1).subscribe((data)=>{
      this.carts = data.carts
      this.totalprice = data.total
    })

    


  }



 

}