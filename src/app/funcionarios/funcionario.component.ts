import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Departamento } from '../departamentos/models/departamento.model';
import { DepartamentoService } from '../departamentos/services/departamento.service';
import { Funcionario } from './models/funcionarios.model';
import { FuncionarioService } from './services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html'
})
export class FuncionarioComponent implements OnInit {
  public funcionarios$: Observable<Funcionario[]>;
  public departamentos$: Observable<Departamento[]>
  public form: FormGroup;

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl(""),
      nome: new FormControl(""),
      email: new FormControl(""),
      funcao: new FormControl(""),
      departamentoId: new FormControl(""),
      departamento: new FormControl(""),
    })

    this.funcionarios$ = this.funcionarioService.selecionarTodos();
    this.departamentos$ = this.departamentoService.selecionarTodos();
  }

  get tituloModal(): string{
    return this.id?.value ? "Atualização" : "Cadastro"
  }

  get id(): AbstractControl | null{
    return this.form.get("id");
  }

  public async gravar(modal: TemplateRef<any>, funcionario?: Funcionario) {
    this.form.reset();

    if (funcionario){
      const departamento = funcionario.departamento ? funcionario.departamento: null;

      const funcionarioCompleto = {
        ...funcionario,
        departamento
      }

      this.form.setValue(funcionarioCompleto);
    }

    try {
      await this.modalService.open(modal).result;

      if (!funcionario)
        await this.funcionarioService.inserir(this.form.value)
      else
        await this.funcionarioService.editar(this.form.value);

      this.toastrService.success('O funcionario foi salvo com sucesso', 'Cadastro de Funcionarios');
    } catch (error) {
      if (error != "fechar" && error != "0" && error != "1")
      this.toastrService.error('Houve um erro ao salvar o funcionario. Tente Novamente', 'Cadastro de Funcionarios');

    }

  }

  public async excluir(funcionario: Funcionario){
    try {
      await this.funcionarioService.excluir(funcionario)

      this.toastrService.success('O funcionario foi excluido com sucesso', 'Exclusão de Funcionarios');

    } catch (error) {
      this.toastrService.error('Houve um erro ao excluir o funcionario. Tente Novamente', 'Exclusão de Funcionarios');

    }
  }

}