import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;
  enviando = false;
  error: string | null = null;
  mensajeExito: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rol: ['ALUMNO', Validators.required]
    });
  }

  registrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.error = null;
    this.mensajeExito = null;

    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.enviando = false;
        this.mensajeExito = `Usuario "${this.form.value.username}" creado con rol ${this.form.value.rol}.`;
        this.form.reset({ rol: 'ALUMNO' });
      },
      error: (err: HttpErrorResponse) => {
        this.enviando = false;
        if (err.status === 409) {
          this.error = 'Ese nombre de usuario ya existe.';
        } else if (err.status === 403) {
          this.error = 'No tenés permiso para crear usuarios (se requiere rol ADMIN).';
        } else {
          this.error = 'No se pudo crear el usuario. Revisá que el backend esté levantado.';
        }
      }
    });
  }
}
