import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrasilapiService } from '../..//services/brasilapi.service';
import { Estado, Municipio } from './brasilapi.models';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatSelectModule,
    CommonModule],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  atualizando: boolean = false;
  private snackbar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];
  constructor(private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private brasilapiService: BrasilapiService
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const id = params['id'];
      if (id) {
        this.atualizando = true;
        this.cliente = this.clienteService.obterPorId(id);
        if(this.cliente.uf){
          const event = { value: this.cliente.uf } as MatSelectChange;
          this.carregarMunicipios(event);
        }
      }
    });
    this.carregarEstados();
  }

  cliente: Cliente = Cliente.newCliente();

  salvar(){
    if(!this.atualizando){
      this.clienteService.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem('Cliente salvo com sucesso!');
    }else{
      this.clienteService.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Cliente atualizado com sucesso!');
    }
  }
  mostrarMensagem(mensagem: string){
    this.snackbar.open(mensagem, 'X', { duration: 5000 });
  }

  carregarEstados() {
    this.brasilapiService.listarEstados().subscribe({
      next: listaEstados => this.estados = listaEstados,
      error: err => console.error('Erro ao carregar estados', err)
    });
  }

  carregarMunicipios(event: MatSelectChange) {
    const uf = event.value;
    this.brasilapiService.listarMunicipios(uf).subscribe({
      next: listaMunicipios => this.municipios = listaMunicipios,
      error: err => console.error('Erro ao carregar municípios', err)
    });
  }

}
