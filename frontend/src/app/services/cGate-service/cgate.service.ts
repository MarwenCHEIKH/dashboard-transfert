import { Injectable } from '@angular/core';
import { HTTPService } from '../http-service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CgateService {
  constructor(private httpService: HTTPService) {}

  createCGate(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'cGate/create-cGate');
  }
  updateCGate(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'cGate/update-cGate');
  }
  deleteCGate(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'cGate/delete-cGate');
  }
  getAllCgates(): Observable<any> {
    return this.httpService.get('cgate/get-cGates');
  }
  getCgateByName(name: string): Observable<any> {
    return this.httpService.get(`cgate/get-cgateDetails?name=${name}`);
  }
}
