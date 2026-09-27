import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno, AlumnoAlta } from '../models/alumno.model';
import { Curso, CursoAlta } from '../models/curso.model';
import { Personal, PersonalAlta } from '../models/personal.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  // Apunta al Gateway (puerto 8081 según configServer), no directo a los
  // microservicios. El Gateway enruta:
  // /alumnos/** -> lb://modulo-alumnos
  // /cursos/**  -> lb://modulo-cursos
  // /personal/** -> lb://modulo-administracion
  private readonly apiUrlAlumnos = 'http://localhost:8081/alumnos';
  private readonly apiUrlCursos = 'http://localhost:8081/cursos';
  private readonly apiUrlPersonal = 'http://localhost:8081/personal';

  constructor(private http: HttpClient) { }

  altaAlumno(alumno: AlumnoAlta): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrlAlumnos, alumno);
  }

  listarAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrlAlumnos);
  }

  altaCurso(curso: CursoAlta): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrlCursos, curso);
  }

  listarCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrlCursos);
  }

  altaPersonal(personal: PersonalAlta): Observable<Personal> {
    return this.http.post<Personal>(this.apiUrlPersonal, personal);
  }

  listarPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiUrlPersonal);
  }
}
