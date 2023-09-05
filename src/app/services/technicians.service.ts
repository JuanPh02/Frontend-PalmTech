import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Technician } from 'app/models/technician.model';

const base_url = environment.base_url;
const urlTechnicians = `${base_url}/technicians`

@Injectable({
  providedIn: 'root'
})
export class TechniciansService {

  constructor(private http: HttpClient) { }

  createTechnician(technician: Technician) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(urlTechnicians, technician, httpOptions).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  getTechnicians() {
    return this.http.get<Technician[]>(urlTechnicians);
  }

  getTechnicianInfo(technicianID: string) {
    const url = `${base_url}/technician?technicianID=${technicianID}`;
    return this.http.get<Technician[]>(url);
  }

  deleteTechnician(technicianID: string) {
    const url = `${urlTechnicians}?technicianID=${technicianID}`;
    
    return this.http.delete<void>(url);
  }

}
