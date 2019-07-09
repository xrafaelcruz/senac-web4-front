// Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule, ROUTES } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Components
import { AppComponent } from "./components/app/app.component";
import { TabelaProdutosComponent } from "./components/tabela-produtos/tabela-produtos.component";
import { FormProdutosComponent } from "./components/form-produtos/form-produtos.component";

// Pipes
import { MoedaPipe } from "./pipes/moeda.pipe";
import { FiltroMarcaPipe } from "./pipes/filtro-marca.pipe";

// Guards
import { AuthGuard, NotAuthGuard, AdmGuard } from "./guards/auth.guard";

// Services
import { ProdutoService } from "./services/produto.service";
import { ToastService } from "./services/toast.service";
import { AuthService } from "./services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";

// Components
import { LoginComponent } from "./pages/login/login.component";

import { ReportCreateComponent } from "./pages/report/report-create/report-create.component";
import { ReportUpdateComponent } from "./pages/report/report-update/report-update.component";
import { ReportListComponent } from "./pages/report/report-list/report-list.component";
import { ReportFormComponent } from "./components/report-form/report-form.component";
import { ReportTableComponent } from "./components/report-table/report-table.component";

import { UserCreateComponent } from "./pages/user/user-create/user-create.component";
import { UserUpdateComponent } from "./pages/user/user-update/user-update.component";
import { UserListComponent } from "./pages/user/user-list/user-list.component";
import { UserTableComponent } from "./components/user-table/user-table.component";
import { UserFormComponent } from "./components/user-form/user-form.component";

// Material
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { HeaderComponent } from "./components/header/header.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    TabelaProdutosComponent,
    FormProdutosComponent,
    MoedaPipe,
    FiltroMarcaPipe,

    LoginComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserListComponent,
    ReportCreateComponent,
    ReportUpdateComponent,
    ReportListComponent,
    ReportFormComponent,
    ReportTableComponent,
    UserTableComponent,
    UserFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [
    ProdutoService,
    JwtHelperService,
    AuthService,
    AuthGuard,
    NotAuthGuard,
    AdmGuard,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
