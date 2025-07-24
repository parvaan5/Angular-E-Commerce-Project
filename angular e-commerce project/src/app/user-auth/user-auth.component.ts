import { Component, OnInit } from '@angular/core';
import { SignUp, login, product, cart } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showlogin: boolean = true;
  autherror: string = '';

  constructor(private user: UserService, private productService: ProductService) {}

  ngOnInit(): void {
    this.user.userauthreload();
  }

  signup(data: SignUp) {
    this.user.usersignup(data);
  }

  login(data: login) {
    this.user.userlogin(data);
    this.user.invaliduserauth.subscribe((result) => {
      console.warn('apple', result);
      if (result) {
        this.autherror = 'Please enter valid user details';
      } else {
        this.localcarttoremotecart();
      }
    });
  }

  openlogin() {
    this.showlogin = true;
  }

  opensignup() {
    this.showlogin = false;
  }

  localcarttoremotecart() {
    let data = localStorage.getItem('localcart');

    if (data) {
      let cartdatalist: product[] = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userid = user ? JSON.parse(user).id : null;

      cartdatalist.forEach((product: product, index) => {
        let cartdata: cart = {
          ...product,
          productid: product.id,
          userid,
        };
        delete cartdata.id;
        setTimeout(() => {
          this.productService.addtocart(cartdata).subscribe((result) => {
            if (result) {
              console.warn('Item stored in DB');
            }
          });
          if (cartdatalist.length === index + 1) {
            localStorage.removeItem('localcart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      let user = localStorage.getItem('user');
      let userid = user ? JSON.parse(user).id : null;
      if (userid) {
        this.productService.getcartlist(userid);
      }
    }, 2000);
  }
}
