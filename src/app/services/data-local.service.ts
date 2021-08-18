import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;

  noticias: Article[] = [];

  constructor(private storage: Storage,
              private toastCrtl: ToastController) { 
    this.init();
    this.cargarFavoritos();
  }

  async presentToast(message: string){
    const toast = await this.toastCrtl.create({
      message,
      duration: 1000
    });
    toast.present();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async guardarNoticia(noticia: Article){

    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if(!existe){
      this.noticias.unshift(noticia);
  
      this.storage.set('favoritos', this.noticias);
    }
    this.presentToast('Noticia agregada a favoritos...');

  }

  async cargarFavoritos(){
      
    const favoritos = await this.storage.get('favoritos');

    if(favoritos){
      this.noticias = favoritos;
    }

  }


  borrarNoticia(noticia: Article){
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Noticia eliminada...')
  }
}
