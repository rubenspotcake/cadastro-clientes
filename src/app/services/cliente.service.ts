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

    obterPorNome(nome: string): Cliente[] {
      const todos: Cliente[] = this.obteterTodos();
      if(nome && nome.trim().length > 0){
        return todos.filter( c => c.nome && c.nome.toLowerCase().includes(nome.toLowerCase()));
      }
      return todos;
    }

    obterPorId(id: string): Cliente {
      const todos: Cliente[] = this.obteterTodos();
      return todos.find( (c => c && c.id === id)) as Cliente;
    }

    excluir(id: string): void {

    }
}
