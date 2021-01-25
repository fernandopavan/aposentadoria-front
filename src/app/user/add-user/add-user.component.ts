import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';
import { CustomDateAdapter } from 'src/app/custom.date.adapter';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE, Platform]
    }
  ]
})
export class AddUserComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService) { }

  addForm: FormGroup;

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
    senha: [
      { type: 'required', message: 'Senha é obrigatória.' },
    ],
    perfis: [
      { type: 'required', message: 'É obrigatório selecionar um tipo de perfil.' },
    ]
  };

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.addForm.value.perfis = [this.addForm.value.perfis];
    this.userService.create(this.addForm.value)
      .subscribe(data => {
        this.resetFields();
        Swal.fire('Sucesso!', 'Usuário criado', 'success');
        this.router.navigate(['list-users']);
      });
  }

  back() {
    this.router.navigate(['/list-users']);
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      numeroAnosRecebendo: [],
      perfis: ['', Validators.required]
    });
  }

  resetFields() {
    this.addForm = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      numeroAnosRecebendo: new FormControl(),
      perfis: new FormControl('', Validators.required),
    });
  }

}
