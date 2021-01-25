import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { API_CONFIG } from '../config/api.config';
import { Aporte } from '../model/aporte';

@Injectable()
export class CaixaEletronicoService {

  constructor(private http: HttpClient) { }

  aporte(aporte: Aporte): Observable<Aporte> {
    return this.http.post<Aporte>(`${API_CONFIG.baseUrl}/caixa-eletronico/novo-aporte`, aporte);
  }

}
