import { Component, Input ,OnInit } from '@angular/core';
import { Requisicao } from '../../models/requisicoes.model';

@Component({
  selector: 'app-requisicao-detalhes',
  templateUrl: './requisicoes-detalhes.component.html',
})
export class RequisicoesDetalhesComponent {
    @Input() requisicao: Requisicao;
}
