import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private authService: FirebaseService, private router: Router, private utilService: UtilsService) { }



  ngOnInit() {
  }


  async register() { 
    if (this.form.valid) {
      const user: User = {
        uid: '', 
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        name: this.form.controls.name.value,
      };
    
      try {
        // Crear el usuario en Firebase y obtener la respuesta
        const createdUser = await this.authService.createUser(user);
        const uid = createdUser.uid;
  
        // Actualiza el nombre del usuario
        await this.authService.updateUser(user.name);
    
        // Guarda la información del usuario en la base de datos
        await this.registerInfo(uid);
    
        // Navega a la página principal
        this.router.navigate(['/main/home']);
        
        // Limpia el formulario
        this.form.reset();
    
        console.log("Usuario registrado y datos guardados exitosamente.");
      } catch (error) {
        console.error("Error al registrar usuario", error);
        alert("Error al registrar usuario: " + error.message);
      }
    } else {
      console.log('El formulario es inválido');   
    }
  } 
  
  async registerInfo(uuid: string) { 
    if (this.form.valid) {
      const user: User = {
        uid: uuid, // Usa el uid proporcionado
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        name: this.form.controls.name.value,
      };
  
      let path = `user/${uuid}`;
      delete user.password; // Elimina la contraseña del objeto
    
      try {
        // Guarda la información del usuario en la base de datos
        await this.authService.setDocument(path, user);
    
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
