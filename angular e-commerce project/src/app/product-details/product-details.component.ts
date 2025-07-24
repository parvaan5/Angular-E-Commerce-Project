import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { cart } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productdata:undefined|product;
  productquantity:number=1;
  removecart=false;
constructor(private activateroute:ActivatedRoute,private product:ProductService){}
ngOnInit(): void {
  let productid=this.activateroute.snapshot.paramMap.get('productid');
  console.warn(productid);
productid && this.product.getproduct(productid).subscribe((result)=>{
  console.warn(result)
  this.productdata=result;

  let cartdata=localStorage.getItem('localcart');
  if(productid && cartdata){
    let items=JSON.parse(cartdata);
    items =items.filter((item:product)=>productid== item.id.toString())
    if(items.length){
      this.removecart=true
    }else{
      this.removecart=false
    }
  }
})
}
handlequantity(val:string){
  if(this.productquantity<20 && val==='plus'){
    //this.productquantity=this.productquantity+1
     this.productquantity+=1
  }else if(this.productquantity>1 && val==='min'){
    this.productquantity-=1
  }
}
addtocart(){
  if(this.productdata){
    this.productdata.quantity=this.productquantity;
    if(!localStorage.getItem('user')){
    //console.warn(this.productdata);
    this.product.localaddtocart(this.productdata)
    this.removecart=true
  }else{
    //console.warn("user is logged in")
    let user=localStorage.getItem('user');
    let userid= user &&JSON.parse(user).id
    //console.warn(userid);
    let cartdata:cart={
      ...this.productdata,
      userid,
      productid:this.productdata.id,
    }
    delete cartdata.id;
    //console.warn(cartdata);
    this.product.addtocart(cartdata).subscribe((result)=>{
      if(result){
       alert('product is added')
      }

    })
  }
}
}
removetocart(productid:number){
this.product.removeitemfromcart(productid)
this.removecart=false
}
}
