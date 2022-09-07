import { Departamento } from "src/app/departamentos/models/departamento.model";
import { Equipamento } from "src/app/equipamentos/models/equipamento.model";
import { Funcionario } from "src/app/funcionarios/models/funcionarios.model";

export class Requisicao{
  id: string;
  solicitanteId?: string;
  solicitante?: Funcionario;
  descricao: string;
  departamentoId: string;
  departamento?: Departamento;
  dataAbertura: Date;
  equipamentoId?: string;
  equipamento?: Equipamento;
}
