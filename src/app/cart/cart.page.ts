import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: Product[] = [];
  totalAmount: number = 0;

  constructor(private utilService: UtilsService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
    this.calculateTotal();
  }

  loadCart() {
    this.cart = this.utilService.getFromLocalStorage('cart') || [];
  }

  calculateTotal() {
    this.totalAmount = this.cart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  clearCart() {
    this.utilService.saveInLocalStorage('cart', []); // Vaciar el carrito en localStorage
    this.loadCart(); // Recargar el carrito
    this.calculateTotal(); // Recalcular el total
  }

  goBack() {
    this.router.navigate(['main/home']); // Cambia esta ruta según sea necesario
  }
}
