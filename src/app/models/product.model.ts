export interface Product{
    id: string,
    img: string,
    name: string ,
    price: number,
    soldUnits:number ,   
    inCart?: boolean,
    quantity?: number,
    selectedQuantity?: number,
   
   
   
}