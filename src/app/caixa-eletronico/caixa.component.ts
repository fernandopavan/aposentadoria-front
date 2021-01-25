import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { CaixaEletronicoService } from '../service/caixa-eletronico.service';
import { UserService } from '../service/user.service';
import { StorageService } from '../service/storage.service';
import Swal from 'sweetalert2';
import { API_CONFIG } from '../config/api.config';

import * as Stomp from '@stomp/stompjs';
import { WebSocketConnector } from '../web-socket-connector';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.scss']
})
export class CaixaComponent implements OnInit {

  beneficiario: User;
  addForm: FormGroup;
  email: string;

  validationMessages = {
    valor: [
      { type: 'required', message: 'Valor é obrigatório.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private caixaEletronicoService: CaixaEletronicoService,
    private userService: UserService,
    private storageService: StorageService
  ) { 
    this.email = this.storageService.getLocalUser().email;
    const ws = new WebSocketConnector(API_CONFIG.baseUrl + '/beneficiario/socket', "calculated", this.onMessage.bind(this));
  }

  ngOnInit() {
    this.getBeneficario();
    this.createForm();
  }

  onSubmit() {
    this.caixaEletronicoService.aporte(this.addForm.value)
      .subscribe(data => {
        this.createForm();
        Swal.fire('Agendado!', 'Você será notificado quando o cálculo terminar.', 'success');
      });
  }

  getBeneficario(): void {
    this.userService.findByEmail(this.email)
      .subscribe(beneficiario => {
        this.beneficiario = beneficiario;
      });
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      valor: ['', Validators.required],
      email: [this.email, Validators.required]
    });
  }

  onMessage(message: Stomp.Message): void {  
    let result = JSON.parse(message.body)
    Swal.fire('Cálculo concluído!', 'Atualmente você receberá o valor de R$ ' + result.valorAtualMensal + ' mensais.', 'success');  
    this.beneficiario.saldoTotal = result.saldoTotal;
    this.beneficiario.valorAtualMensal = result.valorAtualMensal;
    this.beneficiario.situacao = result.situacao;
  }

}
