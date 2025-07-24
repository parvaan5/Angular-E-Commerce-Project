import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit{

showlogin=false;
authError:string='';
constructor(private seller: SellerService, private router: Router) { }
  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signup(data:SignUp): void {
   console.warn(data);
    this.seller.userSignUp(data)
  }
  login(data:SignUp): void {
    this.authError="";
    //console.warn(data);
    this.seller.userlogin(data);
    this.seller.isLoginError.subscribe((iserror)=>{
     if(iserror){
this.authError="Email or password is not correct";
     } 
    })
  }
  openlogin(){
this.showlogin=true
  }
  opensignup(){
    this.showlogin=false
  }
}
