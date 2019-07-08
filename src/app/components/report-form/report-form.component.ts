import { Component, OnInit, Input } from "@angular/core";

import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";

// Models
import { User } from "./../../models/user";

// Services
import { UserService } from "./../../services/user.service";
import { ToastService } from "./../../services/toast.service";

@Component({
  selector: "app-report-form",
  templateUrl: "./report-form.component.html",
  styleUrls: ["./report-form.component.css"]
})
export class ReportFormComponent implements OnInit {
  @Input() isCreate: boolean;
  user: User = new User();
  btnLabel: String;

  email = new FormControl("", [Validators.required, Validators.email]);
  name = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);
  phone = new FormControl("", [Validators.required]);
  username = new FormControl("", [Validators.required]);

  getErrorMessage(field) {
    return field.hasError("required")
      ? "Campo obrigatório"
      : field.hasError("email")
      ? "Email inválido"
      : "";
  }

  constructor(
    private userService: UserService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.btnLabel = this.isCreate ? "Criar" : "Editar";
  }

  submit() {
    if (
      !this.email.invalid &&
      !this.name.invalid &&
      !this.password.invalid &&
      !this.phone.invalid &&
      !this.username.invalid
    ) {
      this.user.email = this.email.value;
      this.user.name = this.name.value;
      this.user.password = this.password.value;
      this.user.phone = this.phone.value;
      this.user.username = this.username.value;

      if (this.isCreate) {
        this.create();
      } else {
        this.update();
      }
    }
  }

  create() {
    this.userService.createUser(this.user).subscribe(
      () => {
        this.toast.showToast("Usuário criado com sucesso", "success");
        this.router.navigate(["/"]);
      },
      error => {
        console.log(error);
        this.toast.showToast(error, "error");
      }
    );
  }

  update() {
    this.userService.updateUser(this.user).subscribe(
      () => {
        this.toast.showToast("Usuário atualizado com sucesso", "success");
        this.router.navigate(["/"]);
      },
      error => {
        this.toast.showToast(error, "error");
      }
    );
  }
}
