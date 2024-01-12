import { Injectable } from '@angular/core';
import { HTTPService } from '../http-service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RuleTableService {
  constructor(private httpService: HTTPService) {}
  createRuleTable(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'ruleTables/create-table');
  }
  updateRuleTable(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'ruleTables/update-table');
  }
  deleteRuleTable(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'ruleTables/delete-table');
  }
  getAllRuleTables(): Observable<any> {
    return this.httpService.get('ruleTables/get-tables');
  }
  getTableByName(name: string): Observable<any> {
    return this.httpService.get(`ruleTables/get-tableDetails?name=${name}`);
  }
}
