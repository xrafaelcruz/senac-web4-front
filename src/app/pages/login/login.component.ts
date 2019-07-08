import { Component, OnInit } from "@angular/core";

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

  constructor(private authService: AuthService, private toast: ToastService) {}

  ngOnInit() {}

  login() {
    if (this.user.username && this.user.password) {
      this.authService.login(this.user).subscribe(
        result => {
          const r = JSON.parse(result.toString());
          localStorage.setItem("token", r.token);
        },
        error => {
          this.toast.showToast(error, "error");
        }
      );
    }
  }
}
