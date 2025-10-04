import { v4 as uuid } from 'uuid';

export class Cliente{
  id?: string
  nome?: string;
  email?: string;
  cpf?: string;
  dataNascimento?: string;
  deletando: boolean = false;
  uf?: string;
  cidade?: string;

  static newCliente(): Cliente {
    let cliente = new Cliente();
    cliente.id = uuid();
    return cliente;
  }
}