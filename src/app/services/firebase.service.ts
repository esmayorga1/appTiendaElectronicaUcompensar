import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';
import { getAuth, updateProfile } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL} from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private utilService: UtilsService,
    private firestorage: AngularFirestore
  ) {}

  async createUser(user: User): Promise<any> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      return credential.user; // Devuelve el objeto del usuario creado
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  async loginWithEmail(user: User): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  async updateUser(displayName: string): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await updateProfile(user, { displayName });
        console.log("Perfil actualizado con éxito");
      } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        throw error;
      }
    } else {
      console.error("No hay un usuario autenticado");
      throw new Error("No hay un usuario autenticado");
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user'); // Elimina el usuario del almacenamiento local
      this.utilService.routerLink('/auth'); // Redirige a la página de autenticación
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }

  async setDocument(path: string, data: any): Promise<void> {
    await setDoc(doc(getFirestore(), path), data);
  }

  async updateDocument(path: string, data: any): Promise<void> {
    await updateDoc(doc(getFirestore(), path), data);
  }




  async getDocument(path: string): Promise<any> {
    const docSnap = await getDoc(doc(getFirestore(), path));
    return docSnap.exists() ? docSnap.data() : null; 
  }

  getAuth() {
    return getAuth();
  }

// agregrar documento a la bd
addDocument(path: string, data:any) {
  return addDoc(collection(getFirestore(), path), data);
 
}

  // Almacenar

 async uploadImage(path:string, data_url:any){
    return uploadString(ref(getStorage(),path), data_url, 'data_url').then(()=>{
      return getDownloadURL(ref(getStorage(), path))
    })

  }


  // obtener los productos de una coleccion

  getCollectionData(path: string, collectionQuery?: any){

    const ref = collection(getFirestore(), path)
    return collectionData(query(ref, collectionQuery), {idField: 'id'})
  }

  async getFilePath(url: string){
    return ref(getStorage(), url).fullPath

  }

  async deleteDocument(path: string): Promise<void> {
    await deleteDoc(doc(getFirestore(), path));
  }

  
}
