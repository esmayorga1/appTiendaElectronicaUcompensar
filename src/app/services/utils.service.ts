import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ModalOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  modalController = inject(ModalController)

  constructor(private router: Router) { }

  routerLink(url:string){
    return this.router.navigateByUrl(url);
  }

  saveInLocalStorage(key: string, value:any){
    return localStorage.setItem(key, JSON.stringify(value))

  }

  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key))
  }

  // model
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts  
    
    );
  
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if(data) return data
  
  }


  dismissModal(data?: any){
    return this.modalController.dismiss(data)
  }



  

async takePicture (promptLabelHeader: string) {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Selecciona una imagen',
    promptLabelPicture: 'Captura una Foto'

  });

 
 
 
 
 

 
 
};




}
