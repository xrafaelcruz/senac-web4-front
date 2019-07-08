import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { LoginComponent } from "./pages/login/login.component";

import { ReportCreateComponent } from "./pages/report/report-create/report-create.component";
import { ReportUpdateComponent } from "./pages/report/report-update/report-update.component";
import { ReportListComponent } from "./pages/report/report-list/report-list.component";

import { UserCreateComponent } from "./pages/user/user-create/user-create.component";
import { UserUpdateComponent } from "./pages/user/user-update/user-update.component";
import { UserListComponent } from "./pages/user/user-list/user-list.component";

// Guards
import { AuthGuard, NotAuthGuard, AdmGuard } from "./guards/auth.guard";

export const ROUTES: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: "",
    component: ReportListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "report/create",
    component: ReportCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "report/update",
    component: ReportUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users",
    component: UserListComponent,
    canActivate: [AuthGuard, AdmGuard]
  },
  {
    path: "user/create",
    component: UserCreateComponent
  },
  {
    path: "user/update",
    component: UserUpdateComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
