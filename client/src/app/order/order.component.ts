import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-order',
  standalone: false,
  
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{

  
  orders: any[] = [];

  amount=0

  myemail = "";  // Declaring an empty string in JavaScript


  

   


  
  constructor(private api:ApiService){}


  getorderedproducts() {
    const email = sessionStorage.getItem("userEmail");
    this.api.getUserOrders(email).subscribe((response) => {
      this.orders = response.orders; // All orders (array of orders)
      console.log(this.orders, "frontend orders");
    });
  }
  

  ngOnInit(): void {


    this.getorderedproducts()

    

 

  
      
  }
  
  

  

}
