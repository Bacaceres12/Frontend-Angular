import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Asignatura } from './../../models/asignatura';
import { AsignaturasService } from './../../services/asignaturas.service';
import { AsignacionService } from './../../services/asignacion.service';
import { Asignacion } from './../../models/asignacion';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {

  asignaciones: Asignacion[];
  asignaturaId: number;
  semestre: number;
  asignaturasDisponibles: Asignatura[];

  constructor(
    private asignacionService: AsignacionService,
    private asignaturasService: AsignaturasService
  ) { }

  ngOnInit(): void {
    this.asignaturasService.obtenerTodasLasAsignaturas().subscribe(
      asignaturas => {
        this.asignaturasDisponibles = asignaturas;
      },
      error => {
        console.log(error);
      }
    );

    this.asignacionService.verAsignaciones().subscribe(
      asignaciones => {
        this.asignaciones = asignaciones;
      },
      error => {
        console.log(error);
      }
    );
  }


  asignar(asignaturaId: number, semestre: number) {
    this.asignacionService.asignar(asignaturaId, semestre).subscribe(
      response => {
        console.log(response);
        Swal.fire('Asignación exitosa', 'La asignatura ha sido asignada', 'success');
      },
      error => {
        console.log(error);
        Swal.fire('Error al asignar', 'Ha ocurrido un error al intentar asignar la asignatura', 'error');
      }
    );
  }
}
