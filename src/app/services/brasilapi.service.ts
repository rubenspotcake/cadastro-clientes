import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado, Municipio } from '../components/cadastro/brasilapi.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {
  baseUrl = 'https://brasilapi.com.br/api';

  getEstados() {
    return this.http.get<Estado[]>(`${this.baseUrl}/ibge/uf/v1`);
  }

  getMunicipios(estadoSigla: string) {
    return this.http.get<Municipio[]>(`${this.baseUrl}/ibge/municipios/v1/${estadoSigla}`);
  }

  constructor(private http: HttpClient) { }

  listarEstados(): Observable<Estado[]> {
    return this.getEstados();
  }

  listarMunicipios (estadoSigla: string): Observable<Municipio[]> {
    return this.getMunicipios(estadoSigla);
  }
}
