import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";

// Models
import { User } from "./../../models/user";

// Services
import { AuthService } from "./../../services/auth.service";
import { ToastService } from "./../../services/toast.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: User = new User();

  username = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {}

  getErrorMessage(field) {
    return field.hasError("required")
      ? "Campo obrigatório"
      : field.hasError("email")
      ? "Email inválido"
      : "";
  }

  login() {
    if (!this.username.invalid && !this.password.invalid) {
      this.user.username = this.username.value;
      this.user.password = this.password.value;

      this.authService.login(this.user).subscribe(
        result => {
          const r = JSON.parse(result.toString());
          localStorage.setItem("token", r.token);
          localStorage.setItem("user", JSON.stringify(r.user));
          this.router.navigate(["/"]);
        },
        error => {
          this.toast.showToast(error, "error");
        }
      );
    }
  }
}
