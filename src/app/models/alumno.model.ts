export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
}

// Lo que se manda al hacer POST /alumnos (coincide con AlumnoAltaDTO del backend)
export interface AlumnoAlta {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  cursoId?: number | null;
}
