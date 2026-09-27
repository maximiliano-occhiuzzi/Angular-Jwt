import { Component, OnInit } from '@angular/core';
import { Personal } from '../../models/personal.model';
import { ServiciosService } from '../../service/servicios.service';

@Component({
  selector: 'app-list-personal',
  templateUrl: './list-personal.component.html',
  styleUrls: ['./list-personal.component.css']
})
export class ListPersonalComponent implements OnInit {

  personal: Personal[] = [];
  cargando = true;
  error: string | null = null;

  constructor(private serviciosService: ServiciosService) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = null;

    this.serviciosService.listarPersonal().subscribe({
      next: (data) => {
        this.personal = data;
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
