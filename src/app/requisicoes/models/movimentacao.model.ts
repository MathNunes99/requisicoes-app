import { Funcionario } from "src/app/funcionarios/models/funcionarios.model";

export class Movimentacao {
  status: string;
  data: Date | any;
  descricao: string;
  funcionario: Funcionario;
 }
