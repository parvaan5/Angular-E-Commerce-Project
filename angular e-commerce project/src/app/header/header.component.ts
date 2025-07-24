import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellername: string = '';
  searchresult: undefined | product[];
  username: string = '';
  cartitems=0;
  constructor(private route: Router, private product: ProductService) {}
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      //console.warn(val.url)
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn('in seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerstore = localStorage.getItem('seller');
            let sellerdata = sellerstore && JSON.parse(sellerstore);
            this.sellername = sellerdata.name;
          }
        } else if (localStorage.getItem('user')) {
          let userstore = localStorage.getItem('user');
          let userdata = userstore && JSON.parse(userstore);
          this.username = userdata.name;
          this.menuType = 'user';
        } else {
          console.warn('outside seller');
          this.menuType = 'default';
        }
      }
    });
    let cartdata= localStorage.getItem('localcart');
    if(cartdata){
      this.cartitems=JSON.parse(cartdata).length
    }
    this.product.cartdata.subscribe((items)=>{
      this.cartitems=items.length
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userlogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }
  searchproduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      //console.warn(element.value);
      this.product.searchproducts(element.value).subscribe((result) => {
        //console.warn(result)
        if (result.length > 5) {
          result.length = 5;
        }

        this.searchresult = result;
      });
    }
  }
  hidesearch() {
    this.searchresult = undefined;
  }
  redirecttodetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
  submitsearch(val: string) {
    //console.warn('val',val);
    this.route.navigate([`search/${val}`]);
  }
}
