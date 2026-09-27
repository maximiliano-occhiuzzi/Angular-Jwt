export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  refreshToken: string;
  username: string;
  rol: string;
  expiresInSeconds: number;
}

export interface RegisterRequest {
  username: string;
  password: string;
  rol: 'ADMIN' | 'ALUMNO';
}
