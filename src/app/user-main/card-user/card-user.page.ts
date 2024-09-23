import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: Product[] = [];

  constructor(private utilService: UtilsService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const storedCart = this.utilService.getFromLocalStorage('cart');
    this.cart = storedCart ? storedCart : [];
  }

  // Método para vaciar el carrito
  clearCart() {
    this.cart = [];
    this.utilService.saveInLocalStorage('cart', this.cart);
  }

  // Otros métodos para gestionar el carrito...
}
