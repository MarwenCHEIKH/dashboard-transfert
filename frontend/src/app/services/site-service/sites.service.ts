import { Injectable } from '@angular/core';
import { HTTPService } from '../http-service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  constructor(private httpService: HTTPService) {}

  createLocSite(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'site/create-loc-site');
  }
  updateLocSite(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'site/update-loc-site');
  }
  deleteLocSite(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'site/delete-loc-site');
  }
  getAllLocSites(): Observable<any> {
    return this.httpService.get('site/get-loc-sites');
  }
  createRemoteSite(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'site/create-remote-site');
  }
  updateRemoteSite(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'site/update-remote-site');
  }
  deleteRemoteSite(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'site/delete-remote-site');
  }
  getAllRemoteSites(): Observable<any> {
    return this.httpService.get('site/get-remote-site');
  }
}
