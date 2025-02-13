import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  isPopupVisible = false;

  openPopup() {
  this.isPopupVisible = true;
  }

  closePopup() {
  this.isPopupVisible = false;
  }


  
  
  cartItems: any[] = [];

  totalprice = 0


  constructor(private api:ApiService){}


  getcartproductsusers(){

    const email = sessionStorage.getItem("userEmail")
    this.api.getcartitems(email).subscribe((response)=>{

      this.cartItems = response.cart

      this.totalprice=response.total


      console.log(this.cartItems)

    },(error)=>{
      console.error("fetching cart item error")
    })
  }

  removeproductfromcart(productId:string){

    const email = sessionStorage.getItem("userEmail")
    this.api.removeItemFromCart(email,productId).subscribe(
      (response) => {
        console.log("Product removed successfully:", response);
        alert("Product removed from cart!");
        // Optionally refresh the cart or update UI
        this.getcartproductsusers(); // Call a method to reload cart data
      },
      (error) => {
        console.error("Error removing product:", error);
        alert("Failed to remove product from cart.");
      }
    );

  }

  userAddress: string = ''; 
  phonenumber:string="";

  placeOrder(address:string,phonenumber:string): void {


    const email = sessionStorage.getItem("userEmail")
    this.api.placeOrder(email,this.cartItems,address,phonenumber).subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert('Unable to place the order. Please try again later.');
      }
    });

    this.closePopup()

    alert("Order Placed Successfully")
  }
  


  ngOnInit(): void {

    this.getcartproductsusers()
      
  }





  



}
