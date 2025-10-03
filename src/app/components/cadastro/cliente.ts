import { v4 as uuid } from 'uuid';

export class Cliente{
  id?: string
  nome?: string;
  email?: string;
  cpf?: string;
  dataNascimento?: Date;

  static newCliente(): Cliente {
    let cliente = new Cliente();
    cliente.id = uuid();
    return cliente;
  }
}