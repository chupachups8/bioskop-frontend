import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<LoginResponse> {

    const request: LoginRequest = {
      username: username,
      password: password
    };

    return this.http.post<LoginResponse>(
      this.apiUrl,
      request
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
  return this.getRole() === 'ADMIN';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}