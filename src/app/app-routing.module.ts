import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddAlumnoComponent} from './Alumnos/add-alumno/add-alumno.component'
import { ListAlumnoComponent } from './Alumnos/list-alumno/list-alumno.component';
import { AddCursoComponent } from './Cursos/add-curso/add-curso.component';
import { ListCursoComponent } from './Cursos/list-curso/list-curso.component';
import { AddPersonalComponent } from './Personal/add-personal/add-personal.component';
import { ListPersonalComponent } from './Personal/list-personal/list-personal.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard';
import { adminGuard } from './auth/admin.guard';
const routes: Routes = [

   { path: '', redirectTo: 'listAlumno', pathMatch: 'full' },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent, canActivate: [authGuard, adminGuard] },
   { path: 'alumnoForm', component:AddAlumnoComponent, canActivate: [authGuard, adminGuard] },
   { path: 'listAlumno', component:ListAlumnoComponent, canActivate: [authGuard] },
   { path: 'cursoForm', component: AddCursoComponent, canActivate: [authGuard, adminGuard] },
   { path: 'listCurso', component: ListCursoComponent, canActivate: [authGuard] },
   { path: 'personalForm', component: AddPersonalComponent, canActivate: [authGuard, adminGuard] },
   { path: 'listPersonal', component: ListPersonalComponent, canActivate: [authGuard] },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 



 }
