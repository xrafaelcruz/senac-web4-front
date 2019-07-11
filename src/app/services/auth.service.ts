import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { Router } from "@angular/router";

//Models
import { User } from "./../models/user";
import { environment } from "./../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

@Injectable({ providedIn: "root" })
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  private handleError(errorResponse: HttpErrorResponse) {
    try {
      if (errorResponse && errorResponse.error) {
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
      }
    } catch (e) {
      console.log("auth");
      return throwError("Não foi possível executar essa operação");
    }
  }

  public isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem("token");
      return !this.jwtHelper.isTokenExpired(token);
    } catch (e) {
      return false;
    }
  }

  public getUser(): User {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  public isAdm(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.profile) {
      return user.profile === "adm" && this.isAuthenticated();
    }

    return false;
  }

  login(user: User) {
    return this.http
      .post(`${environment.api}/auth/token`, user, {
        headers: httpOptions.headers,
        responseType: "text" as "json"
      })
      .pipe(catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }
}
