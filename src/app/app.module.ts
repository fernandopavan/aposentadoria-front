import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './core/error-interceptor';
import { AuthInterceptorProvider } from './core/auth-interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatInputModule, MatSliderModule, MatDialogModule,
  MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule, DateAdapter
} from '@angular/material';

import { UserService } from './service/user.service';
import { CaixaEletronicoService } from './service/caixa-eletronico.service';
import { StorageService } from './service/storage.service';
import { AuthService } from './service/auth.service';

import { LoginComponent } from './login/login.component';

// Usuários
import { AddUserComponent } from './user/add-user/add-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { EditUserResolver } from './user/edit-user/edit-user.resolver';

// Caixa eletrônico
import { CaixaComponent } from './caixa-eletronico/caixa.component';

import { MAT_DATE_LOCALE } from '@angular/material';
import { CustomDateAdapter } from './custom.date.adapter';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    AddUserComponent,
    EditUserComponent,
    ListUserComponent,

    CaixaComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
  ],
  providers: [
    AuthService,
    StorageService,
    UserService,
    CaixaEletronicoService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    EditUserResolver,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
