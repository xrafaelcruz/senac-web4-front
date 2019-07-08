import { Injectable } from "@angular/core";
import { Produto } from "../models/produto";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};
@Injectable({
  providedIn: "root"
})
export class ProdutoService {
  listaProdutos: Produto[] = [
    {
      nome: "produto1",
      marca: "marcax",
      preco: 30.0,
      dataValidade: new Date(2019, 10, 20)
    },
    {
      nome: "produto2",
      marca: "marcay",
      preco: 40.0,
      dataValidade: new Date(2019, 10, 20)
    },
    {
      nome: "produto3",
      marca: "marcax",
      preco: 60.0,
      dataValidade: new Date(2019, 10, 20)
    },
    {
      nome: "produto4",
      marca: "marcay",
      preco: 70.0,
      dataValidade: new Date(2019, 10, 20)
    }
  ];
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  getProdutos(): Observable<Produto[]> {
    return this.http
      .get<Produto[]>("http://localhost:3000/produtos", httpOptions)
      .pipe(catchError(this.handleError));
  }

  addProduto(produto: Produto) {
    console.log(produto);
    return this.http
      .post("http://localhost:3000/produtos", produto, {
        headers: httpOptions.headers,
        responseType: "text" as "json"
      })
      .pipe(catchError(this.handleError));
  }

  deletar(id) {
    this.listaProdutos.splice(id, 1);
  }

  buscarPorId(id: number) {
    return this.http
      .get<Produto>(`http://localhost:3000/produtos/${id}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  editar(id: number, prod: Produto) {
    return this.http
      .put(`http://localhost:3000/produtos/${id}`, prod, {
        headers: httpOptions.headers,
        responseType: "text" as "json"
      })
      .pipe(catchError(this.handleError));
  }
}
