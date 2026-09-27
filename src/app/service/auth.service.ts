import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/auth.model';

const TOKEN_KEY = 'escuela_token';
const REFRESH_KEY = 'escuela_refresh_token';
const USERNAME_KEY = 'escuela_username';
const ROL_KEY = 'escuela_rol';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Apunta al Gateway, no directo al micro de Auth (mismo criterio que
  // usamos para Alumnos: todo pasa por el Gateway).
  private readonly apiUrl = 'http://localhost:8081/auth';

  // Permite que otros componentes (ej: la barra de navegación) sepan en
  // tiempo real si hay sesión iniciada, sin tener que estar preguntando.
  private loggedIn$ = new BehaviorSubject<boolean>(this.hayToken());

  constructor(private http: HttpClient) { }

  login(credenciales: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credenciales).pipe(
      tap(respuesta => this.guardarSesion(respuesta))
    );
  }

  // El access token dura poco (15 min) a propósito. Cuando vence, el
  // interceptor llama acá automáticamente para conseguir uno nuevo sin
  // que el usuario tenga que volver a loguearse — mientras el refresh
  // token siga vivo y no haya sido revocado.
  refresh(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();

    return this.http.post<LoginResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(respuesta => this.guardarSesion(respuesta))
    );
  }

  // El "logout de verdad" pasa por el back: revoca el refresh token en
  // la base de Auth, para que no se pueda usar de nuevo para pedir
  // access tokens. Es best-effort — si el back no responde (caído, red),
  // igual limpiamos la sesión local, no queremos trabar al usuario.
  logout(): void {
    const refreshToken = this.getRefreshToken();

    if (refreshToken) {
      this.http.post(`${this.apiUrl}/logout`, { refreshToken }).subscribe({
        next: () => {},
        error: () => {}
      });
    }

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ROL_KEY);
    this.loggedIn$.next(false);
  }

  register(nuevoUsuario: RegisterRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, nuevoUsuario, { responseType: 'text' });
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(USERNAME_KEY);
  }

  getRol(): string | null {
    return localStorage.getItem(ROL_KEY);
  }

  isAdmin(): boolean {
    return this.getRol() === 'ADMIN';
  }

  isLoggedIn(): boolean {
    return this.hayToken();
  }

  isLoggedIn$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  private guardarSesion(respuesta: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, respuesta.token);
    localStorage.setItem(REFRESH_KEY, respuesta.refreshToken);
    localStorage.setItem(USERNAME_KEY, respuesta.username);
    localStorage.setItem(ROL_KEY, respuesta.rol);
    this.loggedIn$.next(true);
  }

  private hayToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
}
