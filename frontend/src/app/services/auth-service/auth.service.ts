import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';
import { shareReplay } from 'rxjs/operators';

export const TOKEN_NAME: string = 'jwt_token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // Make a POST request to your backend server for login
    return this.http
      .post<any>(`${this.apiUrl}login`, { username, password })
      .pipe(shareReplay());
  }
  isLoggedIn() {
    return localStorage.getItem(TOKEN_NAME) != null;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_NAME);
  }
  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }
  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }
  getTokenExpirationDate(token: string): Date | null {
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    console.log(date);
    return date;
  }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, {
      username,
      email,
      password,
    });
  }
}
