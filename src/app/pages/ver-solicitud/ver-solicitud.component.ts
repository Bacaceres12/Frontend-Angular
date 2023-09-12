import { AsignacionService } from './../../services/asignacion.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { UsuariosService } from './../../services/usuarios.service';
import { Usuario } from './../../models/usuario';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { TokenService } from 'src/app/services/token.service';
import { error } from 'jquery';
import { Asignacion } from './../../models/asignacion';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit, OnDestroy {

  usuarios: Usuario[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  usuarioId: number;
  roles: Rol[] = [];
  rolesDisponibles: Rol[];
  usuarioLogueado: Usuario;

  asignaciones: Asignacion[];
  asignaturaId: number;
  semestre: number;

  constructor(private usuariosService: UsuariosService,
    private tokenService: TokenService,
    private asignacionService: AsignacionService,

    ) { }

    ngOnInit(): void {
      this.dtOptions = {
        pageLength: 10,
        searching: true,
        responsive: true,
        info: true,
        language: { url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json' }
      };

      const usuarioLogueadoId = this.tokenService.getIdUsuario();

      if (usuarioLogueadoId !== null) {
        this.usuariosService.getAll().subscribe(
          usuarios => {
            this.usuarios = usuarios.filter(usuario =>
              usuario.id !== usuarioLogueadoId &&
              !usuario.roles.some(rol => rol.rolNombre === 'admin' || rol.rolNombre === 'director')
            );
            this.dtTrigger.next();
          },
          error => console.log(error)
        );
      } else {
        console.warn('Usuario logueado no definido.');
      }
    }



  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  asignarAsignatura(usuarioId: number, asignaturaId: number, semestre: number): void {
    this.asignacionService.asignar(usuarioId, asignaturaId, ).subscribe(
      response => {
        console.log(response);
        Swal.fire('Asignación exitosa', 'La asignatura ha sido asignada', 'success');
        // Aquí podrías realizar alguna actualización en la vista si es necesario
      },
      error => {
        console.error(error);
        Swal.fire('Error al asignar', 'Ha ocurrido un error al intentar asignar la asignatura', 'error');
        // Manejo de errores y retroalimentación visual
      }
    );
  }

}
