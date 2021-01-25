import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { User } from '../model/user';
import { API_CONFIG } from '../config/api.config';
import { UserPage } from '../model/userPage';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getById(id): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/beneficiario/usuarios/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${API_CONFIG.baseUrl}/beneficiario/usuarios`, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${API_CONFIG.baseUrl}/beneficiario/usuarios/${user.id}`, user);
  }

  delete(id): Observable<User> {
    return this.http.delete<User>(`${API_CONFIG.baseUrl}/beneficiario/usuarios/${id}`);
  }

  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/beneficiario/usuarios/email?email=${email}`);
  }

  findByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/beneficiario/usuarios/nome?nome=${name}`);
  }

  findAll(page: number = 0, limit: number = 10): Observable<UserPage> {
    return this.http.get<UserPage>(`${API_CONFIG.baseUrl}/beneficiario/usuarios/?page=${page}&limit=${limit}`);
  }

}
