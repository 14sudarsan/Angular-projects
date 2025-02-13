import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-adminvieworders',
  standalone: false,
  
  templateUrl: './adminvieworders.component.html',
  styleUrl: './adminvieworders.component.css'
})
export class AdminviewordersComponent implements OnInit{

  constructor(private api:ApiService){}


  orderedProducts:any[]=[]




  ngOnInit(): void {

    this.adminvieworders()
      
  }


  adminvieworders(){

    const email = sessionStorage.getItem('adminEmail')
    this.api.fetchAdminOrders(email).subscribe(
      (response) => {
        if (response.success) {
          this.orderedProducts = response.orderedProducts;
        } else {
          console.error('No orders found');
        }
      },
      (error) => {
        console.error('Error fetching admin orders:', error);
      }
    );
  }
  

}
