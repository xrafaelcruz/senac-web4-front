import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { Router } from "@angular/router";

//Models
import { User } from "../models/user";
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  private handleError(errorResponse: HttpErrorResponse) {
    try {
      const result = JSON.parse(errorResponse.error);

      if (errorResponse.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error("An error occurred:", errorResponse.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${errorResponse.status}, ` +
            `body was: ${errorResponse.error}`
        );
      }

      // return an observable with a user-facing error message
      return throwError(result.error);
    } catch (e) {
      return throwError("Não foi possível executar essa operação");
    }
  }

  createUser(user: User) {
    return this.http
      .post(`${environment.api}/user`, user, {
        headers: httpOptions.headers,
        responseType: "text" as "json"
      })
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User) {
    return this.http
      .put(`${environment.api}/user`, user, {
        headers: httpOptions.headers,
        responseType: "text" as "json"
      })
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.api}/user`, {
        headers: httpOptions.headers
      })
      .pipe(catchError(this.handleError));
  }

  removeUser(_id) {
    return this.http
      .delete(`${environment.api}/user/${_id}`, {
        headers: httpOptions.headers,
        responseType: "text" as "json"
      })
      .pipe(catchError(this.handleError));
  }
}
