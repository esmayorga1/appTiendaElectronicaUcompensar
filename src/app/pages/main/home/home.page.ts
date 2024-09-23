import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[] = [];
  user: User = {} as User;

  constructor(
    private firebaseService: FirebaseService,
    private utilService: UtilsService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.user = this.utilService.getFromLocalStorage('user');
    this.loadProducts();
  }

  ionWillEnter() {
    this.loadProducts();
  }

  signOut() {
    this.firebaseService.logout();
  }

  addUpdateProduct(product?: Product) {
    this.utilService.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'app-update-modal',
      componentProps: { product },
    }).then(() => this.loadProducts());
  }

  loadProducts() {
    const path = `products/${this.user.uid}/products`;
    this.firebaseService.getCollectionData(path).subscribe({
      next: (res: Product[]) => {
        this.products = res.map(product => ({ ...product, selectedQuantity: 0 }));
      },
      error: err => console.error('Error al obtener productos', err),
    });
  }

  async deleteProduct(productId: string) {
    const path = `products/${this.user.uid}/products/${productId}`;
    try {
      await this.firebaseService.deleteDocument(path);
      this.loadProducts();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }

  addToCart(product: Product) {
    if (product.selectedQuantity > 0) {
      const productInCart = { ...product, quantity: product.selectedQuantity };
      const storedCart = this.utilService.getFromLocalStorage('cart') || [];
      storedCart.push(productInCart);
      this.utilService.saveInLocalStorage('cart', storedCart);
      this.presentAlert(`${product.name} agregado al carrito`, `Cantidad: ${product.selectedQuantity}`);
      product.selectedQuantity = 0;
    } else {
      this.presentAlert('Atención', 'Debes seleccionar al menos una unidad del producto.');
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  incrementQuantity(product: Product) {
    product.selectedQuantity = (product.selectedQuantity || 0) + 1;
  }

  decrementQuantity(product: Product) {
    if (product.selectedQuantity > 0) {
      product.selectedQuantity--;
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
