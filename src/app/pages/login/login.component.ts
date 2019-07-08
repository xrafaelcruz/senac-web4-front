import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    if (this.user.username && this.user.password) {
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
