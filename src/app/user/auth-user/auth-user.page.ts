import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.page.html',
  styleUrls: ['./auth-user.page.scss'],
})
export class AuthUserPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });






constructor(private authService: FirebaseService, private router: Router, private utilService: UtilsService ) { }

ngOnInit() {}

async login() {
  if (this.form.valid) {
    const user: User = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    };

    try {
      await this.authService.loginWithEmail(user);
      console.log("Inicio de sesión exitoso");
      this.getUserInfo(user.uid)


      this.router.navigate(['/main-user/main']); // Redirige al panel de administrador
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión: " + error.message);
    }
  } else {
    console.log('El formulario es inválido');
    // Aquí puedes manejar la UI para mostrar qué campos son inválidos
  }
}


async getUserInfo(uuid: string) { 
  if (this.form.valid) {
    const user: User = {
      uid: uuid, // Usa el uid proporcionado
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
      
    };
  
    let path = `user/${uuid}`;
  
  
    try {
      // Guarda la información del usuario en la base de datos
      await this.authService.getDocument(path);
  
      // Guarda en Local Storage
      this.utilService.saveInLocalStorage('user', user);
  
      console.log("Información del usuario guardada exitosamente.");
    } catch (error) {
      console.error("Error al guardar información del usuario", error);
      alert("Error al guardar información del usuario: " + error.message);
    }
  } else {
    console.log('El formulario es inválido');   
  }
}  






 

 
 

}
