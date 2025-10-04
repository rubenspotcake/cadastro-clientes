import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  atualizando: boolean = false;
  constructor(private clienteService: ClienteService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const id = params['id'];
      console.log('ID recebido: ' + id);
      if (id) {
        this.atualizando = true;
        this.cliente = this.clienteService.obterPorId(id);
      }
    });
  }

  cliente: Cliente = Cliente.newCliente();

  salvar(){
    this.clienteService.salvar(this.cliente);
    this.cliente = Cliente.newCliente();
  }

}
