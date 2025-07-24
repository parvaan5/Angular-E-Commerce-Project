import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements DoCheck {
  searchresult:undefined|product[];
constructor(private activeRoute:ActivatedRoute, private product:ProductService){}

ngDoCheck():void{
  let query=this.activeRoute.snapshot.paramMap.get('query');
  console.log(query)
  query && this.product.searchproducts(query).subscribe((result)=>{
this.searchresult=result
  })
}


}
