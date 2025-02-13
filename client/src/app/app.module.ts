import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule ,Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { AdminviewordersComponent } from './adminvieworders/adminvieworders.component';


const firebaseConfig = {
  apiKey: "AIzaSyCt9oHSudds0mZKkXaJtMFYuzgYBirPQTE",
  authDomain: "login-4eaf5.firebaseapp.com",
  projectId: "login-4eaf5",
  storageBucket: "login-4eaf5.firebasestorage.app",
  messagingSenderId: "340202009906",
  appId: "1:340202009906:web:bd6eb5e1745c74ad0c132b",
  measurementId: "G-4LWH3JMMRP"
};

// Initialize Firebase



const routes:Routes = [
  {path:"",component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:"dashboard" , component:DashboardComponent},
  {path:"cart",component:CartComponent},
  {path:"order",component:OrderComponent},
  {path:"adminregister",component:AdminregisterComponent},
  {path:"adminlogin",component:AdminloginComponent},
  {path:"createproduct",component:CreateproductComponent},
  {path:"productdetails",component:ProductdetailComponent},
  {path:"adminvieworders",component:AdminviewordersComponent}
  


]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    CartComponent,
    OrderComponent,
    AdminregisterComponent,
    AdminloginComponent,
    CreateproductComponent,
    ProductdetailComponent,
    AdminviewordersComponent,
    
    
    
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
    // Add Firebase Analytics
    
  ],
  providers: [ provideHttpClient()  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
