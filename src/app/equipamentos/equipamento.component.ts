import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Equipamento } from './models/equipamento.model';
import { EquipamentoService } from './services/equipamento.service';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html'
})
export class EquipamentoComponent implements OnInit {
  public equipamentos$: Observable<Equipamento[]>;
  public form: FormGroup;

  constructor(
    private equipamentoService: EquipamentoService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.equipamentos$ = this.equipamentoService.selecionarTodos();

    this.form = this.fb.group({
      id: new FormControl(""),
      numeroSerie: new FormControl(""),
      nome: new FormControl(""),
      precoAquisicao: new FormControl(""),
      dataFabricacao: new FormControl("")
    })
  }

  get tituloModal(): string{
    return this.id?.value ? "Atualização" : "Cadastro"
  }

  get id() {
    return this.form.get("id");
  }

  get numeroSerie() {
    return this.form.get("numeroSerie");
  }

  get nome() {
    return this.form.get("nome");
  }

  get precoAquisicao() {
    return this.form.get("precoAquisicao");
  }

  get dataFabricacao() {
    return this.form.get("dataFabricacao")
  }

  public async gravar(modal: TemplateRef<any>, equipamento?: Equipamento) {
    this.form.reset();

    console.log(equipamento);

    if (equipamento)
      this.form.setValue(equipamento);

    try {
      await this.modalService.open(modal).result;

      if (!equipamento)
        await this.equipamentoService.inserir(this.form.value)
      else
        await this.equipamentoService.editar(this.form.value);

      this.toastrService.success('O equipamento foi salvo com sucesso', 'Cadastro de Equipamentos');
    } catch (error) {
      if (error != "fechar" && error != "0" && error != "1")
      this.toastrService.error('Houve um erro ao salvar o equipamento. Tente Novamente', 'Cadastro de Equipamentos');

    }

  }

  public async excluir(equipamento: Equipamento){
    try {
      await this.equipamentoService.excluir(equipamento)

      this.toastrService.success('O equipamento foi excluido com sucesso', 'Exclusão de Equipamentos');

    } catch (error) {
      this.toastrService.error('Houve um erro ao excluir o equipamento. Tente Novamente', 'Exclusão de Equipamentos');

    }
  }
}
