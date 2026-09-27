import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso.model';
import { ServiciosService } from '../../service/servicios.service';

@Component({
  selector: 'app-list-curso',
  templateUrl: './list-curso.component.html',
  styleUrls: ['./list-curso.component.css']
})
export class ListCursoComponent implements OnInit {

  cursos: Curso[] = [];
  cargando = true;
  error: string | null = null;

  constructor(private serviciosService: ServiciosService) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = null;

    this.serviciosService.listarCursos().subscribe({
      next: (data) => {
        this.cursos = data;
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
