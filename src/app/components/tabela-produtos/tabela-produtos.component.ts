import { Component, OnInit, Input } from "@angular/core";
import { ProdutoService } from "../../services/produto.service";
import { Produto } from "../../models/produto";

@Component({
  selector: "tabela-produtos",
  templateUrl: "./tabela-produtos.component.html",
  styleUrls: ["./tabela-produtos.component.css"]
})
export class TabelaProdutosComponent implements OnInit {
  lista: Produto[] = [];
  constructor(private servico: ProdutoService) {
    //this.lista = servico.getProdutos();
  }

  ngOnInit() {
    this.servico.getProdutos().subscribe(resp => {
      console.log(resp);
      this.lista = resp;
    });
  }

  deletar(id: number) {
    this.servico.deletar(id);
  }
}
