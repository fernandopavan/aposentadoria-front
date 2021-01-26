import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { first } from 'rxjs/operators';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';
import { CustomDateAdapter } from 'src/app/custom.date.adapter';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE, Platform]
    }
  ]
})
export class EditUserComponent implements OnInit {

  user: User;
  perfis: string;
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  validationMessages = {
    nome: [
      { type: 'required', message: 'Nome é obrigatório.' }
    ],
    cpf: [
      { type: 'required', message: 'CPF é obrigatório.' }
    ],
    email: [
      { type: 'required', message: 'E-mail é obrigatório.' },
    ],
    perfis: [
      { type: 'required', message: 'É obrigatório selecionar um tipo de perfil.' },
    ]
  };

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.user = data;
        this.user.id = data.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.perfis = this.user.perfis.includes('BENEFICIARIO') ? '1' : '0';
    this.editForm = this.formBuilder.group({
      id: [this.user.id],
      nome: [this.user.nome, Validators.required],
      cpf: [this.user.cpf, Validators.required],
      email: [this.user.email, Validators.required],
      senha: [{ value: '***', disabled: true }],
      numeroAnosRecebendo: [this.user.numeroAnosRecebendo],
      perfis: [{ value: this.perfis, disabled: true }]
    });
  }

  onSubmit() {
    this.editForm.value.senha = this.user.senha;
    this.editForm.value.perfis = [this.perfis];
    this.userService.update(this.editForm.value)
      .pipe(first())
      .subscribe(response => {
        Swal.fire('Sucesso!', 'Usuário atualizado', 'success');
        this.router.navigate(['list-users']);
      },
        error => { });
  }

  delete() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apague!'
    }).then((result) => {
      if (result.value) {
        this.userService.delete(this.user.id)
          .subscribe(
            response => {
              this.router.navigate(['/list-users']);
              Swal.fire('Sucesso!', 'Usuário removido', 'success');
            },
            err => {
              Swal.fire('Erro!', err, 'error');
            }
          );
      }
    });

  }

  cancel() {
    this.router.navigate(['/list-users']);
  }
}
