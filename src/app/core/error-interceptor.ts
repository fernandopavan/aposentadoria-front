import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../service/storage.service';
import { FieldMessage } from '../model/fieldMessage';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(catchError((error) => {

                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log('Erro detectado pelo interceptor:');
                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;

                    case 403:
                        this.handle403();
                        break;

                    case 422:
                        this.handle422(errorObj);
                        break;

                    default:
                        this.handleDefaultEror(errorObj);
                }

                return throwError(errorObj);
            })) as any;
    }

    handle403() {
        if (this.storage.getLocalUser() == null) {
            return;
        }
        Swal.fire('Erro 403: sem permissão', 'Você tem permissão para esse recurso?', 'question');
    }

    handle401() {
        Swal.fire('Erro 401: falha de autenticação', 'E-mail ou senha incorretos', 'question');
    }

    handle422(errorObj) {
        Swal.fire({ title: 'Erro 422: Validação', icon: 'error', html: this.listErrors(errorObj.errors) });
    }

    handleDefaultEror(errorObj) {
        Swal.fire({ title: 'Erro', icon: 'info', html: errorObj.status + ': ' + errorObj.error });
    }

    private listErrors(messages: FieldMessage[]): string {
        let s = '';
        for (const msg of messages) {
            s = s + '<p><strong>' + msg.fieldName + '</strong>: ' + msg.message + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
