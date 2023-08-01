import { Tramites } from './../../models/tramites';
import { TramitesService } from './../../services/tramites.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent implements OnInit {

  tramite : Tramites =null;

  constructor(

    private tramitesService: TramitesService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router

  ){}


  ngOnInit(): void {
    const idSolicitud = this.activatedRoute.snapshot.params.id;
    this.tramitesService.detail(idSolicitud).subscribe(
      data => {
        this.tramite = data;
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }


  onUpdate(): void {
    const idSolicitud = this.activatedRoute.snapshot.params.id;
    this.tramitesService.update(idSolicitud, this.tramite).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }





}


