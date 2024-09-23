import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {
  @Input() product: Product | undefined;
  isEditing: boolean = false;

  form = new FormGroup({
    id: new FormControl(''),
    img: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    soldUnits: new FormControl(null, [Validators.required, Validators.min(0)]),
  });

  user: User = {} as User;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private utilService: UtilsService
  ) {}

  ngOnInit() {
    this.user = this.utilService.getFromLocalStorage('user');
    console.log('Usuario cargado:', this.user);

    if (this.product) {
      this.isEditing = true;
      this.form.setValue({
        id: this.product.id,
        img: this.product['img'], // Accediendo con notación de corchetes
        name: this.product['name'],
        price: this.product['price'],
        soldUnits: this.product['soldUnits'],
      });
    }
  }

  async takeImage() {
    const { dataUrl } = await this.utilService.takePicture('Imagen del Producto');
    this.form.controls.img.setValue(dataUrl);
  }

  async addProduct() {
    if (this.form.valid) {
      const productData = {
        id: this.form.controls.id.value,
        img: this.form.controls.img.value,
        name: this.form.controls.name.value,
        price: this.form.controls.price.value,
        soldUnits: this.form.controls.soldUnits.value,
      };

      try {
        const path = `products/${this.user.uid}/products`;
        const dataUrl = this.form.controls.img.value;
        const imagePath = `${this.user.uid}/${Date.now()}`;
        const imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
        productData.img = imageUrl;

        await this.firebaseService.addDocument(path, productData);

        this.utilService.dismissModal({ success: true });
        this.form.reset();
        console.log("Producto guardado exitosamente.");
      } catch (error) {
        console.error("Error al guardar el producto", error);
        alert("Error al guardar el producto: " + error.message);
      }
    } else {
      console.log('El formulario es inválido');
    }
  }

  async updateProduct(product?: Product) {
    console.log('Entrando al método updateProduct');

    if (product) {
      console.log('Producto a editar:', product); // Muestra el producto que se va a editar
    } else {
      console.log('No se encontró ningún producto para editar.'); // Indica que no hay producto
    }



    if (this.form.valid) {
      const productId = this.product?.id; // Asegúrate de que el producto esté definido
  
      if (!productId) {
        console.error("No se pudo encontrar el ID del producto a actualizar.");
        alert("No se pudo encontrar el ID del producto a actualizar.");
        return;
      }
  
      const productData = {
        id: productId, // Usa el ID del producto que se está editando
        img: this.product?.img, // Manteniendo la imagen actual
        name: this.form.controls.name.value,
        price: this.form.controls.price.value,
        soldUnits: this.form.controls.soldUnits.value,
      };
  
      try {
        const path = `products/${this.user.uid}/products/${productId}`;
        
        // Verifica si se ha cambiado la imagen
        if (this.form.value.img && this.form.value.img !== this.product?.img) {
          const dataUrl = this.form.controls.img.value;
          const imagePath = await this.firebaseService.getFilePath(this.product!.img);
          const imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
          productData.img = imageUrl; // Actualiza img solo si se cambia
        }
  
        await this.firebaseService.updateDocument(path, productData);
        this.utilService.dismissModal({ success: true });
        this.form.reset();
        console.log("Producto actualizado exitosamente.");
      } catch (error) {
        console.error("Error al actualizar el producto", error);
        alert("Error al actualizar el producto: " + error.message);
      }
    } else {
      console.log('El formulario es inválido');
    }
  }
 
 
 
 
 
 
 
 
 
 
 
}
