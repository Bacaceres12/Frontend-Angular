import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-beadcrumbs',
  templateUrl: './beadcrumbs.component.html',
  styleUrls: ['./beadcrumbs.component.css']
})

export class BeadcrumbsComponent implements OnDestroy  {

  public titulo?:string;
  public tituloSubs$:Subscription;

  constructor(private router:Router) {

    this.tituloSubs$ = this.getArgumentos().subscribe(({titulo})=>{

      this.titulo = titulo;
      document.title = `UNIAJC - ${titulo}`;

    })

   }


  ngOnDestroy() {

    this.tituloSubs$.unsubscribe();

  }

  getArgumentos(){

    return this.router.events.pipe(

      filter((event:any) => event instanceof ActivationEnd),
      filter((event:ActivationEnd)=> event.snapshot.firstChild === null),
      map((event:ActivationEnd)=> event.snapshot.data)

    );

  }



}

