import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { ServiciosService } from '../../service/servicios.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-list-alumno',
  templateUrl: './list-alumno.component.html',
  styleUrls: ['./list-alumno.component.css']
})
export class ListAlumnoComponent implements OnInit {

  alumnos: Alumno[] = [];
  cargando = true;
  error: string | null = null;

  constructor(
    private serviciosService: ServiciosService,
    private authService: AuthService
  ) { }

  get username(): string | null {
    return this.authService.getUsername();
  }

  get mensajeBienvenida(): string {
    return this.authService.isAdmin()
      ? 'Bienvenido al portal de administración de la Escuela. Desde acá podés dar de alta alumnos, ver el listado y registrar nuevos usuarios.'
      : 'Bienvenido al portal de alumnos de la Escuela. Desde acá podés consultar el listado de alumnos.';
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = null;

    this.serviciosService.listarAlumnos().subscribe({
      next: (data) => {
        this.alumnos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudo obtener el listado. Revisá que el backend esté levantado.';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}
