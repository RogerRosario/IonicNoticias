import { Component, ViewChild, OnInit } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  @ViewChild(IonContent) content: IonContent;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];
  constructor(private noticiaService: NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];  
   
    this.cargarNoticias( this.categorias[0] );
  }

  cambioCategoria(event){
    
    this.noticias = [];

    this.infiniteScroll.disabled = false;

    this.cargarNoticias( event.detail.value );

    this.content.scrollToTop();
  }

  cargarNoticias(categoria: string, event?){
    

    this.noticiaService.getTopHeadlinesCategoria( categoria )
                        .subscribe(resp => {
                          //console.log('Categorias', resp);
                          this.noticias.push( ...resp.articles);

                          if( resp.articles.length === 0){
                            event.target.disabled = true;
                            return;
                          }

                          if(event){
                            event.target.complete();
                          }
                        });
  }

  loadData(event){
    this.cargarNoticias(this.segment.value, event);
  }

}
