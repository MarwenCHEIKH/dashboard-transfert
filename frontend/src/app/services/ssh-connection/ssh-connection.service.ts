import { Injectable } from '@angular/core';
import { HTTPService } from '../http-service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SshConnectionService {
  constructor(private httpService: HTTPService) {}
  sendConfig(config: any): Observable<any> {
    return this.httpService.post(config, 'connection/config');
  }
}
