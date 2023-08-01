import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  asignaturas: any[];
  nombre: string;
  descripcion: string;
  creditos: number;
  horario: string;
  semestre: number;


  constructor(private asignaturasService: AsignaturasService) { }

  ngOnInit() {
    this.obtenerTodasLasAsignaturas();
  }
  crearAsignatura(nombre: string, semestre: number, horario: string, descripcion: string, creditos: number) {
    this.asignaturasService.crearAsignatura(nombre, semestre, horario, descripcion, creditos).subscribe(
      (asignatura) => {
        this.asignaturas.push(asignatura);
        Swal.fire('Asignatura creada', '', 'success');
      },
      (error) => {
        Swal.fire('Error al crear la asignatura', '', 'error');
      }
    );
  }


  actualizarAsignatura(id: number, nombre: string) {
    this.asignaturasService.actualizarAsignatura(id, nombre).subscribe(
      (asignatura) => {
        const index = this.asignaturas.findIndex((a) => a.id === asignatura.id);
        this.asignaturas[index] = asignatura;
        Swal.fire('Asignatura actualizada', '', 'success');
      },
      (error) => {
        Swal.fire('Error al actualizar la asignatura', '', 'error');
      }
    );
  }

  eliminarAsignatura(id: number) {
    this.asignaturasService.eliminarAsignatura(id).subscribe(
      () => {
        this.asignaturas = this.asignaturas.filter((a) => a.id !== id);
        Swal.fire('Asignatura eliminada', '', 'success');
      },
      (error) => {
        Swal.fire('Error al eliminar la asignatura', '', 'error');
      }
    );
  }

  obtenerTodasLasAsignaturas() {
    this.asignaturasService.obtenerTodasLasAsignaturas().subscribe(
      (asignaturas) => {
        this.asignaturas = asignaturas;
      },
      (error) => {
        Swal.fire('Error al obtener las asignaturas', '', 'error');
      }
    );
  }

}
