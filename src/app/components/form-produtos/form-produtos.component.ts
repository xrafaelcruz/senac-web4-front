import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ProdutoService } from "../../services/produto.service";
import { Produto } from "../../models/produto";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "form-produtos",
  templateUrl: "./form-produtos.component.html",
  styleUrls: ["./form-produtos.component.css"]
})
export class FormProdutosComponent implements OnInit {
  produto: Produto = new Produto();

  id: number;
  constructor(
    private servico: ProdutoService,
    private router: Router,
    private rota: ActivatedRoute
  ) {}

  ngOnInit() {
    //o id do params deve ter o mesmo nome do parametro da rota
    this.id = this.rota.snapshot.params["id"];
    if (this.id) {
      console.log("ID:", this.id);
      this.servico.buscarPorId(this.id).subscribe(produto => {
        this.produto = produto;
        console.log("buscar produto", produto);
      });
    } else {
      console.log("não tem id");
      this.produto = new Produto();
    }
  }

  salvar() {
    if (this.id) {
      this.servico.editar(this.id, this.produto).subscribe();
    } else {
      this.servico.addProduto(this.produto).subscribe();
    }

    this.router.navigate(["/tabela"]);
  }

  cancelar() {
    this.router.navigate(["/tabela"]);
  }
}
