import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  private apiUrl = 'http://localhost:3000'; // Update with your API endpoint

  constructor(private authService: AuthService, private http: HttpClient) {}

  post(data: any, endpoint: string): Observable<any> {
    // Get the JWT token from AuthService
    const token = this.authService.getToken();

    // Ensure the token is available
    if (!token) {
      throw new Error('No token available');
    }

    // Create headers with the Authorization token
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    });

    // Make a POST request with the data in the body and JWT token in the header
    return this.http
      .post<any>(`${this.apiUrl}/${endpoint}`, data, { headers })
      .pipe(shareReplay());
  }
  get(endpoint: string): Observable<any> {
    // Get the JWT token from AuthService
    const token = this.authService.getToken();

    // Ensure the token is available
    if (!token) {
      throw new Error('No token available');
    }

    // Create headers with the Authorization token
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    });

    // // Make a GET request with the JWT token in the header
    return this.http
      .get(`${this.apiUrl}/${endpoint}`, { headers })
      .pipe(shareReplay());
  }
}
