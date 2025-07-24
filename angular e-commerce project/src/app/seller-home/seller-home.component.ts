import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import{faTrash, faEdit}from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productlist: undefined | product[];
  productmessage: undefined | string;
icon=faTrash;
editicon=faEdit;
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.list();
  }
  deleteproduct(id: number) {
    console.warn('test id', id);
    this.product.deleteproduct(id).subscribe((result) => {
      if (result) {
        this.productmessage = 'product is deleted';
        this.list();
      }
    });
    setTimeout(() => {
      this.productmessage = undefined;
    }, 3000);
  }
  list(){
    this.product.productlist().subscribe((result) => {
      console.warn(result);
      this.productlist = result;
    });
  }
}
