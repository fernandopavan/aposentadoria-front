import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public auth: AuthService) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.required]
    });

    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['list-users']);
      },
        error => { });
  }

  onSubmit() {
    this.auth.authenticate(this.loginForm.value)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));

        if (this.auth.isAdmin()) {
          this.router.navigate(['list-users']);
        } else {
          this.router.navigate(['caixa-eletronico']);
        }

        Swal.fire('Bem-vindo', 'Login feito com sucesso!', 'success');
      },
        error => {
          Swal.fire('Ops...', 'Credenciais inválidas', 'question');
        });
  }

}
