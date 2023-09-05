import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Service } from 'app/models/service.model';

const base_url = environment.base_url;
const urlServices = `${base_url}/services`

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  createService(service: Service) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(urlServices, service, httpOptions).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  getServices() {
    return this.http.get<Service[]>(urlServices);
  }

  getServiceInfo(serviceID: string) {
    const url = `${base_url}/services?serviceID=${serviceID}`;
    return this.http.get<Service[]>(url);
  }

  deleteService(serviceID: string) {
    const url = `${urlServices}?serviceID=${serviceID}`;
    
    return this.http.delete<void>(url);
  }

}
