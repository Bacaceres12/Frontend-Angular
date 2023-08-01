import { AsignacionService } from './../../services/asignacion.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Asignacion } from 'src/app/models/asignacion';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-semestre',
  templateUrl: './semestre.component.html',
  styleUrls: ['./semestre.component.css']
})
export class SemestreComponent {

  asignaciones: Asignacion[];
  asignaturaId: number;
  semestre: number;
  asignacionesRealizadas: any[];
  descargaVisible: boolean = false;

  // Obtener una referencia al elemento de la tabla para el plugin jspdf-autotable
  @ViewChild('tablaAsignaciones', { static: true }) tablaAsignaciones: ElementRef;

  constructor(private asignacionService: AsignacionService) { }

  ngOnInit(): void {
    this.verAsignaciones();

  }

  ngAfterViewInit(): void {
    console.log(this.tablaAsignaciones);
  }

  verAsignaciones() {
    this.asignacionService.verAsignaciones()
      .subscribe(
        asignaciones => {
          console.log(asignaciones);
          this.asignacionesRealizadas = asignaciones.map(asignacion => {
            return {
              asignatura: asignacion.asignatura,
              semestre: asignacion.semestre,
              fecha: new Date()
            };
          });
        },
        error => {
          console.log(error);
        });
  }

  Imprimir() {
    // Crear un nuevo documento jsPDF con orientación "portrait" y unidades en "mm"
    const doc: any = new jsPDF();

    // Agregar un título a la tabla
    doc.text('Mis asignaturas', 14, 10);

    // Agregar una tabla al documento utilizando los datos de la tabla actual
    doc.autoTable({
      html: this.tablaAsignaciones.nativeElement,
      theme: 'striped',
      styles: {
        cellPadding: 2,
        fontSize: 10,
        valign: 'middle'
      },
      headStyles: {
        fillColor: [52, 73, 94],
        textColor: 255,
        halign: 'center'
      },
      margin: {top: 20}
    });

    // Descargar el archivo PDF con el nombre "mis_asignaciones.pdf"
    doc.save('mis_asignaciones.pdf');

     // Ocultar el botón de descarga
     this.descargaVisible = false;

  }

}

