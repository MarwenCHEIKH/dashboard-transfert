import { Injectable } from '@angular/core';
import { HTTPService } from '../http-service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CGateGroupService {
  constructor(private httpService: HTTPService) {}

  createCGateGroup(formDataObject: any): Observable<any> {
    return this.httpService.post(
      formDataObject,
      'cgateGroup/create-cGategroup'
    );
  }
  updateCGateGroup(formDataObject: any): Observable<any> {
    return this.httpService.post(
      formDataObject,
      'cgateGroup/update-cGategroup'
    );
  }
  deleteCGateGroup(formDataObject: any): Observable<any> {
    return this.httpService.post(
      formDataObject,
      'cgateGroup/delete-cGategroup'
    );
  }
  getAllCGateGroups(): Observable<any> {
    return this.httpService.get('cgateGroup/get-cgateGroups');
  }
}
