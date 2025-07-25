export interface SignUp{
    name: string,
    password:string,
    email:string
}
export interface login{
    email: String,
    password: String
}
export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined|number
}
export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number|undefined,
    quantity:undefined|number,
    userid:number,
    productid:number

}