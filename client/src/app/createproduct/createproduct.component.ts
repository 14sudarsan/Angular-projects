import { Component } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-createproduct',
  standalone: false,
  
  templateUrl: './createproduct.component.html',
  styleUrl: './createproduct.component.css'
})
export class CreateproductComponent {

  //email, name, price, description, ratings, images, category, seller, stock, numofReviews
  constructor(private api:ApiService){}


  productdetails={
    email:"", name:"",price:"", description:"", ratings:"", images:[{image:""}], category:"", seller:"", stock:"", numofReviews:""
  }


  creatingproducts(){
    this.api.createproducts(this.productdetails.email,this.productdetails.name,this.productdetails.price,this.productdetails.description,
      this.productdetails.ratings,  this.productdetails.images,this.productdetails.category,this.productdetails.seller,
    this.productdetails.stock,this.productdetails.numofReviews).subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert('Unable to place the order. Please try again later.');
      }
    });
  }



  
  








}
