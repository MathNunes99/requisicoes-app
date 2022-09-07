import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';

import { Requisicao } from '../requisicoes/models/requisicoes.model';
import { RequisicaoService } from '../requisicoes/services/requisicao.service';
import { Departamento } from '../departamentos/models/departamento.model';
import { DepartamentoService } from '../departamentos/services/departamento.service';
import { Funcionario } from '../funcionarios/models/funcionarios.model';
import { FuncionarioService } from '../funcionarios/services/funcionario.service';
import { Equipamento } from '../equipamentos/models/equipamento.model';
import { EquipamentoService } from '../equipamentos/services/equipamento.service';

import { NgbDatepicker, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html'
})
export class RequisicaoComponent implements OnInit {
  public funcionarioLogado: Funcionario;
  public equipamentos$: Observable<Equipamento[]>;
  public departamentos$: Observable<Departamento[]>;
  public requisicoes$: Observable<Requisicao[]>;
  public form: FormGroup;
  public authService: AuthenticationService;

  constructor(
    private departamentoService: DepartamentoService,
    private equipamentoService: EquipamentoService,
    private requisicaoService: RequisicaoService,
    private funcionarioService: FuncionarioService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      requisicao: new FormGroup({
        id: new FormControl(""),
        solicitanteId: new FormControl(""),
        solicitante: new FormControl(""),
        descricao: new FormControl("", [Validators.required, Validators.minLength(3)]),
        departamentoId: new FormControl("", Validators.required),
        departamento: new FormControl(""),
        dataAbertura: new FormControl(""),
        equipamentoId: new FormControl(""),
        equipamento: new FormControl("")
      }),
    })
    this.requisicoes$ = this.requisicaoService.selecionarTodos();
    this.departamentos$ = this.departamentoService.selecionarTodos();
    this.equipamentos$ = this.equipamentoService.selecionarTodos();
  }

  get tituloModal(): string {
    return this.id?.value ? "Atualização" : "Cadastro"
  }

  get id(): AbstractControl | null {
    return this.form.get("requisicao.id");
  }

  get solicitanteId(): AbstractControl | null {
    return this.form.get("requisicao.solicitanteId");
  }

  get descricao(): AbstractControl | null {
    return this.form.get("requisicao.descricao");
  }

  get departamentoId(): AbstractControl | null {
    return this.form.get("requisicao.departamentoId");
  }

  get dataAbertura(): AbstractControl | null {
    return this.form.get("requisicao.dataAbertura");
  }

  get equipamentoId(): AbstractControl | null {
    return this.form.get("requisicao.equipamentoId");
  }

  public async gravar(modal: TemplateRef<any>, requisicao?: Requisicao) {
    this.form.reset();

    if (requisicao) {
      const departamento = requisicao.departamento ? requisicao.departamento : null;
      const equipamento = requisicao.equipamento ? requisicao.equipamento : null;
      const solicitante = requisicao.solicitante ? requisicao.solicitante : null;

      const funcionarioCompleto = {
        ...solicitante,
      }
      const departamentoCompleto = {
        ...departamento,
      }
      const equipamentoCompleto = {
        ...equipamento,
      }

      this.form.get("funcionario")?.setValue(funcionarioCompleto);
      this.form.get("departamento")?.setValue(departamentoCompleto);
      this.form.get("equipamento")?.setValue(equipamentoCompleto);

    }


    try {
      await this.modalService.open(modal).result;

      if (!requisicao){
        this.form.get("requisicao.dataAbertura")?.setValue(new Date().toLocaleDateString())
        await this.requisicaoService.inserir(this.form.get("requisicao")?.value);
      }
      else
        await this.requisicaoService.editar(this.form.get("requisicao")?.value);

      this.toastrService.success('A requisicao foi salva com sucesso', 'Cadastro de Requisições');
    } catch (error) {
      if (error != "fechar" && error != "0" && error != "1")
        this.toastrService.error('Houve um erro ao salvar a Requisição. Tente Novamente', 'Cadastro de Requisições');
    }
  }

  public async excluir(requisicao: Requisicao) {
    try {
      await this.requisicaoService.excluir(requisicao)

      this.toastrService.success('A Requisição foi excluida com sucesso', 'Exclusão de Requisições');

    } catch (error) {
      this.toastrService.error('Houve um erro ao excluir a requisição. Tente Novamente', 'Exclusão de Requisições');

    }
  }

  //public obterFuncionarioLogado() {
  //  this.authService.authUser()
  //    .subscribe(dados => {
  //      this.funcionarioService.selecionarFuncionarioLogado(dados?.email)
  //        .subscribe(funcionario => {
  //          this.funcionarioLogado = funcionario;
  //        });
  //    })
  //
  //
  //}
}
