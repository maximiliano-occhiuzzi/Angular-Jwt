export interface Curso {
  id: number;
  ciclo_lectivo: string;
  division: string;
  grado: string;
  turno: string;
  cupo_maximo: string;
}

// Lo que se manda al hacer POST /cursos (coincide con CursoAltaDTO del backend)
export interface CursoAlta {
  ciclo_lectivo: string;
  division: string;
  grado: string;
  turno: string;
  cupo_maximo: string;
}
