import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../cadastro/cliente';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [MatInputModule,
            MatButtonModule,
            MatCardModule,
            FormsModule,
            MatIconModule,
            FlexLayoutModule,
            MatTableModule,
            CommonModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {
  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  columnsToDisplay = ['nascimento', 'nome', 'cpf', 'email', 'acoes'];
  displayedColumns: string[] = this.columnsToDisplay;
  constructor(private clienteService: ClienteService,
    private router: Router
  ) { }
  ngOnInit() {
    this.listaClientes = this.clienteService.obterPorNome('');
  }
  pesquisar() {
    this.listaClientes = this.clienteService.obterPorNome(this.nomeBusca);
  }
  editar(id?: string) {
    this.router.navigate(['/cadastro'], { queryParams: { id: id } });
    console.log('Editar cliente: ' + id);
  }

}