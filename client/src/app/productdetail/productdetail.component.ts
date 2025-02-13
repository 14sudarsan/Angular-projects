import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-productdetail',
  standalone: false,
  
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductdetailComponent implements OnInit{

  constructor(private api:ApiService){}

  createdproducts :any[]=[]






  ngOnInit(): void {

    this.Adminproducts()


  }

  Adminproducts(){
    const email = sessionStorage.getItem("adminEmail");

    this.api.getadminproduct(email).subscribe((response) => {
      this.createdproducts = response.products; // All orders (array of orders)
      console.log(this.createdproducts, "frontend orders");
    });
  }





}
