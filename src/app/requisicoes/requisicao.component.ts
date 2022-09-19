import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';

import { Requisicao } from '../requisicoes/models/requisicoes.model';
import { RequisicaoService } from '../requisicoes/services/requisicao.service';
import { Departamento } from '../departamentos/models/departamento.model';
import { DepartamentoService } from '../departamentos/services/departamento.service';
import { FuncionarioService } from '../funcionarios/services/funcionario.service';
import { Equipamento } from '../equipamentos/models/equipamento.model';
import { EquipamentoService } from '../equipamentos/services/equipamento.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html'
})
export class RequisicaoComponent {


}
