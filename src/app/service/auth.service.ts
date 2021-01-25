import { Injectable } from '@angular/core';
import { Credenciais } from '../model/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { LocalUser } from '../model/localUser';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    jwtHelperService: JwtHelperService = new JwtHelperService();

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    authenticate(credenciais: Credenciais) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/beneficiario/login`,
            credenciais,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/beneficiario/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: string) {
        const tok = authorizationValue.substring(7);
        const user: LocalUser = {
            token: tok,
            email: this.jwtHelperService.decodeToken(tok).sub,
            roles: this.jwtHelperService.decodeToken(tok).roles
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }

    isAdmin() {
        let user = this.storage.getLocalUser();
        if (user != null) {
            return user.roles.includes('ROLE_ADMIN') ? true : false;
        }
        return false;
    }

}
