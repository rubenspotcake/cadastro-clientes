import { Injectable } from '@angular/core';
import { Cliente } from '../components/cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  static REPO_CLIENTES = '_CLIENTES';

  constructor() {}

  salvar(cliente: Cliente){
      const storageClientes = this.obteterTodos();
      storageClientes.push(cliente);
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storageClientes) );
    }

    obteterTodos(): Cliente[]{
      const clientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
      if(clientes){
        return JSON.parse(clientes) as Cliente[];
      }
      const clientesAux: Cliente[] = [];
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientesAux) );
      return clientesAux;
    }

    obterPorId(id: string): Cliente | undefined {
      return undefined;
    }

    excluir(id: string): void {

    }
}
