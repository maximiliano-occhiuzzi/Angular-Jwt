import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosService } from '../../service/servicios.service';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent {

  form: FormGroup;
  enviando = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private serviciosService: ServiciosService,
    private router: Router
  ) {
    this.form = this.fb.group({
      ciclo_lectivo: ['', Validators.required],
      division: ['', Validators.required],
      grado: ['', Validators.required],
      turno: ['', Validators.required],
      cupo_maximo: ['', Validators.required]
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.error = null;

    this.serviciosService.altaCurso(this.form.value).subscribe({
      next: () => {
        this.enviando = false;
        this.router.navigate(['/listCurso']);
      },
      error: (err) => {
        this.enviando = false;
        this.error = err.status === 403
          ? 'No tenés permiso para dar de alta cursos (se requiere rol ADMIN).'
          : 'No se pudo dar de alta el curso. Revisá que el backend esté levantado.';
        console.error(err);
      }
    });
  }
}
