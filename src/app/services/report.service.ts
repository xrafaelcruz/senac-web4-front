import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { Router } from "@angular/router";

//Models
import { Report } from "../models/report";
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "x-auth-token": localStorage.getItem("token"),
    Authorization: "my-auth-token"
  })
};

@Injectable({ providedIn: "root" })
export class ReportService {
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

      // return an observable with a report-facing error message
      return throwError(result.error);
    } catch (e) {
      return throwError("Não foi possível executar essa operação");
    }
  }

  createReport(report: Report) {
    return this.http
      .post(`${environment.api}/report`, report, {
        headers: httpOptions.headers,
        responseType: "text" as "json"
      })
      .pipe(catchError(this.handleError));
  }

  updateReport(report: Report) {
    return this.http
      .put(`${environment.api}/report/${report._id}`, report, {
        headers: httpOptions.headers,
        responseType: "text" as "json"
      })
      .pipe(catchError(this.handleError));
  }

  getReports(id): Observable<Report[]> {
    return this.http
      .get<Report[]>(`${environment.api}/report/user/${id}`, {
        headers: httpOptions.headers
      })
      .pipe(catchError(this.handleError));
  }

  getReport(id): Observable<Report> {
    return this.http
      .get<Report>(`${environment.api}/report/${id}`, {
        headers: httpOptions.headers
      })
      .pipe(catchError(this.handleError));
  }

  removeReport(_id) {
    return this.http
      .delete(`${environment.api}/report/${_id}`, {
        headers: httpOptions.headers,
        responseType: "text" as "json"
      })
      .pipe(catchError(this.handleError));
  }
}
