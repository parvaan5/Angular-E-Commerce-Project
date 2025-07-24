import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularproducts:undefined|product[]
  trendyproducts:undefined|product[]
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.product.popularproducts().subscribe((data) => {
      console.warn(data);
      this.popularproducts=data;
    });
    this.product.trendyproducts().subscribe((data)=>{
      this.trendyproducts=data
    });
  }
}
