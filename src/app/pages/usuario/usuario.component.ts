import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { UsuariosService } from './../../services/usuarios.service';
import { Usuario } from './../../models/usuario';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy {

  usuarios: Usuario[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  usuarioId: number;
  roles: Rol[] = [];
  rolesDisponibles: Rol[];
  usuarioLogueado: Usuario;

  constructor(private usuariosService: UsuariosService,
    private tokenService: TokenService

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
            this.usuarios = usuarios.filter(usuario => usuario.id !== usuarioLogueadoId || !this.tokenService.isAdmin());
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



actualizarUsuario(usuario: Usuario) {
    this.usuariosService.update(usuario).subscribe(
      response => {
        console.log(response);
        this.usuariosService.getAll().subscribe(
          usuarios => {
            this.usuarios = usuarios;
          },
          error => console.log(error)
        );
        Swal.fire({
          title: 'Actualización exitosa',
          icon: 'success',
          text: 'El usuario se actualizó correctamente'
        });
      },
      error => {
        console.log(error);
        Swal.fire({
          title: 'Error al actualizar',
          icon: 'error',
          text: 'Hubo un error al actualizar el usuario'
        });
      }
    );
  }


  asignarRoles(usuarioId: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    // Obtener los roles disponibles del servicio UsuariosService
    this.usuariosService.getall().subscribe((roles: Rol[]) => {

      // Crear un objeto selectOptions para mostrar los roles en un dropdown
      const selectOptions: { [key: number]: string } = {};
      roles.forEach((rol: Rol) => {
        selectOptions[rol.id] = rol.rolNombre;
      });

      // Mostrar un dropdown de selección de roles en el modal de Swal
      swalWithBootstrapButtons.fire({
        title: 'Asignar roles al usuario',
        input: 'select',
        inputOptions: selectOptions,
        inputPlaceholder: 'Seleccione un rol',
        showCancelButton: true,
        confirmButtonText: 'Asignar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {

        // Si se selecciona un rol, llamar al servicio UsuariosService para asignarlo al usuario
        if (result.isConfirmed) {
          const rolId = Number(result.value);
          const rolSeleccionado: Rol = roles.find((rol) => rol.id === rolId);
          const rolesSeleccionados: string[] = roles.map((rol) => rol.rolNombre);
          this.usuariosService.asignarRoles(usuarioId, [rolSeleccionado.rolNombre]).subscribe(() => {
            // Actualizar el usuario correspondiente en el arreglo usuarios
            const usuario = this.usuarios.find(u => u.id === usuarioId);
            usuario.roles = [rolSeleccionado];
            swalWithBootstrapButtons.fire({
              title: 'Roles asignados',
              icon: 'success'
            });
          }, () => {
            swalWithBootstrapButtons.fire({
              title: 'Error al asignar roles',
              icon: 'error'
            });
          });
        }
      });
    });
  }

  editarUsuario(usuario: Usuario) {
    Swal.fire({
      title: 'Editar Usuario',
      html: `
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input id="nombre" type="text" class="form-control" value="${usuario.nombre}">
        </div>
        <div class="form-group">
          <label for="correo">Correo</label>
          <input id="correo" type="email" class="form-control" value="${usuario.correo}">
        </div>
        <div class="form-group">
          <label for="tel">Teléfono</label>
          <input id="tel" type="tel" class="form-control" value="${usuario.tel}">
        </div>
        <div class="form-group">
          <label for="jornada">Jornada</label>
          <input id="jornada" type="text" class="form-control" value="${usuario.jornada}">
        </div>
        <div class="form-group">
          <label for="programa">Programa</label>
          <input id="programa" type="text" class="form-control" value="${usuario.programa}">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const correo = (document.getElementById('correo') as HTMLInputElement).value;
        const tel = (document.getElementById('tel') as HTMLInputElement).value;
        const jornada = (document.getElementById('jornada') as HTMLInputElement).value;
        const programa = (document.getElementById('programa') as HTMLInputElement).value;

        usuario.nombre = nombre;
        usuario.correo = correo;
        usuario.tel = tel;
        usuario.jornada = jornada;
        usuario.programa = programa;

        this.actualizarUsuario(usuario);
      }
    });
  }


}
