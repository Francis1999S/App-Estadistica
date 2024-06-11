import { Injectable } from '@angular/core';
import { Encuesta_masa_edad } from './objetos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  Registros_Masa: number = 0;
  Registros_Edad: number = 0;
  apiUrl: string = 'https://francis-seura.ar/';
  constructor(private http: HttpClient) { }

  Post_Masa_Edad_Data(data: Encuesta_masa_edad): Observable<any> {
    return this.http.post(this.apiUrl + "insertar.php?insert_masa=1", data);
  }
    Get_Masa_Edad_Data(): Observable<any> {
      return this.http.get(this.apiUrl + "obtener.php?obtener_masa=1");
    }
  }

