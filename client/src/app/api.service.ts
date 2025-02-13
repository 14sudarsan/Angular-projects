import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient ) { }


    getproducts():Observable<any>{

    return this.http.get('http://localhost:8000/api/v1/products')



  }

  singleproducts(searchtext:string):Observable<any>{
    return this.http.get("http://localhost:8000/api/v1/products/",{
      params:{
        keyword:searchtext
      }
    })
  }

  addtocart(email: string | null = null,productId:string,quantity:number):Observable<any>{

    const body = {
      email,
      productId,
      quantity
    };

    return this.http.post('http://localhost:8000/api/v1/cart/add-to-cart',body)

  }


  private getcarturl = "http://localhost:8000/api/v1/cart/view-cart"

  getcartitems(email: string | null = null):Observable<any>{

    

    return this.http.get(`${this.getcarturl}/${email}`)



  }
  removeItemFromCart(email: string | null=null, productId: string): Observable<any> {
    return this.http.delete<any>('http://localhost:8000/api/v1/cart/remove-item', {
      body: { email, productId },
    });
  }


  private orderurl = "http://localhost:8000/api/v1/orders"

  address = ""

  placeOrder(email: string | null = null, cartItems: any[],address:string|null = null,phonenumber:string|null=null): Observable<any> {
    const payload = {
      email: email,
      cartItems: cartItems,
      address:address,
      phonenumber:phonenumber
    };
  
    console.log(payload); // For debugging purposes
    return this.http.post(this.orderurl, payload);
  }

  private getorderurl = "http://localhost:8000/api/v1/orders/getuserorders"

  getUserOrders(email: string |null=null): Observable<any> {
   
    return this.http.get(`${this.getorderurl}/${email}`);
  
  }

  //email, name, price, description, ratings, images, category, seller, stock, numofReviews


  createproducts(email: string, name: string, price: string, description: string, ratings: string, images: { image: string }[], category: string, seller: string, stock: string, numofReviews: string) {
    // API call logic

    
    const body={
      email,
      name,
      price, description, ratings, images, category, seller, stock, numofReviews

    }

    return this.http.post("http://localhost:8000/api/v1/products/createproducts",body)

  }


  private getadminproducts = "http://localhost:8000/api/v1/products/getproductsadmin"

  getadminproduct(email: string |null=null): Observable<any> {
   
    return this.http.get(`${this.getadminproducts}/${email}`);
  
  }

  private adminvieworders="http://localhost:8000/api/v1/products/orderedproducts"

  fetchAdminOrders(email: string|null=null): Observable<any> {
    return this.http.post(this.adminvieworders, { email });
  }

}


  
  
  
  

 
  

  
  
  

