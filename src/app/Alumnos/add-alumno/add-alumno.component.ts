import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosService } from '../../service/servicios.service';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.css']
})
export class AddAlumnoComponent {

  form: FormGroup;
  enviando = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private serviciosService: ServiciosService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.error = null;

    this.serviciosService.altaAlumno(this.form.value).subscribe({
      next: () => {
        this.enviando = false;
        this.router.navigate(['/listAlumno']);
      },
      error: (err) => {
        this.enviando = false;
        this.error = err.status === 403
          ? 'No tenés permiso para dar de alta alumnos (se requiere rol ADMIN).'
          : 'No se pudo dar de alta el alumno. Revisá que el backend esté levantado.';
        console.error(err);
      }
    });
  }
}
