import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

// Services
import { AuthService } from "./../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}

@Injectable()
export class AdmGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!this.auth.isAdm()) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}
